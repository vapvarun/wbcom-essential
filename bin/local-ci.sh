#!/usr/bin/env bash
# Local CI for Wbcom Essential. Run before every push; bin/build-release.sh runs it too.
#
# Gates: Q1 PHP lint · Q2 version triangulation · F1/F2 no inline <style>/<script>
#        in PHP · B1 blocks build · J1 block unit tests · Q3 WPCS (errors block) ·
#        Q4 PHPStan · D1 journey depth · I1 translations · G1 escape guards and
#        release checks · W1 wppqa_run_checks (fast) against a WordPress install.
#
# W1 needs a site with this plugin active: WP_ROOT=/path/to/wordpress bin/local-ci.sh
# Without WP_ROOT it is reported as SKIPPED, never as passed.
set -uo pipefail

cd "$(dirname "$0")/.."
FAIL=0
SKIPPED=""
section() { printf '\n\033[1m== %s ==\033[0m\n' "$1"; }
WPPQA_RUN_DEFAULT="$HOME/.mcp-servers/wp-plugin-qa-mcp-server/bin/wppqa-run.mjs"
PHP_DIRS=(loader.php wbcom-essential.php uninstall.php admin includes plugins templates)

section "Q1 - PHP lint"
if find "${PHP_DIRS[@]}" -name '*.php' -not -path '*/node_modules/*' -print0 \
	| xargs -0 -n1 -P4 php -n -l >/dev/null; then
	echo "ok"
else
	echo "FAIL: PHP syntax errors"; FAIL=1
fi

section "Q2 - version triangulation"
HEADER_V=$(grep -m1 -E '^\s*\*?\s*Version:' loader.php | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
CONST_V=$(grep -m1 -oE "WBCOM_ESSENTIAL_VERSION', '[0-9]+\.[0-9]+\.[0-9]+" loader.php | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
README_V=$(grep -m1 -E '^Stable tag:' readme.txt | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
PKG_V=$(grep -m1 -oE '"version": *"[0-9]+\.[0-9]+\.[0-9]+"' package.json | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
echo "header=$HEADER_V const=$CONST_V readme=$README_V package=$PKG_V"
if [ "$HEADER_V" = "$CONST_V" ] && [ "$HEADER_V" = "$README_V" ] && [ "$HEADER_V" = "$PKG_V" ]; then echo "ok"; else echo "FAIL: version mismatch"; FAIL=1; fi

section "F1/F2 - no inline <style>/<script> in PHP"
# Admin and shared PHP, plus block render.php files: a block's per-instance tokens go on
# its wrapper's style attribute (get_block_wrapper_attributes), never a printed <style>.
HITS=$(grep -rn -E '<style|<script' --include='*.php' includes admin templates plugins/gutenberg/src/blocks 2>/dev/null \
	| grep -vE ':[[:space:]]*(//|#|\*|/\*)' | grep -viE 'email|mail-template|application/json' || true)
if [ -z "$HITS" ]; then echo "ok"; else echo "FAIL: use wp_enqueue_* / wp_add_inline_*:"; echo "$HITS"; FAIL=1; fi

section "B1 - blocks build"
if [ -d node_modules ]; then
	if npm run --silent build:blocks >/dev/null; then echo "ok"; else echo "FAIL: npm run build:blocks"; FAIL=1; fi
else
	echo "SKIPPED: run npm ci"; SKIPPED="$SKIPPED B1"
fi

section "J1 - block unit tests"
if [ -d node_modules ]; then
	npm run --silent test:unit || { echo "FAIL: npm run test:unit"; FAIL=1; }
else
	echo "SKIPPED: run npm ci"; SKIPPED="$SKIPPED J1"
fi

section "Q3 - WPCS (errors block)"
if [ -x vendor/bin/phpcs ]; then
	php -n vendor/bin/phpcs -q -n --report=summary || { echo "FAIL: WPCS errors"; FAIL=1; }
else
	echo "SKIPPED: run composer install"; SKIPPED="$SKIPPED Q3"
fi

section "Q4 - PHPStan"
if [ -x vendor/bin/phpstan ]; then
	php -n -d memory_limit=2G vendor/bin/phpstan analyse --no-progress || { echo "FAIL: PHPStan"; FAIL=1; }
else
	echo "SKIPPED: run composer install"; SKIPPED="$SKIPPED Q4"
fi

section "D1 - journey depth (every escape has a journey check)"
php bin/check-journey-depth.php 2>&1 | grep -Ev 'Xdebug|Zend Engine|imagick|Derick|opcache|PHP Startup|^$' | tail -3
[ "${PIPESTATUS[0]}" -eq 0 ] || { echo "FAIL: php bin/check-journey-depth.php"; FAIL=1; }

section "I1 - translations (current POT: 0 untranslated, 0 fuzzy, placeholders, JSON per block script)"
# Every built script with translatable strings, by the name core gives its JSON:
# {domain}-{locale}-{md5 of the script path relative to the plugin}.json.
SCRIPTS=$(grep -E '^#: ' languages/wbcom-essential.pot | tr ' ' '\n' | grep -E '^build/blocks/.+\.js(:[0-9]+)?$' | sed 's/:[0-9]*$//' | sort -u)
MERGED=$(mktemp -d)
for po in languages/*.po; do
	[ -e "$po" ] || continue
	loc=$(basename "$po" .po); loc=${loc#wbcom-essential-}
	# Count against the current POT: a .po never merged with new strings looks complete otherwise.
	msgmerge --quiet --no-fuzzy-matching --no-wrap -o "$MERGED/$loc.po" "$po" languages/wbcom-essential.pot
	untr=$(msgattrib --untranslated --no-obsolete "$MERGED/$loc.po" | grep -c '^msgid' || true)
	fuzz=$(msgattrib --only-fuzzy --no-obsolete "$po" | grep -c '^msgid' || true)
	# The header entry counts as one untranslated msgid.
	[ "$untr" -le 1 ] || { echo "FAIL: $loc has $((untr - 1)) untranslated strings"; FAIL=1; }
	[ "$fuzz" -eq 0 ] || { echo "FAIL: $loc has $fuzz fuzzy strings (retranslate, never ship the guesses)"; FAIL=1; }
	msgfmt --check-format -o /dev/null "$po" 2>/dev/null || { echo "FAIL: $loc placeholder mismatch (msgfmt --check-format)"; FAIL=1; }
	missing=0
	for js in $SCRIPTS; do
		md5=$(printf '%s' "$js" | md5 -q 2>/dev/null || printf '%s' "$js" | md5sum | cut -d' ' -f1)
		[ -f "languages/wbcom-essential-$loc-$md5.json" ] || missing=$((missing + 1))
	done
	[ "$missing" -eq 0 ] || { echo "FAIL: $loc lacks JSON for $missing of $(echo "$SCRIPTS" | wc -l | tr -d ' ') block scripts, so block editor and front-end strings stay English (wp i18n make-json languages --no-purge)"; FAIL=1; }
done
rm -rf "$MERGED"

section "G1 - escape guards and release checks (wppqa static + release)"
GUARD_WP="${WP_ROOT:-$HOME/Local Sites/reign-theme/app/public}"
if [ -f "$WPPQA_RUN_DEFAULT" ] && [ -f "$GUARD_WP/wp-load.php" ]; then
	node "$WPPQA_RUN_DEFAULT" --plugin "$(pwd)" --wp "wp --path=$GUARD_WP" --only release,static 2>&1 | grep -Ev 'Xdebug|Zend|imagick|Derick' | tail -6
	[ "${PIPESTATUS[0]}" -eq 0 ] || { echo "FAIL: escape guards"; FAIL=1; }
else
	echo "SKIPPED: needs the wppqa CLI and a WordPress install (WP_ROOT)"; SKIPPED="$SKIPPED G1"
fi

section "W1 - wppqa_run_checks (fast)"
WPPQA_RUN="${WPPQA_RUN:-$HOME/.mcp-servers/wp-plugin-qa-mcp-server/bin/wppqa-run.mjs}"
if [ -z "${WP_ROOT:-}" ]; then
	echo "SKIPPED: set WP_ROOT to a WordPress install with this plugin active"; SKIPPED="$SKIPPED W1"
elif [ ! -f "$WPPQA_RUN" ]; then
	echo "SKIPPED: wppqa CLI not on this machine ($WPPQA_RUN)"; SKIPPED="$SKIPPED W1"
else
	node "$WPPQA_RUN" --plugin "$(pwd)" --wp-root "$WP_ROOT" --mode fast || { echo "FAIL: wppqa checks"; FAIL=1; }
fi

section "Result"
[ -n "$SKIPPED" ] && echo "Skipped:$SKIPPED"
[ "$FAIL" -eq 0 ] && echo "PASS" || { echo "FAIL"; exit 1; }

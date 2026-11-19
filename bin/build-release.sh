#!/usr/bin/env bash
# Build the release zip for Wbcom Essential behind the release gates.
#
#   bin/build-release.sh                       # full gated build
#   bin/build-release.sh --allow-dirty         # dev only: skip the clean-tree check
#   bin/build-release.sh --skip-browser-smoke  # emergency only: skip the smoke-report gate
#   bin/build-release.sh --skip-local-ci       # emergency only: skip bin/local-ci.sh
#
# Gates, in order (exit code in brackets):
#   [10] working tree clean (tracked files)
#   [20] local CI passes (bin/local-ci.sh)
#   [25] docs truth: wbcom-documentation lint on docs/website
#   [30] browser smoke report docs/qa/.last-smoke-pass.json exists, is for this
#        version, and lists no failures (written by the wp-plugin-smoke skill)
#   [40] packaging: blocks build + grunt internal-package (the one packager; it owns the
#        file exclusion list, see gruntfile.js)
#   [50] the zip holds no dev folders or files, and every PHP file in it lints
#
# Output: dist/wbcom-essential-<version>.zip
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$(pwd)"
SLUG="wbcom-essential"
ALLOW_DIRTY=0
SKIP_BROWSER_SMOKE=0
SKIP_LOCAL_CI=0
for a in "$@"; do
	case "$a" in
		--allow-dirty) ALLOW_DIRTY=1 ;;
		--skip-browser-smoke) SKIP_BROWSER_SMOKE=1 ;;
		--skip-local-ci) SKIP_LOCAL_CI=1 ;;
		*) echo "unknown option: $a" >&2; exit 2 ;;
	esac
done

VERSION="$(grep -m1 -E '^\s*\*?\s*Version:' loader.php | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"
[ -n "$VERSION" ] || { echo "FAIL: could not read Version from loader.php" >&2; exit 2; }
ZIP="dist/${SLUG}-${VERSION}.zip"
echo "Building $SLUG v$VERSION"

# [10] clean tree: what ships must be what is committed.
if [ "$ALLOW_DIRTY" -eq 0 ] && [ -n "$(git status --porcelain --untracked-files=no)" ]; then
	echo "FAIL: tracked files have uncommitted changes. Commit them, or pass --allow-dirty for a dev build." >&2
	git status --short --untracked-files=no >&2
	exit 10
fi

# [20] local CI.
if [ "$SKIP_LOCAL_CI" -eq 1 ]; then
	echo "WARN: local CI skipped (--skip-local-ci). Not for customer releases." >&2
else
	echo "==> local CI"
	bash bin/local-ci.sh || { echo "FAIL: bin/local-ci.sh reported failures." >&2; exit 20; }
fi

# [25] docs truth.
DOCS_LINT="$HOME/.claude/skills/wbcom-documentation/bin/lint-plugin-docs.mjs"
if [ -f "$DOCS_LINT" ]; then
	echo "==> docs truth"
	node "$DOCS_LINT" "$ROOT" || { echo "FAIL: docs lint found problems (see above)." >&2; exit 25; }
else
	echo "WARN: docs lint not on this machine ($DOCS_LINT) - docs-truth gate SKIPPED." >&2
fi

# [30] browser smoke report for this exact version.
SMOKE_REPORT="$ROOT/docs/qa/.last-smoke-pass.json"
if [ "$SKIP_BROWSER_SMOKE" -eq 1 ]; then
	echo "WARN: browser smoke gate skipped (--skip-browser-smoke). Not for customer releases." >&2
elif [ ! -f "$SMOKE_REPORT" ]; then
	echo "FAIL: no browser smoke report at docs/qa/.last-smoke-pass.json." >&2
	echo "      Run the pre-release smoke first (wp-plugin-smoke skill), then rebuild." >&2
	exit 30
else
	CHECK="$(python3 - "$SMOKE_REPORT" <<-'PY'
		import json, sys
		try:
		    d = json.load(open(sys.argv[1]))
		except Exception as e:
		    print("PARSE_FAIL " + str(e)); sys.exit(0)
		fails = [f for f in (d.get("failures") or []) if (f.get("origin") or "from") == "from"]
		print(d.get("release_version", ""), len(fails))
	PY
	)"
	case "$CHECK" in PARSE_FAIL*) echo "FAIL: smoke report is not valid JSON: $CHECK" >&2; exit 30 ;; esac
	read -r REPORT_VERSION REPORT_FAILS <<<"$CHECK"
	if [ "$REPORT_VERSION" != "$VERSION" ]; then
		echo "FAIL: smoke report is for v${REPORT_VERSION:-?}, this release is v$VERSION. Rerun the smoke." >&2
		exit 30
	fi
	if [ "$REPORT_FAILS" != "0" ]; then
		echo "FAIL: smoke report lists $REPORT_FAILS failure(s) from this plugin." >&2
		exit 30
	fi
	echo "==> browser smoke report ok (v$REPORT_VERSION, 0 failures)"
fi

# [40] package.
echo "==> package"
[ -d node_modules ] || npm ci --silent
npm run build:blocks || { echo "FAIL: block build failed." >&2; exit 40; }
npx grunt internal-package || { echo "FAIL: grunt internal-package failed." >&2; exit 40; }
[ -f "$ZIP" ] || { echo "FAIL: $ZIP was not produced." >&2; exit 40; }

# [50] zip contents.
echo "==> verify zip"
DIRTY="$(unzip -Z1 "$ZIP" | grep -E "^${SLUG}/(audit|plan|docs|tests|marketing|scripts|bin|vendor|node_modules|plugins/gutenberg/src|plugins/gutenberg/tests)/|\.md$|\.map$|(^|/)package(-lock)?\.json$|^${SLUG}/(composer\.(json|lock)|phpcs\.xml\.dist|phpstan[^/]*|gruntfile\.js|jest\.config\.[a-z]+)$" || true)"
if [ -n "$DIRTY" ]; then
	echo "FAIL: dev files in $ZIP:" >&2
	echo "$DIRTY" | head -20 >&2
	exit 50
fi
CHECK_DIR="$(mktemp -d)"
trap 'rm -rf "$CHECK_DIR"' EXIT
unzip -q "$ZIP" -d "$CHECK_DIR"
if ! find "$CHECK_DIR" -name '*.php' -print0 | xargs -0 -n1 -P4 php -n -l >/dev/null; then
	echo "FAIL: a PHP file in the zip does not lint." >&2
	exit 50
fi

echo "Created $ZIP ($(unzip -Z1 "$ZIP" | wc -l | tr -d ' ') entries)"

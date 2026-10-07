#!/usr/bin/env bash
#
# Fetch the third-party sources PHPStan needs to analyse this plugin.
#
# Elementor publishes no stubs package, and 43 of our widgets extend its class
# hierarchy. Without the real source on disk, PHPStan reports every inherited
# method as undefined (1000+ errors) and the analysis is worthless. We download
# it for symbol scanning only - it is never committed and never shipped.
#
# Usage: bash bin/phpstan-fetch-deps.sh
set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STUB_DIR="${PLUGIN_DIR}/.phpstan-stubs"

mkdir -p "${STUB_DIR}"

if [ -d "${STUB_DIR}/elementor" ]; then
	echo "Elementor source already present at ${STUB_DIR}/elementor - skipping."
else
	echo "Fetching Elementor source for static analysis..."
	curl -fsSL "https://downloads.wordpress.org/plugin/elementor.zip" -o "${STUB_DIR}/elementor.zip"
	unzip -q -o "${STUB_DIR}/elementor.zip" -d "${STUB_DIR}"
	rm -f "${STUB_DIR}/elementor.zip"
	echo "Elementor $(grep -m1 ' \* Version:' "${STUB_DIR}/elementor/elementor.php" | tr -d ' *Version:') fetched."
fi

#!/usr/bin/env bash
# Run browser Vitest (unit or VRT) inside the pinned Playwright Ubuntu image.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required for browser tests / VRT (host OS is not a baseline target)." >&2
  exit 1
fi

TARGET="${1:-@pond/components:test:vrt}"
shift || true
EXTRA="$*"

UPDATE=0
if [[ "$EXTRA" == *"--update"* ]]; then
  UPDATE=1
fi

case "$TARGET" in
  @pond/components:test:vrt)
    if [[ "$UPDATE" -eq 1 ]]; then
      # Pass --update straight to vitest (no extra --)
      FILTER_CMD='pnpm --filter @pond/components exec vitest run --config vitest.vrt.config.ts --update'
    else
      FILTER_CMD='pnpm --filter @pond/components run test:vrt'
    fi
    ;;
  @pond/components:test)
    FILTER_CMD='pnpm --filter @pond/components run test'
    ;;
  *)
    echo "Unknown browser target: $TARGET" >&2
    exit 1
    ;;
esac

ENV_ARGS=(
  -e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
  -e NX_DAEMON=false
  -e NX_SKIP_NX_CACHE=true
  -e NX_NO_CLOUD=true
)
if [[ "$UPDATE" -eq 0 ]]; then
  ENV_ARGS+=(-e CI=true)
fi

USER_ARGS=(--user "$(id -u):$(id -g)")

INNER=$(
  cat <<EOF
set -euo pipefail
export HOME=/tmp/pond-home
mkdir -p "\$HOME" "\$HOME/.local" /tmp/pnpm-store
npm install -g pnpm@10.34.9 --prefix "\$HOME/.local" --silent
export PATH="\$HOME/.local/bin:\$PATH"
export PNPM_STORE_PATH=/tmp/pnpm-store
if [ ! -f node_modules/.modules.yaml ]; then
  pnpm install --frozen-lockfile
fi
${FILTER_CMD}
EOF
)

exec docker compose run --rm --no-deps "${USER_ARGS[@]}" "${ENV_ARGS[@]}" browser \
  bash -lc "$INNER"

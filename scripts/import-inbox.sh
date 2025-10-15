#!/bin/zsh
set -e

ROOT="$(cd "$(dirname "$0")"/.. && pwd)"
INBOX="$ROOT/_Inbox"
LOG_DIR="$ROOT/_Index"
TS=$(date +%s)
LOG_FILE="$LOG_DIR/rsync-import-$TS.log"

mkdir -p "$INBOX" "$LOG_DIR"

DRYRUN=""
if [[ "$1" == "--dry-run" ]]; then
  DRYRUN="-n"
  shift
fi

if [[ $# -lt 1 ]]; then
  echo "Usage: import-inbox.sh [--dry-run] <source1> [source2 ...]"
  echo "Example: import-inbox.sh /Users/dr.saraiva/Documents/Visual-Dashboard /Users/dr.saraiva/Documents/Mind-Repository"
  exit 1
fi

echo "[INFO] Importing to $INBOX" | tee "$LOG_FILE"
for SRC in "$@"; do
  if [[ ! -e "$SRC" ]]; then
    echo "[WARN] Source not found: $SRC" | tee -a "$LOG_FILE"
    continue
  fi
  echo "[INFO] Syncing $SRC -> $INBOX" | tee -a "$LOG_FILE"
  rsync $DRYRUN -ah --progress --delete \
    --exclude "TRAe-Projects" \
    --exclude ".Trash" \
    --exclude ".DS_Store" \
    "$SRC" "$INBOX/" >> "$LOG_FILE" 2>&1
done

echo "[DONE] Log at $LOG_FILE"
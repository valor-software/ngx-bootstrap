#!/bin/bash
YELLOW='\033[0;33m'
BOLD_YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "Installing git hooks..."
if [[ -d .git ]]; then
  [[ -L .git/hooks/pre-push ]] && rm .git/hooks/pre-push;
  ln -s ../../pre-push.sh .git/hooks/pre-push;
  echo -e "${GREEN}Successfully installed!${NC}"
else
  echo -e "${YELLOW}No .git directory, probably we're under ${BOLD_YELLOW}node_modules${NC}"
fi;

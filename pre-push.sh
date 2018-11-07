#!/bin/bash
#
# Installation guideline:
# cd ./.git/hooks
# ln -s ../../pre-push.sh pre-push && chmod +x pre-push
#

[[ -z "$GIT_DIR" ]] && GIT_DIR='.';
CHANGES=`git status --porcelain`
if [[ ! -z "$CHANGES" ]];
then
  echo "Putting local changes to stash...";
  git stash --quiet -u;
fi;

echo "TSLint errors check...";
npm run lint-src && echo -e "$All fine!${NC}"
RESULT=$?;

if [[ ! -z "$CHANGES" ]];
then
    echo "Getting local changes from stash...";
    git stash pop --quiet;
fi;

exit $RESULT;

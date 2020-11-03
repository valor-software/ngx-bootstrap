#!/usr/bin/env bash

DEPLOY_TO_PREVIEW_CHANNEL_RESULT=$(firebase hosting:channel:deploy pr-$TRAVIS_PULL_REQUEST --expires 30d --token $FIREBASE_TOKEN --json)

RESULT=`echo ${DEPLOY_TO_PREVIEW_CHANNEL_RESULT} | jq -r '.result'`
NGX_BOOTSTRAP_DEMO=`echo ${RESULT} | jq -r '."ngx-bootstrap-demo"'`
SITE=`echo ${NGX_BOOTSTRAP_DEMO} | jq -r .site`
URL=`echo ${NGX_BOOTSTRAP_DEMO} | jq -r .url`
EXPIRE_TIME_UTC=`echo ${NGX_BOOTSTRAP_DEMO} | jq -r .expireTime`
EXPIRE_TIME=$(TZ='GMT' date -d $EXPIRE_TIME_UTC +%c)

NEW_COMMENT="Project: $SITE \n Url: $URL \n This link will expire at $EXPIRE_TIME"
COMMENTS=$(curl -X GET "https://api.github.com/repos/$TRAVIS_REPO_SLUG/issues/$TRAVIS_PULL_REQUEST/comments")

SUBSTRING="Project: ngx-bootstrap-demo"
COMMENT_ID=-1

for row in $(echo "${COMMENTS}" | jq -r '.[] | @base64'); do
echo ${row}
  _jq() {
     echo ${row} | base64 --decode | jq -r ${1}
  }
  BODY=$(_jq '.body')

  if [[ ${BODY} == *"$SUBSTRING"* ]]; then
    COMMENT_ID=$(_jq '.id')
  fi
done

if [[ ${COMMENT_ID} -ge 0 ]];
  then
    curl -H "Authorization: token ${GITHUB_TOKEN}" -X PATCH -d "{\"body\": \"$NEW_COMMENT\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/comments/${COMMENT_ID}"
  else
    curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"$NEW_COMMENT\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi

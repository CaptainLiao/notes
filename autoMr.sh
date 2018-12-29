#!/bin/bash

# usage
# bash mr.sh 等同于 bash mr.sh test，将当前分支 merge 到远程 test 分支
set -e

TARGET_BRANCH=$1
if [[ !$TARGET_BRANCH ]]; then 
  TARGET_BRANCH=test
fi

PRIVATE_TOKEN='msD7yi72TXKib7ay1zDK'
REMOTE_URL=$(git remote -v | grep push | awk '{print $2}')
PROJECT_NAME=$(echo $REMOTE_URL | cut -d ':' -f2 | cut -d '.' -f1)
GITLAB_URL='http://192.168.3.248'

API_URL=$GITLAB_URL/api/v3
PROJECT_URL=$GITLAB_URL/$PROJECT_NAME
# 徐老师的 uiser id
assignee_name=xuyang
assignee_id=57

RED_COLOR='\e[31m'
BLUE_COLOR='\e[34m'
END_COLOR='\e[0m'

urlencode() {
  local length="${#1}"
  for (( i = 0; i < length; i++ )); do
    local c="${1:i:1}"
    case $c in
      [a-zA-Z0-9.~_-]) printf "$c" ;;
    *) printf "$c" | xxd -p -c1 | while read x;do printf "%%%s" "$x";done
  esac
done
}

getUserId() {
  printf $(curl --header \
    "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" \
    $API_URL/users?username=${assignee_name} | cut -d ',' -f3 | cut -d ':' -f2)
}

getProjectId() {
  printf $(curl --header \
    "Private-Token: ${PRIVATE_TOKEN}" \
    $PROJECT_URL 2>/dev/null | grep 'data-autocomplete-project-id' | cut -d '=' -f4 | cut -d ' ' -f1 | cut -d "'" -f2)
}
echo -e "
${BLUE_COLOR}Get merge request info ... ${END_COLOR}"

projectId=$(getProjectId)
projectId=${projectId:-902}
sourceBranch=$(git branch | grep \* | cut -d ' ' -f2)
targetBranch=$TARGET_BRANCH
title=$(git log -1 --pretty=%B)
# echo merge info
echo -e "
  projectId: ${RED_COLOR}$projectId${END_COLOR}
  sourceBranch: ${sourceBranch}
  targetBranch: ${targetBranch}
  title: ${title}
  remoteUrl: ${REMOTE_URL}"

# create merge request
createMR() {
  title=$(urlencode "$title")
  data="source_branch=$sourceBranch&target_branch=$targetBranch&assignee_id=$assignee_id&title=$title"

  echo $(curl --header "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" \
    --data $data \
    "$API_URL/projects/$projectId/merge_requests" 2>/dev/null)
}

echo -e "
${BLUE_COLOR}Creating merge request... ${END_COLOR}"

merge_request_res=$(createMR)
merge_request_id=$(echo $merge_request_res | cut -d ':' -f2 | cut -d ',' -f1)

# Accept merge request
if [[ $merge_request_id == *[0-9] ]]; then
  echo -e "
  ${BLUE_COLOR}Create merge request success! The merge_request_id is $merge_request_id${END_COLOR}"

  read -p "Accept this merge request? (y/n) " isConfirm

  if [[ $isConfirm == "n" ]]; then
    echo -e "
    ${RED_COLOR}Cancel accept merge request${END_COLOR}"
    exit
  fi
  
  curl -X PUT --header "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" \
    "$API_URL/projects/$projectId/merge_requests/$merge_request_id/merge"
  exit
fi

echo -e "
${RED_COLOR}Create merge request Fail:${END_COLOR}
  $merge_request_res

${BLUE_COLOR}Click on the link below for more details:${END_COLOR}
  $PROJECT_URL/merge_requests
"
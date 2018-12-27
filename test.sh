#!/bin/bash
set -e

RED_COLOR='\e[31m'
BLUE_COLOR='\e[34m'
END_COLOR='\e[0m'

read -p "please input the project name>> " projectName
#project=$(curl --header "PRIVATE-TOKEN: ×××××××××××××××××" "http://gitlab.qtang.net/api/v3/projects/hangban%2F$projectName" -s | cut -d ',' -f1 | cut -d ':' -f2) 
project=${projectName:-102}
echo "you chose the project ${project}"

read -p "please input the source branch>> " sourceBranch
currentBranch=$(git branch | grep \* | cut -d ' ' -f2);
sourceBranch=${sourceBranch:-$currentBranch}

read -p "please input the target branch>> " targetBranch
targetBranch=${targetBranch:-test}

read -p "please input the title of your merge request>> " title
title=${title:-test merge request}

read -p "please input the desc of your merge reques>> " desc
lastCommit=$(git log -1 --pretty=%B)
desc=${desc:-$lastCommit}

read -p "please input the label of your request>> " label
label=${label:-feature}
labels=();
labels+=(${label})

echo -e "creating merge request:
project:  ${RED_COLOR}${project}${END_COLOR}
projectName:  ${BLUE_COLOR}${projectName}${END_COLOR}
sourceBranch: ${BLUE_COLOR}${sourceBranch}${END_COLOR}
targetBranch: ${BLUE_COLOR}${targetBranch}${END_COLOR}
title: ${BLUE_COLOR}${title}${END_COLOR} 
desc: ${BLUE_COLOR}${desc}${END_COLOR}
labels: ${BLUE_COLOR}${labels}${END_COLOR}"

curl --header "PRIVATE-TOKEN: ×××××××××××××" --data "source_branch=${sourceBranch}&target_branch=$targetBranch&assignee_id=58&title=$title&description=$desc&labels=$labels" "http://gitlab.qtang.net/api/v3//projects/$project/merge_requests" 
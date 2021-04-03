#!/bin/bash

set -e

for I in {1..10}; do
    HTTP_STATUS=$(curl ${TOKEN:+"-u ${TOKEN}"} -f -w "%{http_code}" -o issues_${I}.txt "https://api.github.com/repos/cpp-ru/ideas/issues?state=all&per_page=100&page=${I}")
    if [ ${HTTP_STATUS} -ne 200 ]; then exit -1; fi
    
    HTTP_STATUS=$(curl ${TOKEN:+"-u ${TOKEN}"} -f -w "%{http_code}" -o comments_${I}.txt "https://api.github.com/repos/cpp-ru/ideas/issues/comments?per_page=100&page=${I}")
    if [ ${HTTP_STATUS} -ne 200 ]; then exit -2; fi
done

jq -s 'reduce .[] as $item ([]; . + $item)' ./issues_*.txt >all_issues.json
jq -s 'reduce .[] as $item ([]; . + $item)' ./comments_*.txt >all_comments.json

echo "Backup successful"
echo "Issues: $(jq length all_issues.json)"
echo "Comments: $(jq length all_comments.json)"

rm ./issues_* ./comments_*

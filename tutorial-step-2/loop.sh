#!/bin/bash
for i in 1 2 3 4 5
do
    curl -X POST https://xtc873l9rd.execute-api.ap-northeast-2.amazonaws.com/produce --header 'Content-type: application/json' --data-raw '{ "input": "'"$i"'" }'
done
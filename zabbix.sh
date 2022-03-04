#!/bin/bash

set -e


IN_SUBJECT=$1
IN_BODY=$2

# tweak to your needs
WEBHOOK_URL='http://localhost:3001/send/private/'

json_escape() {
    printf '%s' "$1" | python -c 'import json,sys; print(json.dumps(sys.stdin.read()))'
}

CURL_TO=$(json_escape "${IN_TO}")
CURL_SUBJECT=$(json_escape "${IN_SUBJECT}")
CURL_BODY=$(json_escape "${IN_BODY}")

HTTP_RESPONSE=`curl --write-out %{http_code} --silent --output /dev/null -X POST --data '{"number": '"${CURL_SUBJECT}"', "message": '"${CURL_BODY}"'} ' -H "Content-Type: application/json" ${WEBHOOK_URL}`
if [[ "${HTTP_RESPONSE}" != "204" ]] ; then
    echo "Received HTTP-Code: ${HTTP_RESPONSE}"
    exit 1
else
    exit 0
fi
#!/bin/bash

# login to eas
echo "Logging in to EAS..."
mail=""
password=""

code=$(npx expo login -u $mail -p $password --non-interactive)
if [ $? -ne 0 ]; then
    echo "Error: expo login failed"
    exit 1
fi
echo "Logged in to expo"

echo "Building the mobile app"
command="eas build -p android --profile preview --non-interactive --wait --json"

json=$($command 1> build.json)

status=$(jq -r '.[0].status' build.json)

if [ "$status" != "FINISHED" ]; then
  echo "Build failed"
  exit 1
fi
echo "Build successful"

buildUrl=$(jq -r '.[0].artifacts.buildUrl' build.json)
echo "Build url: $buildUrl"

echo "Downloading build..."
wget -O client.apk $buildUrl

rm build.json

echo "Build downloaded to public/apk/client.apk"

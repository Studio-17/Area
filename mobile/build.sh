#!/bin/bash

# login to eas
echo "Logging in to EAS..."
mail="manulop"
password="Reaccoon"

code=$(npx expo login -u $mail -p $password --non-interactive)
if [ $? -ne 0 ]; then
    echo "Error: expo login failed"
    exit 1
fi
echo "Logged in to expo"

echo "Building mobile app..."
command="eas build -p android --profile preview --non-interactive --wait --json"

# run the command and save the json output from the stdout
json=$($command 1> build.json)

# check if the status is FINISHED
status=$(jq -r '.[0].status' build.json)

# if the status is not FINISHED, exit with an error
if [ "$status" != "FINISHED" ]; then
  echo "Build failed"
  exit 1
fi
echo "Build succeeded"

# get the build url
buildUrl=$(jq -r '.[0].artifacts.buildUrl' build.json)

# download the build to client.apk
echo "Downloading build..."
wget -O client.apk $buildUrl

echo "Build cleaned up"
rm build.json

echo "Build downloaded to client.apk"
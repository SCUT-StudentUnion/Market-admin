#!/bin/bash

remoteTarget="/var/market/static/admin/"
server="travis@139.199.6.12"

echo Add ssh deploy key
echo '|1|9udVfwBeyZcomCse5eDJMrYpJaU=|8yBJ80C4uk3PNO7exU2iU3pwAA0= ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHW9Oph8rgxN6bsdeduwyyLqmGvl6/FtowOzlUw8UV5t15bj2RrQ7CCjxkDE3Z+WvyW+zIYXL02XgIpxvWG7ySg=' >> $HOME/.ssh/known_hosts
eval `ssh-agent`
openssl aes-256-cbc -K $encrypted_4896cb81595d_key -iv $encrypted_4896cb81595d_iv -in market-travis-deploy.enc -out market-travis-deploy -d
chmod 600 market-travis-deploy
ssh-add market-travis-deploy

echo Updating $server:$remoteTarget
rsync -zvr --delete --checksum ./dist/ "$server:$remoteTarget" || exit 1;

echo Published to remote successfully.

#!/bin/bash

URLS="http://usve269329.serverprofi24.com/TCGuild/api/robot/check_members_online"

while true; do
  sleep 60
  curl $URLS
done

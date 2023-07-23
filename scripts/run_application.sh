#!/bin/bash

TARGET_PORT=8080

process_id=$(lsof -ti:$TARGET_PORT)

if [ ! -z "$process_id" ]; then
  kill $process_id
fi

nohup java -jar -Dserver.port=${TARGET_PORT} /home/ec2-user/multi-nlpgame/build/libs/* > /home/ec2-user/nohup.out 2>&1 &
echo "> Now new WAS runs at ${TARGET_PORT}."
exit 0
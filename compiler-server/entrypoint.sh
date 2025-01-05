#!/bin/sh

dockerd-entrypoint.sh &

sleep 5

if ! docker image inspect python:3.10-slim >/dev/null 2>&1; then
    docker pull python:3.10-slim
fi

if ! docker image inspect lakshaybabbar/custom-gcc:latest >/dev/null 2>&1; then
    docker pull lakshaybabbar/custom-gcc:latest
fi

if ! docker image inspect lakshaybabbar/node:02 >/dev/null 2>&1; then
    docker pull lakshaybabbar/node:02
fi

npm start

#!/bin/sh

dockerd-entrypoint.sh &

sleep 5

if ! docker image inspect python:3.10-slim >/dev/null 2>&1; then
    docker pull python:3.10-slim
fi

if ! docker image inspect lakshaybabbar/custom-gcc:latest >/dev/null 2>&1; then
    docker pull lakshaybabbar/custom-gcc:latest
fi

if ! docker image inspect node:18-alpine >/dev/null 2>&1; then
    docker pull node:18-alpine
fi

npm start

#!/bin/sh

dockerd-entrypoint.sh &

sleep 5

if ! docker image inspect python:3.10-alpine >/dev/null 2>&1; then
    docker pull python:3.10-alpine
fi

if ! docker image inspect lakshaybabbar/cpp >/dev/null 2>&1; then
    docker pull lakshaybabbar/cpp
fi

if ! docker image inspect node:18-alpine >/dev/null 2>&1; then
    docker pull node:18-alpine
fi

if ! docker image inspect lakshaybabbar/shell >/dev/null 2>&1; then
    docker pull lakshaybabbar/shell
fi

if ! docker image inspect lakshaybabbar/sqlite >/dev/null 2>&1; then
    docker pull lakshaybabbar/sqlite
fi

npm start

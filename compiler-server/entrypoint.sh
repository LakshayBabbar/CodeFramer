#!/bin/sh

dockerd-entrypoint.sh &

sleep 5

if ! docker image inspect lakshaybabbar/python >/dev/null 2>&1; then
    docker pull lakshaybabbar/python
fi

if ! docker image inspect lakshaybabbar/cpp >/dev/null 2>&1; then
    docker pull lakshaybabbar/cpp
fi

if ! docker image inspect lakshaybabbar/node >/dev/null 2>&1; then
    docker pull lakshaybabbar/node
fi

if ! docker image inspect lakshaybabbar/shell >/dev/null 2>&1; then
    docker pull lakshaybabbar/shell
fi

if ! docker image inspect lakshaybabbar/sqlite >/dev/null 2>&1; then
    docker pull lakshaybabbar/sqlite
fi

npm start

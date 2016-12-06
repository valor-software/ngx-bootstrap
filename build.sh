#!/bin/bash

docker build -t ng2:latest --no-cache --build-arg SAUCE_ACCESS_KEY=... --build-arg SAUCE_USERNAME=... .

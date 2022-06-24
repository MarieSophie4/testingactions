#!/bin/bash
echo Checking NPM version
npm -v
echo Installing source NPM dependencies
npm install
npm run devbuildAWS

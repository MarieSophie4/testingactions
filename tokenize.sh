#!/bin/bash
cd dist/assets/config
jq '.environment = $stage' config.base.json --arg stage "$STAGE" > tmp.json && mv tmp.json config.base.json
cd ../../..
echo Environment in config.base.json set to $STAGE

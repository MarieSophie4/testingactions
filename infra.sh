#!/bin/bash
export S3_CREATION_STACK_NAME="application-$APP_NAME-$STAGE-s3-web-hosting-bucket"
export WAF_CREATION_STACK_NAME="application-$APP_NAME-$STAGE-waf"
export CLOUDFRONT_CREATION_STACK_NAME="application-$APP_NAME-$STAGE-cloudfront-distribution"
echo Updating S3 web hosting bucket
aws cloudformation deploy --tags "${tags[@]}" --template-file templates/web-hosting-s3.yaml --stack-name ${S3_CREATION_STACK_NAME} --parameter-overrides ResourceSuffix=${APP_NAME} ResourcePrefix=${RESOURCE_PREFIX} Stage=${STAGE} --no-fail-on-empty-changeset
echo Retrieving S3 bucket name
export S3_BUCKET="$(aws cloudformation describe-stacks --stack-name ${S3_CREATION_STACK_NAME} --output text --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" --output text)"
echo Updating WAF
aws --region us-east-1 cloudformation deploy --template-file templates/web-hosting-waf.yaml --stack-name ${WAF_CREATION_STACK_NAME} --parameter-overrides ResourceSuffix=${APP_NAME} ResourcePrefix=${RESOURCE_PREFIX} Stage=${STAGE} --no-fail-on-empty-changeset --tags "${tags[@]}"
export WEB_ACL_ARN="$(aws --region us-east-1 cloudformation describe-stacks --stack-name ${WAF_CREATION_STACK_NAME} --output text --query "Stacks[0].Outputs[?OutputKey=='WebACLArn'].OutputValue" --output text)"
echo Updating CloudFront distribution
aws cloudformation deploy --tags "${tags[@]}" --template-file templates/web-hosting-cloudfront.yaml --stack-name ${CLOUDFRONT_CREATION_STACK_NAME} --parameter-overrides ResourceSuffix=${APP_NAME} ResourcePrefix=${RESOURCE_PREFIX} BucketName=${S3_BUCKET} CachingTTL=60 WebACLArn=${WEB_ACL_ARN} Stage=${STAGE} --no-fail-on-empty-changeset

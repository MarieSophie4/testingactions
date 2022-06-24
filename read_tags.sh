#!/bin/bash

# Description  Tags are read from the dynamodb table defined in the feature team account
#              The script needs to be added in the pre-build phase of the buildspec.yaml and before the infra.sh scripts
# $1           The first parameter is the name of the dynamodb tag table. The name of the tag table can be constructed by two env variables
#              of the build project : ${APPLICATION}-${STAGE}
# ${AWS_CODEBUILD_IAM_ROLE_ARN} : Parameter to be set as env variable of the build project
#                                 The ARN of the codebuild IAM role needs to be added to the Pattern_List table in the RoleList attributte
#                                 of the tag table item. This avoids that the AWS Taggingv2 mechanisme overwrites tags created by this script.
#                                 AWS Taggingv2 solution : https://confluence.axa.com/confluence/pages/viewpage.action?pageId=196021021
#                                 read_tags.sh : https://confluence.axa.com/confluence/pages/viewpage.action?pageId=218765827
#
# RETURN       Propagate tags via aws cloudformation by :
#                   adding --tags "${tags[@]}" to the aws cloudformation deploy command
#
#               Example :
#                   aws cloudformation deploy --template-file templates/web-hosting-s3.yaml --stack-name ${S3_CREATION_STACK_NAME} --tags "${tags[@]}" ..
#
#               This method of passing the tags is needed to support tag values with spaces . Simply specifying --tags $tags generates an error when tag values have spaces .


# Generate tag variable

if [ -z $1 ];then
  echo "Tag table parameter is missing."
  exit 1
else
  tag_table_name=$1
  echo "Reading the tags from table $tag_table_name"
  export GLOBAL_APP_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"global.app\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_DATACLASSIFICATION_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"data.classification\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_DCS_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"global.dcs\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_ENV_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"global.env\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_OPCO_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"global.opco\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_PROJECT_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"global.project\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_CBP_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"global.cbp\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"
  export GLOBAL_LOCALRESGROUP_TAG="$(aws dynamodb get-item --table-name ${tag_table_name} --key "{\"TagName\": {\"S\": \"local.res_group\"}}" | jq ".Item.TagValue.S" | sed s/\"//g)"

  export tags=("global.app=${GLOBAL_APP_TAG}" "data.classification=${GLOBAL_DATACLASSIFICATION_TAG}" "global.dcs=${GLOBAL_DCS_TAG}" "global.env=${GLOBAL_ENV_TAG}" "global.opco=${GLOBAL_OPCO_TAG}" "global.project=${GLOBAL_PROJECT_TAG}" "global.cbp=${GLOBAL_CBP_TAG}" "local.res_group=${GLOBAL_LOCALRESGROUP_TAG}")
  echo "${tags[@]}"

  echo "Tag values read from $tag_table_name"

fi

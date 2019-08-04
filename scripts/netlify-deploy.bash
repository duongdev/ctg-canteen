#!/bin/bash

echo CONTEXT=$CONTEXT REVIEW_ID=$REVIEW_ID

if [ $CONTEXT == "deploy-preview" ]; then
  echo "Applying PR SERVER_URI"
  export REACT_APP_SERVER_URI=https://ctg-canteen-pr-$REVIEW_ID.herokuapp.com/graphql
fi

echo REACT_APP_SERVER_URI=$REACT_APP_SERVER_URI

yarn workspace @guru-erp/web build

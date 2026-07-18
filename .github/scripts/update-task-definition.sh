#!/bin/bash

set -euo pipefail

IMAGE="$1"
TASK_FAMILY="$2"
CLUSTER="$3"
SERVICE="$4"
AWS_REGION="$5"
ENVIRONMENT="$6"
CONTAINER_NAME="$7"

echo "Updating task definition for ${TASK_FAMILY}"

# Try to get existing task definition
if ! aws ecs describe-task-definition \
  --task-definition "${TASK_FAMILY}" \
  --query 'taskDefinition' \
  --output json > td.json 2>/dev/null; then
  echo "Task definition ${TASK_FAMILY} not found, attempting to get from service ${SERVICE}..."
  if aws ecs describe-services \
    --cluster "${CLUSTER}" \
    --services "${SERVICE}" \
    --query 'services[0].taskDefinition' \
    --output text > current-task.txt 2>/dev/null && [ -s current-task.txt ]; then
    CURRENT_TASK=$(cat current-task.txt | tr -d '\r\n')
    if [ -n "${CURRENT_TASK}" ] && [ "${CURRENT_TASK}" != "None" ] && [ "${CURRENT_TASK}" != "null" ]; then
      echo "Using task definition from service: ${CURRENT_TASK}"
      aws ecs describe-task-definition \
        --task-definition "${CURRENT_TASK}" \
        --query 'taskDefinition' \
        --output json > td.json
    else
      echo "Error: Task definition ${TASK_FAMILY} does not exist and service ${SERVICE} has no task definition"
      echo "Please create the task definition manually in AWS ECS"
      rm -f current-task.txt
      exit 1
    fi
    rm -f current-task.txt
  else
    echo "Error: Unable to describe task definition ${TASK_FAMILY} or service ${SERVICE}"
    echo "Please ensure the task definition exists in AWS ECS"
    exit 1
  fi
fi

ENV_LOWER=$(echo "$ENVIRONMENT" | tr '[:upper:]' '[:lower:]')

# Create new task definition JSON
jq --arg IMAGE "$IMAGE" \
   --arg ENV_VALUE "$ENV_LOWER" \
   --arg CONTAINER "$CONTAINER_NAME" \
   --arg FAMILY "$TASK_FAMILY" \
   'del(.taskDefinitionArn,.revision,.status,.requiresAttributes,.compatibilities,.registeredAt,.deregisteredAt,.registeredBy,.inferenceAccelerators,.ephemeralStorage)
    | .family = $FAMILY
    | (.containerDefinitions |= map(
        if .name == $CONTAINER then
          .image = $IMAGE
          | (.environment = (
              ((.environment // [])
                | map({
                    name: (.name // ""),
                    value: ((.value // "") | tostring)
                  })
                | map(select(.name != "")))
              + [{name:"ENVIRONMENT", value:$ENV_VALUE}]
              | group_by(.name)
              | map(.[-1])
            ))
        else .
        end
      ))' td.json > td-new.json

# Register new task definition
REV=$(aws ecs register-task-definition \
  --cli-input-json file://td-new.json \
  --query 'taskDefinition.revision' \
  --output text)

echo "Registered ${TASK_FAMILY} revision: ${REV}"

# Update service
aws ecs update-service \
  --cluster "${CLUSTER}" \
  --service "${SERVICE}" \
  --task-definition "${TASK_FAMILY}:${REV}" \
  --force-new-deployment > /dev/null

rm -f td.json td-new.json

echo "✓ Deployed ${SERVICE} with ${TASK_FAMILY}:${REV}"

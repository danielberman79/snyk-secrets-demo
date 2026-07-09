#!/usr/bin/env bash
# Deploy gate: fetch the latest CircleCI pipeline status before shipping.
set -euo pipefail

CIRCLE_TOKEN="CCIPAT_9aBcD3eFgH1jK2mN4pQ6rS_a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3"

PROJECT_SLUG="gh/acme/app"
API_URL="https://circleci.com/api/v2"

curl --silent --fail \
  --header "Circle-Token: ${CIRCLE_TOKEN}" \
  "${API_URL}/project/${PROJECT_SLUG}/pipeline?branch=main" \
  | grep -o '"state":"[^"]*"' | head -n 1

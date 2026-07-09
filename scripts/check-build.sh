#!/usr/bin/env bash
# ⚠️ DEMO FIXTURE — INTENTIONALLY INSECURE ⚠️
#
# Deploy gate: fetch the latest CircleCI pipeline status before shipping.
# The Personal Access Token is hardcoded into the curl call — exactly how
# secrets leak into CI/deploy shell snippets.
set -euo pipefail

# CircleCI Personal Access Token (CCIPAT_…). Should be an env var; inlined here
# on purpose for the scan demo.
CIRCLE_TOKEN="bad45cf4-868d-59b8-8d02-860b5830d03e"

PROJECT_SLUG="gh/acme/app"
API_URL="https://circleci.com/api/v2"

curl --silent --fail \
  --header "Circle-Token: ${CIRCLE_TOKEN}" \
  "${API_URL}/project/${PROJECT_SLUG}/pipeline?branch=main" \
  | grep -o '"state":"[^"]*"' | head -n 1

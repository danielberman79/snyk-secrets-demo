# Canary values for the demo slots

The demo ships with six `INSERT_..._HERE` slots **sprawled across the repo**
(see the table in [`README.md`](README.md)). Fill them with **synthetic,
non-functional canaries** before running the scan. Never paste a real credential.

> The Snyk **Agent Guard** blocks the AI agent from writing secret-shaped
> strings to disk, so these slots are meant to be filled in by a human (or after
> adding a directory exception to the Agent Guard policy). That's why the actual
> values aren't reproduced in this repo — pull them from the public sources
> below.

## Where each slot's value comes from

### 1. Postgres connection string — `docker-compose.yml`
Slot: `INSERT_POSTGRES_PASSWORD_HERE` (appears twice — the `POSTGRES_PASSWORD`
env and the `DATABASE_URL` connection string; use the **same** value in both).
Format: `postgres://<user>:<password>@<host>:5432/<db>`

- Just invent a fake password — any non-real string works for a detection demo.
- For inspiration on connection-string detectors, see the gitleaks rules listed
  below.

### 2. AWS access key id + secret — `src/s3.js`
Slots: `INSERT_AWS_ACCESS_KEY_ID_HERE`, `INSERT_AWS_SECRET_ACCESS_KEY_HERE`
(hardcoded `||` fallbacks).

- **Best source:** AWS's own *published documentation example* key pair. It is
  intentionally non-functional and appears throughout AWS docs.
  - AWS CLI config docs: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
  - Search terms: "AWS example access key id" (the `AKIA…EXAMPLE` pair).

### 3. GitHub token — `.github/workflows/release.yml`
Slot: `INSERT_GITHUB_TOKEN_HERE` (the `GITHUB_TOKEN` workflow env).

- Classic format: `ghp_` + 36 alphanumeric characters.
- Fine-grained format: `github_pat_` + base62 segments.
- Generate a fake one yourself (random chars in the right shape), or pull a
  dummy from the trufflehog GitHub detector tests below.

### 4. Postman API key — `scripts/publish-collection.js`
Slot: `INSERT_POSTMAN_API_KEY_HERE`.

- Format: `PMAK-` + 24 hex chars + `-` + 34 hex chars
  (e.g. `PMAK-<24hex>-<34hex>`).
- Hand-craft a shaped dummy, or pull one from the gitleaks / trufflehog Postman
  detector fixtures below.

### 5. CircleCI Personal Access Token — `scripts/check-build.sh`
Slot: `INSERT_CIRCLECI_TOKEN_HERE`.

- Modern format: `CCIPAT_` + two base62 segments (e.g. `CCIPAT_<22>_<40>`).
- Legacy format: 40 lowercase hex characters.
- Hand-craft a shaped dummy, or pull one from the gitleaks / trufflehog CircleCI
  detector fixtures below.

### 6. npm registry auth token — `Dockerfile`
Slot: `INSERT_NPM_TOKEN_HERE` (the `NPM_TOKEN` build `ARG` default).

- Format: `npm_` + 36 base62 characters.
- Hand-craft a shaped dummy, or pull one from the gitleaks / trufflehog npm
  detector fixtures below.

## Public canary / fixture sources

| Source | Where to look | Notes |
|--------|---------------|-------|
| **gitleaks** | [`github.com/gitleaks/gitleaks`](https://github.com/gitleaks/gitleaks) → `testdata/`, `cmd/generate/config/rules/` | Sample match per rule type |
| **trufflehog** | [`github.com/trufflesecurity/trufflehog`](https://github.com/trufflesecurity/trufflehog) → `pkg/detectors/<provider>/*_test.go` | Use the inline dummy tokens; some real ones are env-gated |
| **detect-secrets** | [`github.com/Yelp/detect-secrets`](https://github.com/Yelp/detect-secrets) → `tests/` | Fixtures per plugin |
| **secrets-patterns-db** | [`github.com/mazen160/secrets-patterns-db`](https://github.com/mazen160/secrets-patterns-db) | Regexes for ~1,600 secret types — handy for hand-crafting valid dummies |

## Detection vs. validation

Snyk's engine (like the tools above) detects secrets primarily by
**structure and entropy**, so a well-formed dummy triggers detection just like a
live key would — perfect for this demo.

If you also want to demonstrate **validation** (the scanner confirming a secret
is actually live), that requires a *real, revocable* token you own and can
rotate immediately afterward. Keep that out of this repo; supply it only in a
controlled, throwaway environment.

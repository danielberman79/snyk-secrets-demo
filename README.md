# snyk-secrets-demo

> ⚠️ **Intentionally insecure.** This app exists solely to demonstrate Snyk's
> secret-scanning engine. It hardcodes secrets on purpose. **Do not deploy it,
> and never put real credentials in it.**

A minimal Node app that connects to **Postgres**, **S3**, and **GitHub**, plus
release tooling for **Postman** and **CircleCI**. Its six secrets are
deliberately **sprawled across the codebase** — fallback defaults in code, an
infra compose file, a CI workflow, a Dockerfile, and ad-hoc helper scripts —
instead of being tidily centralized. That mirrors how credentials actually leak, and exercises a
scanner across multiple file types and directories.

## Where the secrets live

| Secret | Location | Leak pattern it demonstrates |
|--------|----------|------------------------------|
| Postgres password (in connection string) | [`docker-compose.yml`](docker-compose.yml) | Infra / compose file |
| AWS access key id + secret | [`src/s3.js`](src/s3.js) (hardcoded `\|\|` fallback) | Fallback default baked into code |
| GitHub token | [`.github/workflows/release.yml`](.github/workflows/release.yml) | Hardcoded CI workflow credential |
| Postman API key (`PMAK-…`) | [`scripts/publish-collection.js`](scripts/publish-collection.js) | Ad-hoc helper script |
| CircleCI PAT (`CCIPAT_…`) | [`scripts/check-build.sh`](scripts/check-build.sh) | Secret inlined in a `curl` / shell snippet |
| npm registry auth token (`npm_…`) | [`Dockerfile`](Dockerfile) | Token baked into a build `ARG` default |

Non-secret configuration (regions, API base URLs, bucket, collection/project
IDs) stays in [`src/config.js`](src/config.js); the app modules (`db.js`,
`s3.js`, `github.js`) read their credentials from the environment, with the
insecure fallbacks noted above.

## Setup for the demo

Every secret slot ships as an `INSERT_..._HERE` placeholder. Replace each with a
**synthetic canary** before scanning:

1. **Postgres** — a fake password in the `docker-compose.yml` connection string.
2. **AWS** — a cloud-provider *published example* key pair (non-functional by design).
3. **GitHub** — a pattern-valid but fake `ghp_…` / `github_pat_…` token.
4. **Postman** — a `PMAK-<hex>-<hex>` shaped dummy.
5. **CircleCI** — a `CCIPAT_…` shaped dummy.
6. **npm** — an `npm_…` shaped dummy registry auth token.

See [`CANARIES.md`](CANARIES.md) for each slot's exact format and public canary
sources ([gitleaks](https://github.com/gitleaks/gitleaks),
[trufflehog](https://github.com/trufflesecurity/trufflehog)), which exist
precisely for exercising detectors.

## A note on the local Agent Guard

This machine runs Snyk's **Evo Agent Guard** hook, which blocks the *AI agent*
from writing secret-shaped strings to disk. That's why the canary slots are
left empty here — they were filled in by a human, not the agent. If you want the
agent to populate them directly, add a path exception for this directory to the
Agent Guard policy. (The Agent Guard and the secret-scanning engine are separate
layers: one governs agent output, the other scans your repository.)

## Run

```sh
npm install
npm start
```

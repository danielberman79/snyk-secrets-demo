# snyk-secrets-demo

> ⚠️ **Intentionally insecure.** This app exists solely to demonstrate Snyk's
> secret-scanning engine. It hardcodes secrets on purpose. **Do not deploy it,
> and never put real credentials in it.**

A minimal Node app that connects to **Postgres**, **S3**, and **GitHub**, with
all three sets of credentials hardcoded in [`src/config.js`](src/config.js) —
exactly the anti-pattern a secret scanner should flag.

## Layout

| File | Secret it carries |
|------|-------------------|
| `src/config.js` | All hardcoded secrets live here (Postgres password, AWS key pair, GitHub token) |
| `src/db.js`     | Consumes the Postgres connection string |
| `src/s3.js`     | Consumes the AWS access key id + secret |
| `src/github.js` | Consumes the GitHub token |
| `src/index.js`  | Wires the three together so the secrets are "reachable" |

## Setup for the demo

`src/config.js` ships with empty `INSERT_..._HERE` slots. Fill each one with a
**synthetic canary** before scanning:

1. **Postgres** — a `postgres://user:password@host:5432/db` string with any fake password.
2. **AWS** — use a cloud-provider *published example* key pair (non-functional by design).
3. **GitHub** — a pattern-valid but fake token.

Good public canary sources: the test corpora in
[gitleaks](https://github.com/gitleaks/gitleaks) and
[trufflehog](https://github.com/trufflesecurity/trufflehog), which exist
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

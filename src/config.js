// ⚠️ DEMO FIXTURE — INTENTIONALLY INSECURE ⚠️
//
// Non-secret configuration only. The actual credentials for this demo are
// deliberately SPRAWLED across the codebase rather than centralized here —
// because that's how secrets leak in real projects: fallback defaults baked
// into code, infra compose files, CI workflows, and ad-hoc helper scripts.
//
// See README "Where the secrets live" for the full map.

module.exports = {
  // Postgres connection string is injected via DATABASE_URL (see docker-compose.yml).
  database: {
    url: process.env.DATABASE_URL,
  },

  // AWS region/bucket are non-secret; the access key pair is a hardcoded
  // fallback baked into src/s3.js (a classic real-world leak pattern).
  aws: {
    region: 'us-east-1',
    bucket: 'acme-app-uploads',
  },

  // GitHub token is provided by CI (see .github/workflows/release.yml) via GITHUB_TOKEN.
  github: {
    apiUrl: 'https://api.github.com',
  },

  // Postman / CircleCI credentials live in scripts/ (publish-collection.js, check-build.sh).
  postman: {
    apiUrl: 'https://api.getpostman.com',
    collectionId: '12345678-a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  },
  circleci: {
    apiUrl: 'https://circleci.com/api/v2',
    projectSlug: 'gh/acme/app',
  },
};

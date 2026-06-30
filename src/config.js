// ⚠️ DEMO FIXTURE — INTENTIONALLY INSECURE ⚠️
//
// This file is designed to hold HARDCODED secrets so Snyk's secret-scanning
// engine has something to detect. The slots below are empty placeholders.
//
// >>> REPLACE EACH "INSERT_..._HERE" SLOT WITH A SYNTHETIC CANARY VALUE <<<
//
// Use non-functional canaries ONLY (e.g. cloud-provider published example
// keys, or values from the gitleaks / trufflehog test corpora). Never paste a
// real credential. This file should never ship in a real application — secrets
// belong in environment variables or a secrets manager.

module.exports = {
  // --- PostgreSQL: secret lives inside the connection string (the password) ---
  database: {
    url: 'postgres://app_user:pgD3mo_Canary!7f3a9c2e@db.internal.example.com:5432/app_prod',
  },

  // --- AWS / S3: access key id + secret access key ---
  aws: {
    region: 'us-east-1',
    accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
    secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    bucket: 'acme-app-uploads',
  },

  // --- GitHub: personal access token (classic or fine-grained) ---
  github: {
    token: 'ghp_jPCwSjjw3L8exKZTsdtw95GJtTS01kqGMcDN',
    apiUrl: 'https://api.github.com',
  },
};

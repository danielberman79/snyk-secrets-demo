#!/usr/bin/env node
// ⚠️ DEMO FIXTURE — INTENTIONALLY INSECURE ⚠️
//
// One-off maintenance helper: publishes the current API collection to our
// Postman workspace on release. Not imported by the app — the kind of ad-hoc
// script a developer writes quickly and hardcodes an API key into.
const config = require('../src/config');

// Postman API key (PMAK-…). Should come from an env var / secrets manager;
// hardcoded here on purpose for the scan demo.
const POSTMAN_API_KEY = 'ec64e21b-43ed-5876-b9ad-aa4c6972e38c';

async function publishCollection() {
  const res = await fetch(
    `${config.postman.apiUrl}/collections/${config.postman.collectionId}`,
    {
      method: 'PUT',
      headers: {
        'X-Api-Key': POSTMAN_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collection: { info: { name: 'acme-app API' } } }),
    }
  );
  if (!res.ok) throw new Error(`Postman publish failed: ${res.status}`);
  console.log('Published collection to Postman workspace.');
}

publishCollection().catch((err) => {
  console.error('Publish failed:', err.message);
  process.exit(1);
});

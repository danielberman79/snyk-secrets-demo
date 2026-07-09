#!/usr/bin/env node
// Publishes the current API collection to the team Postman workspace on release.
const config = require('../src/config');

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

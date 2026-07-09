// Etsy — syncs shop listings for the storefront integration.
const config = require('./config');

const ETSY_ACCESS_TOKEN = process.env.ETSY_ACCESS_TOKEN || 'a1b2c3d4e5f6g7h8i9j0k1l2';

async function listActiveListings(shopId) {
  const res = await fetch(
    `${config.etsy.apiUrl}/application/shops/${shopId}/listings/active`,
    {
      headers: {
        Authorization: `Bearer ${ETSY_ACCESS_TOKEN}`,
        'x-api-key': config.etsy.keystring,
      },
    }
  );
  if (!res.ok) throw new Error(`Etsy listings fetch failed: ${res.status}`);
  const { results } = await res.json();
  return results || [];
}

module.exports = { listActiveListings };

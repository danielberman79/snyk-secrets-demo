// Entry point — exercises all three integrations so the secrets in config.js
// are clearly "used" (helps demonstrate reachability alongside detection).
const db = require('./db');
const s3 = require('./s3');
const github = require('./github');
const telemetry = require('./telemetry');
const adobe = require('./adobe');
const discord = require('./discord');
const etsy = require('./etsy');

async function main() {
  console.log('Snyk secrets demo — starting up…');

  await telemetry.reportStartup();

  const [userCount, uploads, viewer, adobeToken, listings] = await Promise.all([
    db.getUserCount(),
    s3.listUploads(),
    github.getViewer(),
    adobe.getAccessToken(),
    etsy.listActiveListings(require('./config').etsy.shopId),
  ]);

  await discord.notifyRelease(require('../package.json').version);

  console.log(`Postgres users:   ${userCount}`);
  console.log(`S3 objects:       ${uploads.length}`);
  console.log(`GitHub viewer:    ${viewer}`);
  console.log(`Adobe token:      ${adobeToken ? 'acquired' : 'none'}`);
  console.log(`Etsy listings:    ${listings.length}`);
}

main().catch((err) => {
  console.error('Demo failed:', err.message);
  process.exit(1);
});

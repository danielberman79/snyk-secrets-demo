// Entry point — exercises all three integrations so the secrets in config.js
// are clearly "used" (helps demonstrate reachability alongside detection).
const db = require('./db');
const s3 = require('./s3');
const github = require('./github');

async function main() {
  console.log('Snyk secrets demo — starting up…');

  const [userCount, uploads, viewer] = await Promise.all([
    db.getUserCount(),
    s3.listUploads(),
    github.getViewer(),
  ]);

  console.log(`Postgres users:   ${userCount}`);
  console.log(`S3 objects:       ${uploads.length}`);
  console.log(`GitHub viewer:    ${viewer}`);
}

main().catch((err) => {
  console.error('Demo failed:', err.message);
  process.exit(1);
});

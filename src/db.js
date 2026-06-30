// PostgreSQL client — reads its connection string (with embedded password) from config.
const { Client } = require('pg');
const config = require('./config');

async function getUserCount() {
  const client = new Client({ connectionString: config.database.url });
  await client.connect();
  try {
    const res = await client.query('SELECT COUNT(*)::int AS count FROM users');
    return res.rows[0].count;
  } finally {
    await client.end();
  }
}

module.exports = { getUserCount };

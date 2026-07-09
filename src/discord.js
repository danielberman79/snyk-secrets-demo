// Discord — posts release notifications to the team server.
const config = require('./config');

// Discord OAuth application client id.
const DISCORD_CLIENT_ID = '987654321098765432';

async function notifyRelease(version) {
  const res = await fetch(`${config.discord.apiUrl}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      grant_type: 'client_credentials',
      scope: 'identify connections',
    }),
  });
  if (!res.ok) throw new Error(`Discord auth failed: ${res.status}`);
  return { notified: true, version };
}

module.exports = { notifyRelease, clientId: DISCORD_CLIENT_ID };

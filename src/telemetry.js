// Telemetry — ships runtime metrics to Datadog.
const config = require('./config');

const DD_API_KEY = process.env.DD_API_KEY || 'a1b2c3d4e5f60718293a4b5c6d7e8f90';

async function reportStartup() {
  const res = await fetch(`${config.datadog.apiUrl}/api/v1/series`, {
    method: 'POST',
    headers: {
      'DD-API-KEY': DD_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      series: [
        { metric: 'app.startup', points: [[Math.floor(Date.now() / 1000), 1]] },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Datadog metric submission failed: ${res.status}`);
}

module.exports = { reportStartup };

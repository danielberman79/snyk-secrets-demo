// Adobe PDF Services — renders uploaded documents to PDF.
const config = require('./config');

// Adobe IMS client id for the PDF Services API integration.
const ADOBE_CLIENT_ID = 'f0e1d2c3b4a5968778695a4b3c2d1e0f';

async function getAccessToken() {
  const res = await fetch(`${config.adobe.imsUrl}/ims/token/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: ADOBE_CLIENT_ID,
      scope: 'openid,AdobeID,DCAPI',
    }),
  });
  if (!res.ok) throw new Error(`Adobe IMS auth failed: ${res.status}`);
  const { access_token } = await res.json();
  return access_token;
}

module.exports = { getAccessToken, clientId: ADOBE_CLIENT_ID };

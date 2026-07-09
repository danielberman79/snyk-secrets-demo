// S3 client — built from the hardcoded AWS credentials in config.
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const config = require('./config');

// NOTE: credentials fall back to hardcoded values when the env vars are unset —
// the single most common way AWS keys end up committed to a repo.
const client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'INSERT_AWS_ACCESS_KEY_ID_HERE',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'INSERT_AWS_SECRET_ACCESS_KEY_HERE',
  },
});

async function listUploads() {
  const out = await client.send(
    new ListObjectsV2Command({ Bucket: config.aws.bucket, MaxKeys: 10 })
  );
  return (out.Contents || []).map((o) => o.Key);
}

module.exports = { listUploads };

// S3 client — built from the hardcoded AWS credentials in config.
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const config = require('./config');

const client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

async function listUploads() {
  const out = await client.send(
    new ListObjectsV2Command({ Bucket: config.aws.bucket, MaxKeys: 10 })
  );
  return (out.Contents || []).map((o) => o.Key);
}

module.exports = { listUploads };

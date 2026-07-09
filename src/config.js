// Application configuration.
module.exports = {
  database: {
    url: process.env.DATABASE_URL,
  },

  aws: {
    region: 'us-east-1',
    bucket: 'acme-app-uploads',
  },

  github: {
    apiUrl: 'https://api.github.com',
  },

  postman: {
    apiUrl: 'https://api.getpostman.com',
    collectionId: '12345678-a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  },
  circleci: {
    apiUrl: 'https://circleci.com/api/v2',
    projectSlug: 'gh/acme/app',
  },
};

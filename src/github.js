// GitHub client — authenticates with the hardcoded token in config.
const { Octokit } = require('@octokit/rest');
const config = require('./config');

// Token comes from the CI environment (GITHUB_TOKEN), set — insecurely — as a
// hardcoded value in .github/workflows/release.yml.
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: config.github.apiUrl,
});

async function getViewer() {
  const { data } = await octokit.rest.users.getAuthenticated();
  return data.login;
}

module.exports = { getViewer };

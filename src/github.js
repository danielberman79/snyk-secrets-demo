// GitHub client — authenticates with the hardcoded token in config.
const { Octokit } = require('@octokit/rest');
const config = require('./config');

const octokit = new Octokit({
  auth: config.github.token,
  baseUrl: config.github.apiUrl,
});

async function getViewer() {
  const { data } = await octokit.rest.users.getAuthenticated();
  return data.login;
}

module.exports = { getViewer };

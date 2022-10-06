const { Octokit } = require("octokit");
const { token } = require("./config.json");
const fs = require("fs");
const path = require("path");

const viewPullRequests = require("./commands/viewPullRequests");
const mergePullRequests = require("./commands/mergePullRequests");
const extractFilesFromPR = require("./commands/extractFilesFromPR");

const octokit = new Octokit({
  auth: token,
});

const owner = "";
const repo = "";

fs.mkdir(path.join(`${__dirname}`, repo), (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Success");
});

(async () => {
  const pullRequest = await viewPullRequests.execute(octokit, repo, owner);
  console.log(pullRequest);
  for (let user of pullRequest.users) {
    await extractFilesFromPR.execute(
      octokit,
      repo,
      owner,
      user.user,
      user.pull_number
    );
    await mergePullRequests.execute(octokit, owner, repo, user.pull_number);
  }
})();

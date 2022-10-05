const { Octokit } = require("octokit");
const { token, token2 } = require("./config.json");
const fs = require("fs");
const path = require("path");

const viewPullRequests = require("./commands/viewPullRequests");
const mergePullRequests = require("./commands/mergePullRequests");
const extractFilesFromPR = require("./commands/extractFilesFromPR");

const octokit = new Octokit({
  auth: token2,
});

const owner = "BasicLucifer";
const repo = "secondrepo";

fs.mkdir(path.join(`${__dirname}`, repo), (err) => {
  console.log("Success");
});

(async () => {
  const pullRequestNums = await viewPullRequests.execute(octokit, repo, owner);
  console.log(pullRequestNums);
  for (let user of pullRequestNums.users) {
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

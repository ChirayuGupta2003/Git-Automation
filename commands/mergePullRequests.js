module.exports = {
  execute: async (octokit, owner, repo, pull_number) => {
    try {
      const result = await octokit.request(
        "PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge",
        {
          owner: owner,
          repo: repo,
          pull_number: pull_number,
        }
      );

      console.log(result["status"]);
    } catch (e) {
      console.log(e);
    }
  },
};

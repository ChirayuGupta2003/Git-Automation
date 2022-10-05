module.exports = {
  execute: async (octokit, repo, owner) => {
    try {
      const result = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: owner,
        repo: repo,
      });

      return {
        users: result.data.map((data) => {
          return { user: data.user.login, pull_number: data.number };
        }),
      };
    } catch (e) {
      console.error(e);
    }
  },
};

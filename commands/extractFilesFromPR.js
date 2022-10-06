const axios = require("axios");
const fs = require("fs");

module.exports = {
  execute: async (octokit, repo, owner, user, pull_number) => {
    try {
      // get files from a pull request
      const result = await octokit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
        {
          owner: owner,
          repo: repo,
          pull_number: pull_number,
        }
      );

      // make a folder with username
      fs.mkdir(`./${repo}/${user}`, (err) => {
        console.log(`${user} folder created succefully`);
      });

      // loop through all files
      for (const file of result.data) {
        // get contents of files
        const contents = await axios.get(file.raw_url).then((res) => res.data);

        // write contents of files
        fs.writeFile(`./${repo}/${user}/${file.filename}`, contents, (err) => {
          if (err) {
            console.error(err);
          }
          console.log("Created file succefully");
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

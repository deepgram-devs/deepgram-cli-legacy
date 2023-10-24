const tomlParser = require("toml").parse;
const { Octokit } = require("@octokit/rest");
const { RequestError } = require("@octokit/request-error");
const fs = require("fs");

const buildStartersList = async () => {
  const octokit = new Octokit();

  const DEEPGRAM_STARTER_ORG = "deepgram-starters";

  let { data } = await octokit.rest.repos.listForOrg({
    org: DEEPGRAM_STARTER_ORG,
  });

  for await (let [i, repo] of data.entries()) {
    try {
      const { data: config } = await octokit.rest.repos.getContent({
        owner: DEEPGRAM_STARTER_ORG,
        repo: repo.name,
        path: "deepgram.toml",
      });
      const content = atob(config.content);
      const toml = tomlParser(content);

      data[i].deepgram = toml;
    } catch (error) {
      if (error instanceof RequestError && error.status === 404) {
        delete data[i];
      }
    }
  }

  fs.writeFile("./src/starters.json", JSON.stringify(data.filter((v) => v !== null)), (error) => {
    if (error) throw error;
  });
};

buildStartersList();

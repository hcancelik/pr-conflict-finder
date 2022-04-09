const core = require("@actions/core");
const { context: github } = require("@actions/github");
const Action = require("./src/action");

async function run() {
  try {
    const token = core.getInput("SECRET_TOKEN");
    core.info(`Test: ${token}`);

    const label = core.getInput("CONFLICT_LABEL");
    const maxTries = Number(core.getInput("MAX_TRIES"));
    const waitMs = Number(core.getInput("WAIT_MS"));

    const { owner, repo } = github.repo;

    console.info(token === null ? "No token provided" : "Token provided");

    let pr = null;

    core.info(JSON.stringify(github.payload));

    if (github.payload && github.payload.pull_request) {
      pr = github.payload.pull_request;

      core.info(JSON.stringify(github));
      core.info(JSON.stringify(github.payload));
    }


    const action = new Action(token, owner, repo, label, maxTries, waitMs);

    await action.run(pr);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

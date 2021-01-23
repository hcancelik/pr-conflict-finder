const api = require("./api");

class Action {
  constructor (token, owner, repo, conflictLabel, breakSomething, maxTries, waitMs) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.label = conflictLabel;
    this.maxTries = maxTries;
    this.waitMs = waitMs;
    this.breakSomething = breakSomething;
  }

  async run (pr = null) {
    if (pr) {
      await this.checkPR(pr);
    } else {
      await this.checkAllPRs();
    }
  }

  async checkPR (pr) {
    await this.checkMergeStatus(pr.number);
  }

  async checkAllPRs () {
    const pullRequests = await api.getOpenPullRequests(this.token, this.owner, this.repo);

    for await (const pullRequest of pullRequests) {
      await this.checkMergeStatus(pullRequest.number);
    }
  }

  async checkMergeStatus(pullRequestNumber) {
    let mergeStatus = null;
    let pr;
    let tries = 1;

    while(mergeStatus === null && tries <= this.maxTries) {
      pr = await api.getPullRequest(this.token, this.owner, this.repo, pullRequestNumber);

      mergeStatus = pr.mergeable;

      if (tries > 1 && mergeStatus === null) {
        await new Promise(resolve => setTimeout(resolve, this.waitMs));
      }

      tries += 1;
    }

    if(mergeStatus) {
      await this.removeLabel(pr);
    } else {
      await this.addLabel(pr);
    }
  }

  async removeLabel(pullRequest) {
    if (pullRequest.labels && pullRequest.labels.length > 0) {
      if (pullRequest.labels.filter((label) => label.name === this.label).length > 0) {
        await api.removeLabelFromPullRequest(this.token, this.owner, this.repo, pullRequest.number, this.label);
      }
    }
  }

  async addLabel(pullRequest) {
    if (pullRequest.labels && pullRequest.labels.length > 0) {
      if (pullRequest.labels.filter((label) => label.name === this.label).length > 0) {
        return;
      }
    }

    await api.addLabelToPullRequest(this.token, this.owner, this.repo, pullRequest.number, this.label);
  }
}

module.exports = Action;

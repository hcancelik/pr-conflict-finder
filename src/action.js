const api = require("./api");
const helper = require("./helper");

class Action {
  constructor (token, owner, repo) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
  }

  async run (pr = null) {
    if (pr) {
      await this.checkPR(pr);
    } else {
      await this.checkAllPRs();
    }
  }

  async checkPR (pr) {
    // TODO
  }

  async checkAllPRs () {
    // TODO
  }
}

module.exports = Action;

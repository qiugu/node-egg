/* eslint-disable strict */
const crypto = require('crypto');
const TRANSITION = Symbol('Application#transition');

module.exports = {
  toInt(val) {
    if (!val) {
      return 0;
    }
    return Number.parseFloat(val);
  },
  // 事务
  async transition() {
    if (!this[TRANSITION]) {
      this[TRANSITION] = await this.model.transaction();
    }
    return this[TRANSITION];
  },
  deleteTransition() {
    this[TRANSITION] = null;
  },
};

/* eslint-disable strict */
const crypto = require('crypto');

module.exports = {
  toInt(val) {
    if (!val) {
      return 0;
    }
    return Number.parseFloat(val);
  },
};

/* eslint-disable strict */
const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.token;
  }

  success(data, msg) {
    this.ctx.status = 200;
    this.ctx.body = {
      status: 200,
      resultData: data,
      resultMsg: msg,
    };
  }

  error(msg) {
    msg = msg || '内部错误，请联系管理员';
    this.ctx.throw(404, msg);
  }

  exception(msg) {
    this.ctx.status = 200;
    this.ctx.body = {
      status: 422,
      resultMsg: msg,
    };
  }
}

module.exports = BaseController;

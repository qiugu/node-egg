/* eslint-disable strict */
const { Controller } = require('egg')

class BaseController extends Controller {
  get user() {
    return this.ctx.session.token
  }

  success(data, msg) {
    this.ctx.status = 200
    this.ctx.body = {
      status: 200,
      resultData: data,
      resultMsg: msg,
    }
  }

  error(msg) {
    msg = msg || '内部错误，请联系管理员'
    this.ctx.throw(404, msg)
  }

  exception(msg) {
    this.ctx.status = 200
    this.ctx.body = {
      status: 422,
      resultMsg: msg,
    }
  }

  //  验证参数规则
  validateParams(rule) {
    const { ctx } = this
    try {
      ctx.validate(rule)
    } catch (error) {
      ctx.logger.warn(error.errors)
      this.exception(error.message)
      return error
    }
  }
}

module.exports = BaseController

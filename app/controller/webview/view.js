/* eslint-disable strict */
const Controller = require('../base')

class UsersController extends Controller {
  //  博客商城首页
  async index() {
    const { ctx } = this
    await ctx.render('index.html', ctx.app.config)
  }

  //  留言信息
  async leaveMessage() {
    const { ctx } = this
    const param = ctx.request.body
    const rule = {
      username: {
        type: 'string',
        trim: true,
      },
      email: {
        type: 'email',
      },
      message: {
        type: 'string',
      },
    }
    try {
      ctx.validate(rule)
    } catch (err) {
      ctx.logger.warn(err.errors)
      this.exception(err.message)
      return
    }

    const res = await ctx.service.webservice.leaveMessage(param)
    if (!res) {
      this.exception('留言失败，请重试')
      return
    }
    this.success(res, 'ok')
  }
}

module.exports = UsersController

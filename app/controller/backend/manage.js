/* eslint-disable strict */
const Controller = require('../base')

class HomeController extends Controller {
  //  首页登录
  async index() {
    const { ctx } = this
    const param = ctx.request.body
    const rule = {
      username: {
        type: 'string',
        trim: true,
      },
      password: {
        type: 'string',
        trim: true,
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const user = await ctx.service.user.findByUser(param.username, param.password)
    if (user.length <= 0) {
      this.exception('账号或密码错误')
      return
    }
    const { uuid, roles, username, name } = user[0]
    const result = { uuid, roles, username, name }
    const token = await ctx.setToken(result)
    this.success(Object.assign(result, { ACCESS_TOKEN: token }), '登录成功')
  }

  //  获取用户角色信息
  async getRoles() {
    const { ctx } = this
    const param = ctx.request.body
    const rule = {
      loginName: 'string',
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const res = await ctx.service.user.findRoles(param.loginName)
    if (!res) {
      this.exception('未查询到数据')
      return
    }
    this.success(res, 'ok')
  }

  //  用户注册
  async register() {
    const { ctx } = this
    const param = this.ctx.request.body
    const rule = {
      username: {
        type: 'string',
        max: 50,
      },
      password: {
        type: 'string',
        min: 6,
      },
      password2: {
        type: 'string',
        min: 6,
      },
      mobile: {
        type: 'string',
        format: /^1[3456789]\d{9}$/,
        min: 11,
      },
      captcha: {
        type: 'string',
        max: 4,
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    if (param.password !== param.password2) {
      this.exception('账号和密码不一致，请重新输入')
      return
    }
    const captcha = await ctx.app.redis.get('captcha')
    this.logger.info(`注册验证码：${captcha.toLowerCase()}`)
    if (param.captcha !== captcha.toLowerCase()) {
      this.exception('验证码输入错误，请重新输入')
      return
    }
    const user = await ctx.service.user.createUser(param)
    user && this.success(user, '注册成功')
  }

  //  获取图片验证码
  async verify() {
    const { ctx } = this
    const captcha = await ctx.service.user.captcha() // 服务里面的方法
    ctx.response.type = 'image/svg+xml' // 知道你个返回的类型
    ctx.session.code = captcha.text
    ctx.body = captcha.data // 返回一张图片
  }

  //  获取用户消息通知
  async getMessage() {
    const { ctx } = this
    const rule = {
      token: {
        type: 'string',
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const list = await ctx.app.cache
    if (!list) {
      this.exception('未查询到数据')
      return
    }
    this.success(list, 'ok')
  }

  //  github第三方用户登录
  async githubAuth() {
    const { ctx } = this
    const rule = {
      code: {
        type: 'string',
      },
      client_id: {
        type: 'string',
      },
      client_secret: {
        type: 'string',
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const params = ctx.request.body
    const userinfo = await ctx.service.user.getGithubInfo(params)
    if (!userinfo) {
      this.exception('未查询到数据')
      return
    }
    const { uuid, roles, username, name } = userinfo
    const result = { uuid, roles, username, name }
    const token = await ctx.setToken(result)
    this.success(Object.assign(result, { ACCESS_TOKEN: token }), '登录成功')
  }
}

module.exports = HomeController

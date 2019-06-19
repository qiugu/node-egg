/* eslint-disable strict */
const Service = require('egg').Service
const Op = require('sequelize').Op
const md5 = require('md5')
const svgCaptcha = require('svg-captcha')

class UserService extends Service {

  //  查询账户密码
  async findByUser(username, password) {
    const { ctx } = this
    const res = await ctx.model.User.findAll({
      where: {
        [Op.and]: [{ username }, { password: md5(password) }],
      },
    })
    return res
  }

  // 查询角色信息
  async findRoles(loginName) {
    const roleInfo = await this.ctx.model.User.findAll({
      where: { username: loginName },
      limit: 1,
    })
    const roles = roleInfo.find(item => item.roles)
    const res = await this.ctx.model.RolesInfo.findAll({
      where: { roles: roles.roles },
    })
    const permissionList = res[0].permissionList.split(',')
    const newRes = Object.assign(res[0], {
      permissionList,
    })
    return { info: newRes }
  }

  //  注册用户
  async createUser(params) {
    const { ctx } = this
    const { username, password, mobile } = params
    const newMobile = await ctx.model.User.find({
      where: { telephone: mobile },
    })
    const newUserName = await ctx.model.User.find({
      where: { username },
    })
    if (newMobile || newUserName) {
      ctx.body = {
        status: 422,
        resultMsg: '用户名或手机号码已经存在',
      }
      return
    }
    const res = await ctx.model.User.addUser({ username, password, mobile })
    return res
  }

  //  验证码服务
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      bacground: '#cc9966',
    })
    await this.ctx.app.redis.set('captcha', captcha.text.toLowerCase())
    return captcha
  }

  //  第三方github用户登录服务
  async getGithubInfo(params) {
    const { ctx } = this
    const res = await ctx.curl('https://github.com/login/oauth/access_token', {
      dataType: 'json',
      data: params,
    })
    this.logger.info(res.data.access_token)
    const userinfo = await ctx.curl(`https://api.github.com/user?access_token=${res.data.access_token}`, {
      dataType: 'json',
    })
    const newUserName = await ctx.model.User.find({
      where: { username: userinfo.data.login },
    })
    if (!newUserName) {
      const res = await ctx.model.User.addUser({
        username: userinfo.data.login,
        password: userinfo.data.node_id,
        mobile: userinfo.data.id,
      })
      if (!res) {
        ctx.body = {
          status: 422,
          resultMsg: '第三方用户创建失败，请联系管理员',
        }
        return
      }
    }
    return userinfo
  }
}

module.exports = UserService

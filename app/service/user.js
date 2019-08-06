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

  /**
   * github第三方用户登陆服务
   * @param {object} params github第三方用户登陆相关配置信息 
   */
  async getGithubInfo(params) {
    const { ctx } = this
    //  获取access_token
    const res = await ctx.curl('https://github.com/login/oauth/access_token', {
      dataType: 'json',
      data: params,
    })
    this.logger.info(res.data.access_token)
    //  利用access_token来获取用户信息
    const userinfo = await ctx.curl(`https://api.github.com/user?access_token=${res.data.access_token}`, {
      dataType: 'json'
    })
    //  根据获取的用户名加上'github'去请求数据库
    const newUserName = await ctx.model.User.findByUsername(`${userinfo.data.login}-github`)
    //  如果查询不到用户，则创建用户
    if (!newUserName) {
      const res = await ctx.model.User.addUser({
        username: `${userinfo.data.login}-github`,
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
      //  创建用户以后，利用用户去查询
      const newUserCreate = await ctx.model.User.findByUsername(`${userinfo.data.login}-github`)
      return newUserCreate
    }
    return newUserName
  }
}

module.exports = UserService

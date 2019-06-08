/* eslint-disable strict */
const Service = require('egg').Service;
const Op = require('sequelize').Op;
const md5 = require('md5');
const svgCaptcha = require('svg-captcha');

class UserService extends Service {

  //  查询账户密码
  async findByUser(username, password) {
    const ctx = this.ctx;
    const res = await ctx.model.User.findAll({
      where: {
        [Op.and]: [{ username }, { password: md5(password) }],
      },
    });
    return res;
  }

  // 查询角色信息
  async findRoles(loginName) {
    const roleInfo = await this.ctx.model.User.findAll({
      where: { username: loginName },
      limit: 1,
    });
    const roles = roleInfo.find(item => item.roles);
    const res = await this.ctx.model.RolesInfo.findAll({
      where: { roles: roles.roles },
    });
    const permissionList = res[0].permissionList.split(',');
    const newRes = Object.assign(res[0], {
      permissionList,
    });
    return { info: newRes };
  }

  //  注册用户
  async createUser(params) {
    const { ctx } = this;
    const { username, password, mobile } = params;
    const newMobile = await ctx.model.User.find({
      where: { telephone: mobile },
    });
    const newUserName = await ctx.model.User.find({
      where: { username },
    });
    if (newMobile || newUserName) {
      ctx.body = {
        status: 422,
        resultMsg: '用户名已经存在',
      };
      return;
    }
    const res = await ctx.model.User.addUser({ username, password, mobile });
    return res;
  }

  //  验证码服务
  async captcha () {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      bacground: '#cc9966'
    });
    await this.ctx.app.redis.set('captcha',captcha.text.toLowerCase())
    return captcha;
  }
}

module.exports = UserService;

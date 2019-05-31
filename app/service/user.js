/* eslint-disable strict */
const Service = require('egg').Service;
const Op = require('sequelize').Op;
const md5 = require('md5');

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
    const { email, password, mobile } = params;
    const newEmail = await ctx.model.User.find({
      where: { email },
    });
    const newUserName = await ctx.model.User.find({
      where: { username: email },
    });
    if (newEmail || newUserName) {
      ctx.body = {
        status: 422,
        message: '用户名已经存在',
      };
      return;
    }
    const res = await ctx.model.User.addUser({ email, password, mobile });
    return res;
  }

  async commonRegister({ username, password, email, provider, id, thirdPassUpdateStatus, avatarUrl, abstract }) {
    const ctx = this.ctx;
    const user = await ctx.model.User.create({
      username,
      password,
      email,
      provider,
      id,
      thirdPassUpdateStatus,
      avatarUrl,
      abstract,
    });
    return user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.app.toInt(ctx.params.id);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.app.toInt(ctx.params.id);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserService;

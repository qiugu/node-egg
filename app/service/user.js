/* eslint-disable strict */
const Service = require('egg').Service;
const Op = require('sequelize').Op;
const md5 = require('md5');

class UserService extends Service {
  // 查询角色以及菜单信息
  async findRoles(loginName) {
    const role = await this.ctx.model.User.findAll({
      where: { username: loginName },
      attributes: [ 'roles' ],
      limit: 1,
    });
    const roles = role.map(item => item.roles);
    const main = await this.ctx.model.Main.findAll({
      attributes: [ 'id', 'title', 'icon', 'key' ],
    });
    for (let i = 0; i < main.length; i++) {
      const sub = await this.ctx.model.Sub.findAll({
        where: { parent_id: main[i].id },
        attributes: [ 'title', 'icon', 'key' ],
      });
      if (sub && sub.length > 0) {
        main[i].children = sub;
      }
    }
    return { menus: main, roles };
  }

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

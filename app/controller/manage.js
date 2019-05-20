/* eslint-disable strict */
const Controller = require('./base');

class HomeController extends Controller {
  //  首页登录
  async index() {
    const { ctx } = this;
    console.log(ctx.app.config.env);
    const param = ctx.request.body;
    const rule = {
      username: 'string',
      password: 'string',
    };
    ctx.validate(rule);
    const user = await ctx.service.user.findByUser(param.username, param.password);
    if (!user && user.length <= 0) {
      this.exception('账号或密码错误');
    }
    const { uuid, roles, username, name } = user[0];
    const result = { uuid, roles, username, name };
    const token = ctx.setToken(result);
    this.success(Object.assign(result, { ACCESS_TOKEN: token }), '登录成功');
  }

  //  获取用户角色信息
  async getRoles() {
    const param = this.ctx.request.body;
    const rule = {
      loginName: 'string',
    };
    this.ctx.validate(rule);
    const res = await this.ctx.service.user.findRoles(param.loginName);
    if (!res) {
      this.exception('未查询到数据');
    }
    this.success(res, 'ok');
  }

  async logout() {
    this.ctx.logout();
    this.ctx.redirect('http://127.0.0.1:3002/login');
  }

  async Oauth() {
    const param = this.ctx.request.body;
    const res = await this.ctx.curl(`https://github.com/login/oauth/access_token?client_id=${param.client_id}&client_secret=${param.client_secret}&code=${param.code}`);
    this.ctx.body = res;
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findById(ctx.app.toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
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

module.exports = HomeController;

/* eslint-disable strict */
const Controller = require('./base');

class HomeController extends Controller {
  async index() {
    this.ctx.session = {
      token: this.ctx.app.encode('我是啥子', '123456'),
    };
    const param = this.ctx.request.body;
    const res = await this.ctx.service.user.findByUser(param.username, param.password);
    if (res && res.length > 0) {
      const data = {
        ACCESS_TOKEN: this.ctx.app.encode('我是啥子', '123456'),
        loginName: param.username,
      };
      this.success(data, '登录成功');
    } else {
      this.exception('账号或密码错误');
    }
  }

  async getRoles() {
    const param = this.ctx.request.body;
    const res = await this.ctx.service.user.findRoles(param.loginName);
    if (res) {
      this.success(res, 'ok');
    } else {
      this.exception('未查询到数据');
    }
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
    ctx.body = await ctx.model.User.findById(ctx.toInt(ctx.params.id));
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
    const id = ctx.toInt(ctx.params.id);
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
    const id = ctx.toInt(ctx.params.id);
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

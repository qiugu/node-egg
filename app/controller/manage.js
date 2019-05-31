/* eslint-disable strict */
const Controller = require('./base');

class HomeController extends Controller {
  //  首页登录
  async index() {
    const { ctx } = this;
    console.log(ctx.session);
    const param = ctx.request.body;
    const rule = {
      username: {
        type: 'string',
        trim: true,
      },
      password: {
        type: 'string',
        trim: true,
      },
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.exception(err.message);
      return;
    }
    const user = await ctx.service.user.findByUser(param.username, param.password);
    if (user.length <= 0) {
      this.exception('账号或密码错误');
      return;
    }
    const { uuid, roles, username, name } = user[0];
    const result = { uuid, roles, username, name };
    const token = ctx.setToken(result);
    this.success(Object.assign(result, { ACCESS_TOKEN: token }), '登录成功');
  }

  //  获取用户角色信息
  async getRoles() {
    const { ctx } = this;
    const param = ctx.request.body;
    const rule = {
      loginName: 'string',
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.exception(err.message);
      return;
    }
    const res = await ctx.service.user.findRoles(param.loginName);
    if (!res) {
      this.exception('未查询到数据');
    }
    this.success(res, 'ok');
  }

  //  用户注册
  async register() {
    const { ctx } = this;
    const param = this.ctx.request.body;
    const rule = {
      email: {
        type: 'email',
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
    };
    try {
      ctx.validate(rule);
    } catch (err) {
      ctx.logger.warn(err.errors);
      this.exception(err.message);
      return;
    }
    if (param.password !== param.password2) {
      this.exception('账号和密码不一致，请重新输入');
      return;
    }
    const user = await ctx.service.user.createUser(param);
    user && this.success(user, '注册成功');
  }
}

module.exports = HomeController;

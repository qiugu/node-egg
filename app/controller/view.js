/* eslint-disable strict */
const Controller = require('./base');

class UsersController extends Controller {
  //  博客商城首页
  async index() {
    const { ctx } = this;
    const list = await ctx.model.User.findAll();
    const data = { list };
    await ctx.render('index.html', data);
  }

  async assets() {
    const { ctx } = this;
    await ctx.render('/assets/bootstrap-4.0.0-beta.3-dist/css/bootstrap.min.css');
  }
}

module.exports = UsersController;

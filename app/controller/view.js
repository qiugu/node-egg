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
}

module.exports = UsersController;

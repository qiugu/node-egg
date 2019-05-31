/* eslint-disable strict */
const Controller = require('./base');

class UsersController extends Controller {
  //  博客商城首页
  async index() {
    const { ctx } = this;
    await ctx.render('index.html');
  }
}

module.exports = UsersController;

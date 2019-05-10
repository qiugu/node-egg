const Controller = require('./base');

class UsersController extends Controller {
    async index () {
        const { ctx } = this;
        const list = await ctx.model.User.findAll({limit: 10});
        const data = {list};
        await ctx.render('index.html',data);
    }
}

module.exports = UsersController;

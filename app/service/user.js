const Service = require('egg').Service;
const Op = require('sequelize').Op;

class UserService extends Service {
    async find(username, password) {
        const user = await this.app.mysql.select('users', {
            where: {
                name: username,
            }
        });
        console.log(user);
        return user;
    }

    async findRoles(loginName) {
        const role = await this.app.mysql.select('users', {
            where: { name: 'admin' },
            columns: ['roles'],
            limit: 1
        })
        let roles = role.map(item => item.roles)
        const main = await this.app.mysql.select('main_menus');
        for (let i = 0; i < main.length; i++) {
            const sub = await this.app.mysql.select('sub_menus', {
                where: { parent_id: main[i].id }
            });
            if (sub && sub.length > 0) {
                main[i].children = sub;
            }
        }
        return { menus: main, roles };
    }

    async findByUser(username,password) {
        const ctx = this.ctx;
        const res = await ctx.model.User.findAll({
            where: {
                [Op.and]: [{name: username},{password: password}],
            }
        });
        return res;
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
        const id = toInt(ctx.params.id);
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
        const id = toInt(ctx.params.id);
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

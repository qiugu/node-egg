const Service = require('egg').Service;

class UserService extends Service {
    async find (username,password) {
        const user = await this.app.mysql.select('users',{
            where: {
                name: username,
            }
        });
        console.log(user);
        return user;
    }

    async findRoles (loginName) {
        const role = await this.app.mysql.select('users',{
            where: {name: 'admin'},
            columns: ['roles'],
            limit: 1
        })
        let roles = role.map(item => item.roles)
        const main = await this.app.mysql.select('main_menus');
        for (let i = 0;i < main.length;i++) {
            const sub = await this.app.mysql.select('sub_menus',{
                where: {parent_id: main[i].id}
            });
            if (sub && sub.length > 0) {
                main[i].children = sub;
            }
        }
        return {menus: main,roles};
    }
}

module.exports = UserService;

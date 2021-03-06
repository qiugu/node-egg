'use strict'
const uuidv1 = require('uuid/v1')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 添加管理员
    // await queryInterface.bulkInsert('user', [{
    //   uuid: uuidv1(),
    //   telephone: '182XXXXXXXX',
    //   lastModifiedTime: new Date(),
    //   lastModifierName: 'system',
    //   lastModifierId: 'system',
    //   createdTime: new Date(),
    //   creatorName: 'system',
    //   creatorId: 'system',
    //   name: '管理员',
    //   enableStatus: 'enabled',
    //   roles: 'admin',
    //   userName: 'admin', // 账号：admin
    //   password: '21232f297a57a5a743894a0e4a801fc3', // 密码：admin
    //   version: 0,
    // }]);

    // 添加角色信息
    // await queryInterface.bulkInsert('roles_info', [{
    //   permissionId: uuidv1(),
    //   roles: 'admin',
    //   name: '管理员',
    //   title: '123eqweq1231edweqwe',
    //   permissionList: 'dashboard,html,css,js,charts,controls,personal',
    //   createdTime: new Date(),
    //   lastModifiedTime: new Date(),
    //   version: 0,
    // },
    // {
    //   permissionId: uuidv1(),
    //   roles: 'user',
    //   name: '普通用户',
    //   title: '121deqweq1231edweqwe',
    //   permissionList: 'dashboard,html,css,js,charts,personal',
    //   createdTime: new Date(),
    //   lastModifiedTime: new Date(),
    //   version: 0,
    // }]);

    // 添加消息信息测试
    await queryInterface.bulkInsert('message', [{
      id: uuidv1(),
      datetime: new Date(),
      mes_content: '初始化消息通知内容',
      mess_type: '2',
      createdTime: new Date(),
      lastModifiedTime: new Date(),
      version: 0,
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
}

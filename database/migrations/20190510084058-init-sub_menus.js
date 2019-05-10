'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 sub_menus 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('sub_menus', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: 20 },
      title: STRING(130),
      icon: STRING(130),
      key: STRING(130),
      parent_id: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });
  },
  // 在执行数据库降级时调用的函数，删除 sub_menus 表
  down: async queryInterface => {
    await queryInterface.dropTable('sub_menus');
  },
};

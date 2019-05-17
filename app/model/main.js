'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Main = app.model.define('main_menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(130),
    icon: STRING(130),
    key: STRING(130),
    parent_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Main;
};

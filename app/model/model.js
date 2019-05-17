'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Main = app.model.define('main_menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    roles: STRING(100),
  });

  const Sub = app.model.define('sub_menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    roles: STRING(100),
  });

  return { Main, Sub };
};

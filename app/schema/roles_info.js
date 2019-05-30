'use strict';

module.exports = app => {
  const { STRING, UUIDV1, DATE, BIGINT } = app.Sequelize;

  return {
    permissionId: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    roles: {
      type: STRING(76),
      allowNull: false,
    },
    name: {
      type: STRING(76),
      allowNull: false,
    },
    title: {
      type: STRING(76),
      allowNull: false,
    },
    permissionList: {
      type: STRING(100),
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};

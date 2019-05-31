'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, UUIDV1, ENUM } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    telephone: {
      type: STRING(11),
      allowNull: false,
    },
    email: {
      type: STRING(76),
      allowNull: true,
      unique: true,
    },
    lastModifiedTime: {
      type: DATE,
      allowNull: false,
    },
    lastModifierName: {
      type: STRING(76),
      allowNull: false,
    },
    lastModifierId: {
      type: STRING(38),
      allowNull: false,
    },
    createdTime: {
      type: DATE,
      allowNull: false,
    },
    creatorName: {
      type: STRING(76),
      allowNull: false,
    },
    creatorId: {
      type: STRING(38),
      allowNull: false,
    },
    name: {
      type: STRING(76),
      allowNull: false,
    },
    // enabled: '启用', disabled: '禁用'
    enableStatus: {
      type: ENUM('enabled', 'disabled'),
      allowNull: false,
    },
    roles: {
      type: ENUM('admin', 'user'),
      allowNull: false,
    },
    username: {
      type: STRING(38),
      allowNull: true,
      unique: true,
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    version: {
      type: BIGINT,
      defaultValue: 0,
    },
  };
};

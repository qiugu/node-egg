'use strict'

module.exports = app => {
  const { STRING, DATE, UUIDV1, ENUM, BIGINT } = app.Sequelize

  return {
    id: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV1,
    },
    username: {
      type: STRING(36),
      allowNull: true,
    },
    email: {
      type: STRING(36),
      allowNull: true,
    },
    datetime: {
      type: DATE,
      allowNull: false,
    },
    mes_content: {
      type: STRING(76),
      allowNull: false,
    },
    mess_type: {
      type: ENUM('0', '1', '2', '3'),
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
  }
}

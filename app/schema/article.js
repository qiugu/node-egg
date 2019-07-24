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
    doc_content: {
      type: STRING(20000),
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

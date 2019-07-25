'use strict'

module.exports = app => {
  const { STRING, DATE, UUIDV1, TEXT, BIGINT } = app.Sequelize

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
      allowNull: false,
    },
    title: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
    doc_content: {
      type: TEXT,
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

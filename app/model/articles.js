'use strict'
const db = require('../../database/db_config.js')
const uuidv1 = require('uuid/v1')

module.exports = app => {
  const articleSchema = require('../schema/article.js')(app)
  const Article = db.defineModel(app, 'article', articleSchema)

  /**
   * @param {string} { docContent, username }  markdown内容和提交用户名
   */
  Article.save = async ({ title, docContent, username }) => {
    return await Article.create({
      id: uuidv1(),
      title,
      username,
      doc_content: docContent,
      createdTime: new Date(),
      lastModifiedTime: new Date(),
      version: 0,
    })
  }

  Article.findByTitle = async title => {
    return await Article.findOne({
      where: { title },
    })
  }

  return Article
}

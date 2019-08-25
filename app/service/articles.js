'use strict'
const Service = require('egg').Service

class Articles extends Service {
  async saveService(param) {
    const { ctx } = this
    return await ctx.model.Articles.save({ ...param })
  }

  async getAllArticles() {
    const { ctx } = this
    return await ctx.model.Articles.getAll()
  }

  async getArticleById(id) {
    const { ctx } = this
    return await ctx.model.Articles.findById(id)
  }
}

module.exports = Articles

'use strict'
const Service = require('egg').Service

class Articles extends Service {
  async saveService(param) {
    const { ctx } = this
    return await ctx.model.Articles.save({ ...param })
  }
}

module.exports = Articles

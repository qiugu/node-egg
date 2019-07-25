'use strict'
const Service = require('egg').Service

class WebService extends Service {
  async leaveMessage(params) {
    const { ctx } = this
    return await ctx.model.Message.leaveMessage(params)
  }

  async getDocService({ title }) {
    const { ctx } = this
    return await ctx.model.Articles.findByTitle(title)
  }
}

module.exports = WebService

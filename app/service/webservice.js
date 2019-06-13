'use strict'
const Service = require('egg').Service
const Op = require('sequelize').Op

class WebService extends Service {
  async leaveMessage(params) {
    const { ctx } = this
    return await ctx.model.Message.leaveMessage(params)
  }
}

module.exports = WebService

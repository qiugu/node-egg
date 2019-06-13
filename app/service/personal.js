'use strict'
const Service = require('egg').Service
const Op = require('sequelize').Op

class PersonService extends Service {
  async getMessage() {
    const { ctx } = this
    return await ctx.model.Message.getMessageList()
  }
}

module.exports = PersonService

'use strict'
const Controller = require('../base')

class Document extends Controller {
  async saveDoc() {
    const { ctx } = this
    const param = ctx.request.body
    const rule = {
      docContent: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      token: {
        type: 'string',
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const res = await ctx.service.articles.saveService(param)
    if (!res) {
      this.exception('保存失败')
      return
    }
    this.success({}, '保存成功')
  }
}

module.exports = Document

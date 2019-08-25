'use strict'
const Controller = require('../base')

class Document extends Controller {
  async saveDoc() {
    const { ctx } = this
    const param = ctx.request.body
    const rule = {
      title: {
        type: 'string',
        max: 50,
      },
      docContent: {
        type: 'string',
        max: 20000,
      },
      username: {
        type: 'string',
        max: 36,
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
    const isExist = await ctx.service.webservice.getDocService({ title: param.title })
    if (isExist) {
      this.exception('文章标题已经存在')
      return
    }
    const res = await ctx.service.articles.saveService(param)
    if (!res) {
      this.exception('保存失败')
      return
    }
    this.success({}, '保存成功')
  }

  async getAllArticles() {
    const { ctx } = this
    const rule = {
      token: {
        type: 'string',
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const res = await ctx.service.articles.getAllArticles()
    if (!res) {
      this.exception('获取失败')
      return
    }
    res.map(item => {
      item.createdTime = item.createdTime.getTime()
      item.lastModifiedTime = item.createdTime.getTime()
    })
    this.success(res, 'ok')
  }

  async getArticleById() {
    const { ctx } = this
    const rule = {
      token: {
        type: 'string',
      },
      id: {
        type: 'string'
      }
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }
    const param = ctx.request.body
    const res = await ctx.service.articles.getArticleById(param.id)
    if (!res) {
      this.exception('获取失败')
      return
    }
    this.success(res, 'ok')
  }
}

module.exports = Document

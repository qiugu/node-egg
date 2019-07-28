/* eslint-disable strict */
const Controller = require('../base')
const showdown = require('showdown')

class UsersController extends Controller {
  //  博客商城首页
  async index() {
    const { ctx } = this
    const themeColor = [
      'bridge-theme',
      'dark-blue-theme',
      'dark-red-theme',
      'default-theme',
      'green-theme',
      'lite-blue-theme',
      'orange-theme',
      'pink-theme',
      'purple-theme',
      'red-theme'
    ]
    const locale = {
      basePath: ctx.app.config.basePath,
      themeColor: themeColor[Math.floor(Math.random() * 10)]
    }
    await ctx.render('index.html', locale)
  }

  async home() {
    const { ctx } = this
    let title = ctx.request.query.title
    if (!title) {
      title = '前端知识体系'
    }
    const res = await ctx.service.webservice.getDocService({ title })
    if (!res) {
      await ctx.render('home.html', {})
      return
    }
    const covert = new showdown.Converter()
    covert.setFlavor('github')
    covert.setOption('ghCompatibleHeaderId', true)
    covert.setOption('backslashEscapesHTMLTags', true)
    //  过滤script标签
    const reg = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    const htmlcontent = res.doc_content.replace(reg, '')
    const html = covert.makeHtml(htmlcontent)
    await ctx.render('home.html', { html })
  }

  //  留言信息
  async leaveMessage() {
    const { ctx } = this
    const param = ctx.request.body
    const rule = {
      username: {
        type: 'string',
        trim: true,
      },
      email: {
        type: 'email',
      },
      message: {
        type: 'string',
        max: 2000,
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }

    const res = await ctx.service.webservice.leaveMessage(param)
    if (!res) {
      this.exception('留言失败，请重试')
      return
    }
    this.success(res, 'ok')
  }

  //  获取文章内容
  async getDocContent() {
    const { ctx } = this
    const params = Object.keys(ctx.request.body).length !== 0 ? ctx.request.body : { title: '浏览器概览' }
    const rule = {
      title: {
        type: 'string',
        max: 50,
      },
    }
    const err = this.validateParams(rule)
    if (err && err.code) {
      this.exception(null, err.message)
      return
    }

    const res = await ctx.service.webservice.getDocService(params)
    if (!res) {
      this.exception('获取文章失败')
      return
    }
    this.success(res, 'ok')
  }
}

module.exports = UsersController

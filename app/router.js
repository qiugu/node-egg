'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const { backend, webview } = controller
  /**
   * 后台管理系统接口
   */
  router.post(`${app.config.basePath}/user/login`, backend.manage.index)
  router.post(`${app.config.basePath}/user/getinfo`, backend.manage.getRoles)
  router.post(`${app.config.basePath}/user/register`, backend.manage.register)
  //  注册验证码
  router.get(`${app.config.basePath}/user/verify`, backend.manage.verify)
  //  获取用户消息通知
  router.post(`${app.config.basePath}/personal/message`, backend.manage.getMessage)
  //  第三方github登录
  router.post(`${app.config.basePath}/user/githubAuth`, backend.manage.githubAuth)
  //  保存文章内容
  router.post(`${app.config.basePath}/articles/saveContent`, backend.document.saveDoc)
  //  获取所有的文章
  router.post(`${app.config.basePath}/articles/getList`, backend.document.getAllArticles)
  //  根据id获取文章内容
  router.post(`${app.config.basePath}/articles/getArticleById`, backend.document.getArticleById)

  /**
   * 前台页面接口
   */
  router.get('/', webview.view.index)
  router.get('/home', webview.view.home)
  router.post('/web/leaveMessage', webview.view.leaveMessage)
  router.post('/web/getDoc', webview.view.getDocContent)
}

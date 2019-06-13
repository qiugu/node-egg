'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const { backend, webview } = controller
  //  管理系统请求
  router.post(`${app.config.basePath}/user/login`, backend.manage.index)
  router.post(`${app.config.basePath}/user/getinfo`, backend.manage.getRoles)
  router.post(`${app.config.basePath}/user/register`, backend.manage.register)
  //  注册验证码
  router.get(`${app.config.basePath}/user/verify`, backend.manage.verify)
  //  获取用户消息通知
  router.post(`${app.config.basePath}/personal/message`, backend.manage.getMessage)

  //  页面请求接口
  router.get('/', webview.view.index)
  router.post('/web/leaveMessage', webview.view.leaveMessage)

  //  第三方登录接口
  // app.passport.mount('github');
  // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {
  //   successRedirect: app.config.passportGithubSuccessRedirect, // 配置鉴权成功后的跳转地址
  // });
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);
}

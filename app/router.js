'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //  管理系统请求
  router.post(`${app.config.basePath}/user/login`, controller.manage.index);
  router.post(`${app.config.basePath}/user/getinfo`, controller.manage.getRoles);
  router.post(`${app.config.basePath}/user/register`, controller.manage.register);
  //  注册验证码
  router.get(`${app.config.basePath}/user/verify`,controller.manage.verify);

  //  页面请求接口
  router.get('/', controller.view.index);

  //  第三方登录接口
  // app.passport.mount('github');
  // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {
  //   successRedirect: app.config.passportGithubSuccessRedirect, // 配置鉴权成功后的跳转地址
  // });
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);
};

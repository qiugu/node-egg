'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/qgtest/user/login', controller.manage.index);
  router.post('/qgtest/user/getInfo', controller.manage.getRoles);
  router.get('/logout', controller.manage.logout);
  router.get('/', controller.view.index);
  // app.passport.mount('github');
  // 上面的 mount 是语法糖，等价于
  const github = app.passport.authenticate('github', {
    successRedirect: app.config.passportGithubSuccessRedirect, // 配置鉴权成功后的跳转地址
  });
  router.get('/passport/github', github);
  router.get('/passport/github/callback', github);
};

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/qgtest/user/login', controller.home.index);
  router.post('/qgtest/user/getInfo', controller.home.getRoles);
  router.get('/logout', controller.home.logout);
  router.get('/', controller.users.index);
  // app.passport.mount('github');
  // 上面的 mount 是语法糖，等价于
  const github = app.passport.authenticate('github', {
    successRedirect: app.config.passportGithubSuccessRedirect, // 配置鉴权成功后的跳转地址
  });
  router.get('/passport/github', github);
  router.get('/passport/github/callback', github);
};

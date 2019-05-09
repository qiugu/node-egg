'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/qgdev/user/login', controller.home.index);
  router.post('/qgdev/user/getInfo', controller.home.getRoles);
  app.passport.mount('github');
    // 上面的 mount 是语法糖，等价于
  // const github = app.passport.authenticate('github', {});
  // router.get('/passport/github', github);
  // router.get('/passport/github/callback', github);
  app.router.get('/logout', controller.home.logout);
  // router.post('/passport/github/callback', controller.home.Oauth);
};

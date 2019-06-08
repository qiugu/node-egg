'use strict';

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    //  过滤图片验证码
    if (ctx.path.indexOf(ctx.app.config.basePath) === 0 && 
      (ctx.path !== ctx.app.config.basePath + '/user/verify')
      && ctx.path.indexOf('/user') === -1) {
      //  表示api接口
      const valid = ctx.verifyToken();
      if (valid) {
        await next();
      }
    } else {
      //  表示是模板路径
      await next();
    }
  };
};

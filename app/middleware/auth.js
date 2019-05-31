'use strict';

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    if (ctx.path.indexOf(ctx.app.config.basePath) === 0) {
      //  表示api接口
      const valid = ctx.verifyToken();
      if (valid) {
        await next();
      }
    } else {
      //  表示是模板路径
    }
  };
};

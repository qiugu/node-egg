/* eslint-disable no-trailing-spaces */
/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557211352002_1566';

  config.basePath = '/qgdev';

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.site_static_host = process.env.EGG_SITE_STATIC_HOST || ''; // 静态文件存储域名
  // static files and cache files
  // config.static = {
  //   // 静态化访问前缀,如：`http://127.0.0.1:8080/assets/images/logo.png`
  //   prefix: '/assets', 
  //   dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
  //   dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
  //   preload: false,
  //   maxAge: 31536000, // in prod env, 0 in other envs
  //   buffer: true, // in prod env, false in other envs
  // };

  config.onerror = {
    errPageUrl: '../src/public/404.html',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'egg_qg_dev',
  };

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // 开发环境下关闭csrf
  config.security = {
    csrf: {
      ignore: ctx => {
        if (ctx.request.url.match(/\/qgdev\/user\/*/)) {
          return true;
        }
        return false;
      },
    },
    domainWhiteList: [ 'http://localhost:3002', 'http://127.0.0.1:8080' ],
  };

  config.passportGithub = {
    key: '46b85aea388080d94dd8',
    secret: '793f96044a8003cbb9a879b897ba0f190804d0c9',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  config.jwt = {
    secret: '123456',
  };

  config.passportGithubSuccessRedirect = 'http://localhost:3002/login';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

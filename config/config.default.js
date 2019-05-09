/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557211352002_1566';
  
  config.jsonp = {
    csrf: true
  };

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
  }

  config.notfound = {
    pageUrl: '../src/public/404.html'
  }

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'egg-sequelize-doc-default'
    }
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg-sequelize-doc-default'
  }

  // add your middleware config here
  config.middleware = [];

  //开发环境下关闭csrf
  config.security = {
    csrf: {
      enable: true
    },
    domainWhiteList: ['http://localhost:3002']
  }

  config.passportGithub = {
    key: '46b85aea388080d94dd8',
    secret: '793f96044a8003cbb9a879b897ba0f190804d0c9',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};

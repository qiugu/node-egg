/* eslint-disable no-trailing-spaces */
/* eslint valid-jsdoc: "off" */

'use strict'
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557211352002_1566'

  config.sessionRedis = {
    key: 'SESSID',
    maxAge: 12 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  }

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    mapping: {
      '.html': 'nunjucks',
    },
  }

  config.onerror = {
    errPageUrl: '../src/public/404.html',
  }

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'egg_qg_dev',
  }

  exports.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0',
    },
    agent: true,
  }

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ]

  // 开发环境下关闭csrf
  config.security = {
    csrf: {
      ignore: ctx => {
        if (ctx.request.url.match(/\/qgdev\/*/)) {
          return true
        }
        return false
      },
    },
    domainWhiteList: [ 'http://localhost:3002', 'http://127.0.0.1:8080' ],
  }

  config.cors = {
    origin: 'http://localhost:3002',
    credentials: true,
  }

  config.passportGithub = {
    key: '46b85aea388080d94dd8',
    secret: '793f96044a8003cbb9a879b897ba0f190804d0c9',
  }

  config.jwt = {
    secret: '123456',
  }

  config.passportGithubSuccessRedirect = 'http://localhost:3002/login'

  // add your user config here
  const userConfig = {
    basePath: '/qgdev',
  }

  return {
    ...config,
    ...userConfig,
  }
}

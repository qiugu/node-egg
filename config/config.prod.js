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
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557211352002_1566'

  config.basePath = '/qgms'

  config.sessionRedis = {
    key: 'SESSID',
    maxAge: 12 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  }

  exports.redis = {
    client: {
      host: '47.110.48.159',
      port: '6379',
      password: '',
      db: '0',
    },
    agent: true,
  }

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another'),
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
    username: 'qiugu',
    password: 'byj123456',
    database: 'egg_qgms_prod',
  }

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ]

  // 开发环境下关闭csrf
  config.security = {
    csrf: {
      ignore: ctx => {
        if (ctx.request.url.match(/\/qgms\/user\/*/)) {
          return true
        }
        return false
      },
    },
    domainWhiteList: [ 'http://47.110.48.159', 'http://47.110.48.159:7001' ],
  }

  config.jwt = {
    secret: 'byj18297900274',
  }

  config.cluster = {
    listen: {
      port: 80,
      hostname: '0.0.0.0',
      // path: '/var/run/egg.sock',
    },
  }

  config.passportGithub = {
    key: '46b85aea388080d94dd8',
    secret: '793f96044a8003cbb9a879b897ba0f190804d0c9',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  }

  config.passportGithubSuccessRedirect = 'http://localhost:3002/login'

  //  监控
  config.alinode = {
    appid: '80020',
    secret: 'ddee0dd646ed1227fdadcd097948bb294f11c9e0',
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}

'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // passport: {
  //   enable: true,
  //   package: 'egg-passport',
  // },
  // passportGithub: {
  //   enable: true,
  //   package: 'egg-passport-github',
  // },
  // passportLocal: {
  //   enable: false,
  //   package: 'passport-local',
  // },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode',
    env: 'production',
  },
}

'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  session: {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: false,
    encrypt: true,
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  }
};

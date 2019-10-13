'use strict';

const _ = require('lodash');
const crypto = require('crypto');

const Controller = require('egg').Controller;

module.exports = class UserController extends Controller {
  async login() {
    const { ctx } = this;

    const { username: userName, password: userPass } = ctx.request.body;

    if (ctx.session.userId) {
      ctx.body = {
        code: 201,
        success: true,
        message: '用户已经登录',
        data: await ctx.model.User.findOne({
          where: {
            userName,
            userPass: crypto.createHash('md5').update(userPass).digest('hex'),
          }
        })
      };
      return;
    }

    const userInfo = await ctx.model.User.findOne({
      where: {
        userName,
        userPass: crypto.createHash('md5').update(userPass).digest('hex'),
      },
    });

    if (userInfo === null) {
      ctx.body = {
        code: 201,
        success: false,
        message: '用户名或密码错误',
      };
    } else {
      ctx.cookies.set('userId', userInfo.get('userId'));
      ctx.session.userId = userInfo.get('userId');

      ctx.body = {
        code: 201,
        success: true,
        data: _.pick(userInfo, [ 'userId' ]),
      };
    }
  }

  async logout() {
    const { ctx } = this;

    const examInfo = Object.assign({}, ctx.request.body, {
      userId: 1,
    });

    ctx.model.Exam.create(examInfo);

    ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
  }
};

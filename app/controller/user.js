'use strict';

const _ = require('lodash');
const crypto = require('crypto');

const Controller = require('egg').Controller;

module.exports = class UserController extends Controller {
  async login() {
    const { ctx } = this;

    const { session, request } = ctx;

    const { userName, userPass } = request.body;

    let userId = session.userId;

    if (ctx.get('referer').includes('portal')) {
      userId = session.stuId;
    }

    if (userId) {
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
      // ctx.cookies.set('userId', userInfo.dataValues.userId);
      // ctx.cookies.set('userName', userInfo.dataValues.userName);

      if (ctx.get('referer').includes('portal')) {
        ctx.session.stuId = userInfo.dataValues.userId;
      } else {
        ctx.session.userId = userInfo.dataValues.userId;
      }

      ctx.body = {
        code: 200,
        success: true,
        data: _.pick(userInfo, [ 'userId', 'userName']),
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

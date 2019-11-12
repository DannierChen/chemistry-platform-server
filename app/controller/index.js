'use strict';

const CONSTANS = require('../constants');

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async canvas() {
    const { ctx } = this;

    await ctx.render('canvas', {
      user: ctx.session.userInfo
    });
  }

  async portal() {
    const { ctx } = this;

    if (!ctx.session.stuId && !ctx.req.url.includes('login=true')) {
      await ctx.unsafeRedirect('/portal?login=true#/user/login');
    }

    await ctx.render('portal', {
      user: {
        userName: ctx.session.stuName
      }
    });
  }

  async admin() {
    const { ctx } = this;

    console.log(ctx.session.userId);

    if (!ctx.session.userId && !ctx.req.url.includes('login=true')) {
      await ctx.unsafeRedirect('/admin?login=true#/user/login');
    }

    await ctx.render('admin', {
      user: {
        userName: ctx.session.userName
      }
    });
  }

  async getTermList() {
    this.ctx.body = {
      success: true,
      data: CONSTANS.TERM_LIST
    }
  }
}

module.exports = IndexController;

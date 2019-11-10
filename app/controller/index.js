'use strict';

const CONSTANS = require('../constants');

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async portal() {
    const { ctx } = this;

    console.log(ctx.session.stuId);

    if (!ctx.session.stuId && !ctx.req.url.includes('login=true')) {
      await ctx.unsafeRedirect('/portal?login=true#/user/login');
    }

    await ctx.render('portal', {
      user: ctx.session.userInfo
    });
  }

  async canvas() {
    const { ctx } = this;

    await ctx.render('canvas', {
      user: ctx.session.userInfo
    });
  }

  async admin() {
    const { ctx } = this;

    // if (!ctx.session.userId) {
    //   ctx.redirect(`/admin#/user/login`);
    // }

    await ctx.render('admin', {
      userId: ctx.cookies.get('userId'),
      userName: ctx.cookies.get('userName')
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

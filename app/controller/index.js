'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async portal() {
    const { ctx } = this;

    await ctx.render('portal')
  }

  async admin() {
    const { ctx } = this;

    await ctx.render('admin')
  }
}

module.exports = IndexController;

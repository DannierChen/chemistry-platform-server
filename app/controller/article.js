'use strict';

const Util = require('../util');
const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getExamList() {
    const { ctx } = this;

    ctx.body = await ctx.model.Exam.findAll();
  }

  async create() {
    const { ctx } = this;

    const userId = ctx.session.userId;

    const articleInfo = Object.assign({}, ctx.request.body, {
      user_id: userId,
    });

    articleInfo.term_id = Number(articleInfo.term_id);
    articleInfo.chapter_id = Number(articleInfo.chapter_id);

    const ret = await ctx.model.Article.create(articleInfo);

    if (ret) {
      ctx.body = {
        success: true,
        message: "创建成功"
      };
    } else {
      ctx.body = {
        success: false,
        message: "创建失败"
      };
    }
  }

  async update() {
    const { ctx } = this;

    const userId = ctx.session.userId;

    const articleInfo = Object.assign({}, ctx.request.body, {
      user_id: userId,
    });

    articleInfo.term_id = Number(articleInfo.term_id);
    articleInfo.chapter_id = Number(articleInfo.chapter_id);

    const ret = await ctx.model.Article.create(articleInfo);

    if (ret) {
      ctx.body = {
        success: true,
        message: "创建成功"
      };
    } else {
      ctx.body = {
        success: false,
        message: "创建失败"
      };
    }
  }

  async list() {
    const { ctx } = this;

    const userId = ctx.session.userId;

    const articleList = await ctx.model.Article.findAll({
      where: {
        user_id: userId
      },
      raw: true,
      include: [{
        model: ctx.model.User,
        attributes: ['user_name']
      }]
    });

    if (articleList && articleList.length > 0) {
      for (let article of articleList) {
        const termInfo = Util.getTermInfo(article.term_id, article.chapter_id);
        article.termName = termInfo.termName;
        article.chapterName = termInfo.chapterName;
        article.userName = article[`user.username`];
      }

      ctx.body = {
        success: true,
        data: articleList
      };
    } else {
      ctx.body = {
        success: false,
        message: "数据获取失败"
      };
    }
  }

  async getArticleData() {
    const { ctx } = this;

    const articleId = ctx.query.articleId;

    console.log(ctx.query);


    if (articleId) {
      const articleData = await ctx.model.Article.findOne({
        where: {
          article_id: articleId
        }
      });

      ctx.body = {
        success: true,
        data: articleData
      };
    } else {
      ctx.body = {
        success: false,
        message: "数据获取失败"
      };
    }
  }
}

module.exports = ArticleController;

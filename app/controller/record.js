'use strict';

const lodash = require('lodash');
const Controller = require('egg').Controller;

class RecordController extends Controller {
  async getRecord() {
    const { ctx } = this;
    const { query, session } = ctx;

    const userId = session.stuId;

    console.log()

    const recordData = await ctx.model.ScoreRecord.findOne({
      where: {
        user_id: userId || 2,
        origin: query.origin,
        origin_id: query.origin_id
      }
    });

    if (recordData != null) {
      ctx.body = {
        success: true,
        data: recordData
      };
    } else {
      ctx.body = {
        success: false,
        message: "数据获取失败"
      };
    }
  }

  async saveRecord() {
    const { ctx } = this;
    const { request, session } = ctx;

    const userId = session.stuId;
    let recordInfo = request.body;

    const scoreRecordData = await ctx.model.ScoreRecord.findOne({
      where: {
        user_id: userId || 2,
        origin: recordInfo.origin,
        origin_id: recordInfo.origin_id
      }
    });

    if (scoreRecordData != null) {
      console.log(Object.assign({}, scoreRecordData.dataValues, recordInfo));

      const ret = await ctx.model.ScoreRecord.update(Object.assign({}, scoreRecordData.dataValues, recordInfo), {
        where: {
          score_record_id: scoreRecordData['score_record_id']
        }
      });

      if (ret != null) {
        ctx.body = {
          success: true
        }
      }
    } else {
      const ret = ctx.model.ScoreRecord.create(Object.assign({}, recordInfo, {
        user_id: userId || 2
      }));

      if (ret != null) {
        ctx.body = {
          success: true
        }
      }
    }
  }

  async getArticleRecordList() {
    const { ctx } = this;

    const userId = ctx.session.userId;

    const userInfo = await ctx.model.User.findOne({
      where: {
        userId
      }
    });

    const sUserId = userInfo.sUserId;

    const recordList = await ctx.model.ScoreRecord.findAll({
      raw: true,
      where: {
        user_id: sUserId,
        origin: "article"
      }
    });

    for (let i = 0; i < recordList.length; i++) {
      const record = recordList[i];

      const articleInfo = await ctx.model.Article.findOne({
        raw: true,
        where: {
          articleId: record.origin_id
        }
      });

      record.articleTitle = articleInfo.article_title;

      if (record.exam_id) {
        const examInfo = await ctx.model.Exam.findOne({
          raw: true,
          where: {
            examId: record.exam_id
          }
        });

        record.examName = examInfo.exam_name;
      }

      record.articleTitle = articleInfo.article_title;
    }

    ctx.body = {
      success: true,
      data: recordList
    };
  }
}

module.exports = RecordController;

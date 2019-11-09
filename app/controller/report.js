'use strict';

const lodash = require('lodash');
const Controller = require('egg').Controller;

class ReportController extends Controller {
  async getReport() {
    const { ctx } = this;
    const { query, session } = ctx;

    const userId = session.stuId;

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

  async saveReport() {
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
}

module.exports = ReportController;

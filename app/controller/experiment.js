'use strict';

const lodash = require('lodash');
const Controller = require('egg').Controller;

class ExperimentController extends Controller {
  async list() {
    const { ctx } = this;

    const userId = ctx.session.userId;

    const examList = await ctx.model.Experiment.findAll({
      where: {
        user_id: userId
      },
      include: [{
        model: ctx.model.User,
        attributes: ['user_name']
      }]
    });

    ctx.body = {
      success: true,
      data: examList
    }
  }

  async create() {
    const { ctx } = this;

    const { session, model: {
      Experiment
    }, request } = ctx;

    const userId = session.userId;
    let experimentInfo = request.body;

    experimentInfo.user_id = userId;

    if (!userId) {
      body = {

      }
    } else {
      const res = await ctx.model.Experiment.create(experimentInfo);

      if (res !== null) {
        ctx.body = {
          success: true,
          code: 200,
          data: {
            examId: examId
          },
          message: '试卷创建成功'
        };
      } else {
        ctx.body = {
          success: false,
          code: 201,
          message: '试卷创建失败'
        };
      }
    }
  }

  async getExperimentData() {
    const { ctx } = this;

    const experimentId = ctx.query.experimentId;

    if (experimentId) {
      const experimentData = await ctx.model.Experiment.findOne({
        where: {
          experiment_id: experimentId
        },
        include: [{
          model: ctx.model.User
        }]
      });

      ctx.body = {
        success: true,
        data: experimentData
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
}

module.exports = ExperimentController;

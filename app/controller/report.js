'use strict';

const lodash = require('lodash');
const Controller = require('egg').Controller;

class ReportController extends Controller {
  async getReport() {
    const { ctx } = this;
    const { query, session } = ctx;

    const userId = session.stuId;

    const reportData = await ctx.model.Report.findOne({
      where: {
        user_id: userId || -1,
        experiment_id: query.experiment_id
      }
    });

    if (reportData != null) {
      ctx.body = {
        success: true,
        data: reportData
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
    let reportInfo = request.body;

    if (!userId) {
      ctx.body = {
        success: false,
        message: '请登录'
      };

      return;
    }

    const reportData = await ctx.model.Report.findOne({
      where: {
        user_id: userId,
        experiment_id: reportInfo.experiment_id
      }
    });

    if (reportData != null) {
      const ret = await ctx.model.Report.update(Object.assign({}, reportData.dataValues, reportInfo), {
        where: {
          report_id: reportData['reportId']
        }
      });

      if (ret != null) {
        ctx.body = {
          success: true
        }
      }
    } else {
      const ret = await ctx.model.Report.create(Object.assign({}, reportInfo, {
        user_id: userId
      }));

      if (ret != null) {
        ctx.body = {
          success: true
        }
      }
    }
  }

  async list() {
    const { ctx } = this;

    const experimentId = ctx.query.experimentId;

    const reportList = await ctx.model.Report.findAll({
      where: {
        experiment_id: experimentId
      },
      include: [
        {
          model: ctx.model.User,
          attributes: ['user_name']
        },
        {
          model: ctx.model.Experiment,
          attributes: ['experiment_title']
        }
      ]
    });

    ctx.body = {
      success: true,
      data: reportList
    }
  }
}

module.exports = ReportController;

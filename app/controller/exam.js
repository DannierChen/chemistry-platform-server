'use strict';

const lodash = require('lodash');
const Controller = require('egg').Controller;

class ExamController extends Controller {
  async getExamList() {
    const { ctx } = this;

    const userId = ctx.session.userId;

    const examList = await ctx.model.Exam.findAll({
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

    const { body, session, model: {
      Exam,
      Ques
    }, request } = ctx;

    const userId = session.userId;
    let examInfo = request.body;

    if (!userId) {
      body = {

      }
    } else {
      const quesList = examInfo.quesList;

      examInfo = Object.assign({}, lodash.pick(examInfo, ['ques_count', 'exam_name']), {
        user_id: userId,
      });

      const quesPromises = [];
      const ret = await Exam.create(examInfo);

      const examId = ret.dataValues.examId;

      if (examId) {
        for (let ques of quesList) {
          ques.exam_id = examId;
          ques.options = JSON.stringify(ques.options);

          if (typeof ques.answer === 'boolean') {
            ques.answer = String(ques.answer);
          }

          if (typeof ques.answer === 'object') {
            ques.answer = JSON.stringify(ques.answer);
          }

          quesPromises.push(Ques.create(ques));
        }
      }

      const ret1 = await Promise.all(quesPromises);

      if (ret1 && ret1.length) {
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

  async getExamData() {
    const { ctx } = this;

    const examId = ctx.query.examId;

    if (examId) {
      const examData = await ctx.model.Exam.findOne({
        where: {
          exam_id: examId
        },
        include: [{
          model: ctx.model.Ques
        }]
      });

      ctx.body = {
        success: true,
        data: examData
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

module.exports = ExamController;

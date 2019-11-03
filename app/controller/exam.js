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

    // ctx.model.

    // ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
  }
}

module.exports = ExamController;

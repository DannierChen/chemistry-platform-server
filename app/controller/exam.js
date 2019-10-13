'use strict';

const Controller = require('egg').Controller;

class ExamController extends Controller {
  async getExamList() {
    const { ctx } = this;

    ctx.body = await ctx.model.Exam.findAll();
  }

  async createExam() {
    const { ctx } = this;

    const examInfo = Object.assign({}, ctx.request.body, {
      userId: 1,
    });

    console.log(examInfo);

    ctx.model.Exam.create(examInfo);

    ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
  }
}

module.exports = ExamController;

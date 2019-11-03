'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Exam = app.model.define('ques',
    {
      quesId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      exam_id: INTEGER,
      options: STRING,
      answer: STRING,
      title: STRING,
      type: STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Exam;
};

'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Exam = app.model.define('exam',
    {
      examId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: INTEGER(3),
      examName: STRING(255),
      quesCount: INTEGER(1),
    },
    {
      underscoredAll: true,
      freezeTableName: true,
    }
  );

  return Exam;
};

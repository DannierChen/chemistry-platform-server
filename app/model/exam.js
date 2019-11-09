'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Exam = app.model.define('exam',
    {
      examId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      exam_name: STRING,
      ques_count: INTEGER,
    },
    {
      freezeTableName: true,
    }
  );

  Exam.associate = function() {
    app.model.Exam.belongsTo(app.model.User, { foreignKey: 'user_id' });
    app.model.Exam.hasMany(app.model.Ques, { foreignKey: 'exam_id' });
  };

  return Exam;
};

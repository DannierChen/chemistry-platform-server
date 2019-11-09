'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Ques = app.model.define('ques',
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

  Ques.associate = function() {
    app.model.Ques.belongsTo(app.model.Exam, { foreignKey: 'exam_id' });
  };

  return Ques;
};

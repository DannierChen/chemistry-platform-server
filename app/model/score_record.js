'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const ScoreRecord = app.model.define('score_record',
    {
      score_record_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      exam_id: STRING,
      score: INTEGER,
      origin: STRING,
      origin_id: INTEGER,
      thoughts: STRING
    },
    {
      freezeTableName: true,
    }
  );

  return ScoreRecord;
};

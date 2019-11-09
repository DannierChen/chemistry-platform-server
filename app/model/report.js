'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Report = app.model.define('report',
    {
      reportId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      report_capture_url: STRING,
      report_content: STRING,
      report_video_url: STRING
    },
    {
      freezeTableName: true,
    }
  );

  Report.associate = function() {
    app.model.Report.belongsTo(app.model.User, { foreignKey: 'user_id' });
  };

  return Report;
};

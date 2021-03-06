'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Report = app.model.define('report',
    {
      reportId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER,
      experiment_id: INTEGER,
      report_capture: STRING,
      report_content: STRING,
      report_video: STRING
    },
    {
      freezeTableName: true,
    }
  );

  Report.associate = function() {
    app.model.Report.belongsTo(app.model.User, { foreignKey: 'user_id' });
    app.model.Report.belongsTo(app.model.Experiment, { foreignKey: 'experiment_id' });
  };

  return Report;
};

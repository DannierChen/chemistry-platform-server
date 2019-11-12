'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Experiment = app.model.define('experiment',
    {
      experimentId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: STRING(50),
      exam_id: STRING(255),
      experiment_title: STRING(255),
      experiment_content: STRING(255)
    },
    {
      freezeTableName: true,
    }
  );

  Experiment.associate = () => {
    app.model.Experiment.belongsTo(app.model.User, { foreignKey: 'user_id' });
    app.model.Experiment.hasMany(app.model.Report, { foreignKey: 'experiment_id' });
  }

  return Experiment;
};


'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user',
    {
      userId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userName: STRING(50),
      userPass: STRING(255),
      userType: INTEGER,
      sUserId: INTEGER,
      fUserId: INTEGER
    },
    {
      underscoredAll: true,
      freezeTableName: true,
    }
  );

  User.associate = () => {
    app.model.User.hasMany(app.model.Exam, { foreignKey: 'user_id' });
    app.model.User.hasMany(app.model.Experiment, { foreignKey: 'user_id' });
    app.model.User.hasMany(app.model.Report, { foreignKey: 'user_id' });
  }

  return User;
};


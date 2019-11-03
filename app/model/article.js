'use strict';

module.exports = app => {
  const { TEXT, STRING, INTEGER } = app.Sequelize;

  const Article = app.model.define('article',
    {
      articleId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: INTEGER(3),
      exam_id: INTEGER(3),
      article_title: STRING(255),
      article_content: TEXT,
      term_id: INTEGER(1),
      chapter_id: INTEGER(1)
    },
    {
      freezeTableName: true,
    }
  );

  Article.associate = function() {
    app.model.Article.belongsTo(app.model.User, { foreignKey: 'user_id' });
  };

  return Article;
};

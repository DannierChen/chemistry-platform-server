'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/portal', controller.index.portal);
  router.get('/admin', controller.index.admin);
  router.get('/getTermList', controller.index.getTermList);

  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);

  router.get('/exam/list', controller.exam.getExamList);
  router.post('/exam/create', controller.exam.create);

  router.post('/article/create', controller.article.create);
  router.get('/article/list', controller.article.list);
};

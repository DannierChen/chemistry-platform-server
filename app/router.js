'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/portal', controller.index.portal);
  router.get('/admin', controller.index.admin);

  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);

  router.get('/exam/examList', controller.exam.getExamList);
  router.post('/exam/createExam', controller.exam.createExam);
};

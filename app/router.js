'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/portal', controller.index.portal);
  router.get('/admin', controller.index.admin);
  router.get('/canvas', controller.index.canvas);

  router.get('/getTermList', controller.index.getTermList);

  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);

  router.get('/exam/list', controller.exam.getExamList);
  router.post('/exam/create', controller.exam.create);
  router.get('/exam/getExamData', controller.exam.getExamData);

  router.post('/article/create', controller.article.create);
  router.post('/article/update', controller.article.update);
  router.get('/article/getArticleData', controller.article.getArticleData);
  router.get('/article/list', controller.article.list);

  router.get('/record/getRecord', controller.record.getRecord);
  router.post('/record/saveRecord', controller.record.saveRecord);
  router.get('/record/getArticleRecordList', controller.record.getArticleRecordList);

  router.get('/experiment/list', controller.experiment.list);
  router.post('/experiment/create', controller.experiment.create);
  router.get('/experiment/getExperimentData', controller.experiment.getExperimentData);

  router.post('/report/saveReport', controller.report.saveReport);
  router.get('/report/getReport', controller.report.getReport);
  router.get('/report/list', controller.report.list);
  router.get('/report/getExperimentList', controller.report.getExperimentList);

  router.post('/upload/upload', controller.upload.upload);
};

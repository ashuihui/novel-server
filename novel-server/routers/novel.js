
const router = require('koa-router')();
const controller = require('../controllers/novel');

const routers = router
    .get('*', controller.getOneNovel);

module.exports = routers;
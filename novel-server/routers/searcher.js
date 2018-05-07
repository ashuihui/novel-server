
const router = require('koa-router')();
const controller = require('../controllers/searcher');

const routers = router
    .get('*', controller.searcherNovel);

module.exports = routers;

const router = require('koa-router')();
const controller = require('../controllers/rank');

const routers = router
    .get('/total', controller.getTotalRank)
    .get('/new', controller.getNewRank)

module.exports = routers;
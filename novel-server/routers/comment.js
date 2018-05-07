
const router = require('koa-router')();
const comment = require('../controllers/comment');

const routers = router
    .get('/novel', comment.novelComment)
    .get('/flow', comment.commentFlow)
    .get('/add', comment.addComment)

module.exports = routers;
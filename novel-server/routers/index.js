/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const novel = require('./novel');
const rank = require('./rank');
const searcher = require('./searcher');
const user = require('./user');
const comment = require('./comment');


router.use('/novel', novel.routes(), novel.allowedMethods());
router.use('/rank', rank.routes(), rank.allowedMethods());
router.use('/searcher', searcher.routes(), searcher.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/comment', comment.routes(), comment.allowedMethods());

module.exports = router;



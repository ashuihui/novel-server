
const router = require('koa-router')();
const login = require('../controllers/login');
const isLogin = require('../controllers/isLogin');
const interest = require('../controllers/interest');
const registered = require('../controllers/registered');
const userRecommendation = require('../controllers/userRecommendation');

const routers = router
    .get('/login', login.login)
    .get('/interest', interest.getUserInterset)
    .get('/interest/add', interest.addInterest)
    .get('/interest/delete', interest.deleteInterest)
    .get('/isLogin', isLogin.isLogin)
    .get('/registered', registered.reg)
    .get('/recommendation', userRecommendation.uCF)

module.exports = routers;
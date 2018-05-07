//中间件：token验证

const deal = require('../models/isLogin');
const jwt = require('../models/jwt');


let controller ={
    isLogin:async function(ctx,next){
        let token = ctx.request.query.token;
        if(token){
            let checkResul = jwt.checkJwt(token);
            if(checkResul){
                ctx.response.body=deal.format(checkResul,token);
            }else {
                ctx.response.body=deal.err('登录过期，需要重新登录');
            }
        }else{
            ctx.response.body=deal.err('参数错误');
        }
    },
    getToken:async function(ctx){
        let token = ctx.request.query.token;
        let checkResul = jwt.checkJwt(token);
        return checkResul;
    },
    consoleToken:async function(ctx){
        let token = ctx.cookies.get('token');
        console.log('token:'+JSON.toString(token));

    },
    isLoginNext:async function(ctx,next){
        await next();
        let token=ctx.request.query.token;
        let checkResul = jwt.checkJwt(token);
        if(!checkResul){
            ctx.response.body=deal.err();
        }
    }

};

module.exports = controller;
//中间件：用户关注或者用户书架

const sql = require('../utils/db-util');
const deal = require('../models/interest');
const indexModel = require('../models/index');
const jwt = require('../models/jwt');


let controller ={
    getUserInterset:async function(ctx,next){
        let token=ctx.request.query.token;
        let checkResul = jwt.checkJwt(token);
        if(checkResul){
            try{
                let interestData = await sql.getUserInterest(parseInt(checkResul.uid));
                let nidArr = deal.getNidArr(interestData);
                let novelsArr = await indexModel.getNovels(nidArr);
                ctx.response.body=deal.format(novelsArr);
            }catch (e) {
                if(e=='nofind'){
                    ctx.response.body=deal.format([]);
                }else {
                    ctx.response.body=deal.err('获取书架失败');
                }
            }
        }else {
            ctx.response.body=deal.err('尚未登陆');
        }
    },
    addInterest:async function(ctx,next){
        const token=ctx.request.query.token;
        const checkResul = jwt.checkJwt(token);
        if(checkResul){
            try{
                const nid= parseInt(ctx.request.query.nid);
                const uid = parseInt(checkResul.uid);
                await sql.addUserInterest(uid,nid);
                ctx.response.body=deal.formatAdd();
            }catch (e) {
                ctx.response.body=deal.errAdd('已在书架中');
            }
        }else {
            ctx.response.body=deal.errAdd('未登录');
        }
    },
    deleteInterest:async function(ctx,next){
        const token=ctx.request.query.token;
        const checkResul = jwt.checkJwt(token);
        if(checkResul){
            try{
                const nid= parseInt(ctx.request.query.nid);
                const uid = parseInt(checkResul.uid);
                await sql.deleteUserInterest(uid,nid);
                ctx.response.body=deal.formatdelete();
            }catch (e) {
                ctx.response.body=deal.errDelete('参数错误');
            }
        }else {
            ctx.response.body=deal.errDelete('未登录');
        }
    },
};

module.exports = controller;
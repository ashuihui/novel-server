//中间件：排行榜

const sql = require('../utils/db-util');
const deal = require('../models/rank');
const type = require('../utils/type');

let controller ={
    getTotalRank:async function(ctx, next){
        let queryObj=ctx.request.query;
        if(type.isNumber(parseInt(queryObj.num))){
            try{
                let sqlData = await sql.getTotalRankNext(parseInt(queryObj.num));
                let novelsArr = deal.novelInfoArr(sqlData);
                ctx.response.body=deal.format(novelsArr);
            }catch (err) {
                console.log(err);
                ctx.response.body=deal.errTotalRank('已经到底了');
            }
        }else {
            ctx.response.body=deal.errTotalRank('参数错误');
        }
    },
    getNewRank:async function(ctx, next){
        let queryObj=ctx.request.query;
        if(type.isNumber(parseInt(queryObj.num))){
            try{
                let sqlData = await sql.getNewRankNext(parseInt(queryObj.num));
                let novelsArr = deal.novelInfoArr(sqlData);
                ctx.response.body=deal.format(novelsArr);
            }catch (err) {
                console.log(err);
                ctx.response.body=deal.errTotalRank('已经到底了');
            }

        }else {
            ctx.response.body=deal.errTotalRank('参数错误');
        }
    },
};

module.exports = controller;
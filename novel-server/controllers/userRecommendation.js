//中间件：搜索

const deal = require('../models/userRecommendation');
const sql = require('../utils/db-util');
const indexModel = require('../models/index');
const jwt = require('../models/jwt');

let controller ={
    uCF:async function(ctx,next){
        let token=ctx.request.query.token;
        let checkResul = jwt.checkJwt(token);
        if(checkResul){
            try{
                const sqlData = await sql.getUserRecommendation(checkResul.uid);
                const  novelsIds = deal.getNids(sqlData);
                const novelsArr = await indexModel.getNovels(novelsIds);
                ctx.response.body=deal.format(novelsArr);
            }catch (e) {
                ctx.response.body=deal.err('获取推荐失败');
            }
        }else {
            ctx.response.body=deal.err('尚未登陆');
        }
    },
};

module.exports = controller;
//中间件：搜索

const deal = require('../models/searcher');
const type = require('../utils/type');
const sql = require('../utils/db-util');

let controller ={
    searcherNovel:async function(ctx,next){
        let queryObj=ctx.request.query;
        if(type.isString(queryObj.word)){
            let sqlData = await sql.searchNovel(queryObj.word)
                .catch((err)=>{
                    if(err=='nofind'){
                        return [];
                    }
                });
            let novelsArr = deal.novelInfoArr(sqlData);
            ctx.response.body=deal.format(novelsArr);
        }else {
            ctx.response.body=deal.err('参数错误');
        }
    },
};

module.exports = controller;
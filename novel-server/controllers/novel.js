//中间件：一本小说的推荐信息

const sql = require('../utils/db-util');
const deal = require('../models/novel');
const indexModel = require('../models/index');

let controller ={
    getOneNovel:async function(ctx,next){
        let me = this;
        let queryObj = ctx.request.query;
        if(queryObj.nid){
            try{
                let novelData = await sql.getNovelInfo(parseInt(queryObj.nid));
                let novel = novelData[0];
                let nidArr = deal.getNidArr(novel.recommendation);
                let novels = await indexModel.getNovels(nidArr);
                ctx.response.body=deal.format(novel,novels);
            }catch (e) {
                ctx.response.body=deal.err('没有找到对应的小说');
            }
        }else {
            ctx.response.body=deal.err('参数错误');
        }
    },
};

module.exports = controller;
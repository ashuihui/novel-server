//中间件：评论

const sql = require('../utils/db-util');
const deal = require('../models/comment');
const indexModel = require('../models/index');
const type = require('../utils/type');
const jwt = require('../models/jwt');


let controller ={
    novelComment:async function(ctx,next){
        try {
            const nid = parseInt(ctx.request.query.nid);
            const num = parseInt(ctx.request.query.num);
            const novelSqlInfo=await sql.getNovelInfo(nid);
            const novelInfo = indexModel.formatNovel(novelSqlInfo[0]);
            const commentSqlArr=await sql.getNovelComment(nid,num)
                .catch((err)=>{
                    if(err=='nofind'){
                        return [];
                    }
                });
            const commentArr=await deal.formatComents(commentSqlArr);
            ctx.response.body=deal.formatNovelComments(novelInfo,commentArr);
        } catch (err) {
            ctx.response.body=deal.errNovelComments('该书数据丢失');
        }
    },
    addComment:async function(ctx,next){
        let token=ctx.request.query.token;
        let checkResul = jwt.checkJwt(token);
        if(checkResul){
            try{
                const queryArr = deal.formatAddComment(ctx.request.query);
                await sql.checkCommentExit(ctx.request.query.uid,ctx.request.query.nid)
                    .then((result)=>{
                        sql.deleteComment(result[0].id)
                    })
                    .catch((err)=>{
                        //nofind
                    });
                await sql.addNovelComment(queryArr);
                ctx.response.body=deal.formatAdd();
            }catch (err) {
                console.log(err);
                ctx.response.body=deal.errAdd('添加失败');
            }
        }else {
            ctx.response.body=deal.errAdd('尚未登陆');
        }
    },
    commentFlow:async function(ctx,next){
            const num=parseInt(ctx.request.query.num);
            if(type.isNumber(num)){
                try{
                    const commentsSqlArr = await sql.getCommentFlow(num)
                    const commentsArr = deal.formatComents(commentsSqlArr);
                    ctx.response.body=deal.formatFlow(commentsArr);
                } catch (err) {
                    ctx.response.body=deal.errFlow('获取信息流失败');
                }
            }else{
                ctx.response.body=deal.errFlow('参数错误');
            }
    },
};

module.exports = controller;
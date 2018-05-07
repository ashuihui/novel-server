

let comment={
    formatNovelComments:function (novel, commentArr) {
        return JSON.stringify(
            {
                data: {
                    novel:novel,
                    comments:commentArr
                },
                msg: `This is a novel comments info `,
                success: 1,
                code: 3007,
            }
        )
    },
    formatAdd:function () {
        return JSON.stringify(
            {
                data: {
                    msg: `添加评论成功`,
                },
                msg: `添加评论成功`,
                success: 1,
                code: 3008,
            }
        )
    },
    formatFlow:function ( commentArr) {
        return JSON.stringify(
            {
                data: {
                    comments:commentArr
                },
                msg: `信息流 `,
                success: 1,
                code: 3009,
            }
        )
    },
    formatComents:function (commentSqlArr) {
        let result = [];
        result=commentSqlArr.map((value)=>{
            return {
                nid: value.novel_id,
                novelName: value.novel_name,
                uid:value.user_id,
                userName:value.user_name,
                comment:value.comment,
                score:value.score,
                updateTime: value.update_time,
            }
        });
        return result;

    },
    formatAddComment:function (queryObj) {
        const result = [
            queryObj.nid,
            queryObj.novelName,
            queryObj.uid,
            queryObj.userName,
            queryObj.comment,
            queryObj.score,
            queryObj.updateTime,
        ];
        return result;
    },
    errNovelComments:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3007,
        })
    },
    errAdd:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3008,
        })
    },
    errFlow:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3009,
        })
    },
};


module.exports=comment;




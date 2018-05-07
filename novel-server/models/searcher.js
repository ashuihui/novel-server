
let index = require('./index');

let searcher={
    format:function (novelArr) {
        return JSON.stringify(
            {
                data: {
                    novelArr:novelArr,
                },
                msg: `This is a searcher result : novel info array .`,
                success: 1,
                code: 3002,
            }
        );
    },
    err:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3002,
        })
    },
    novelInfoArr:function (sqlData) {
        let result = [];
        result = sqlData.map((novel)=>{
            return index.formatNovel(novel);
        });
        return result;
    },
};


module.exports=searcher;
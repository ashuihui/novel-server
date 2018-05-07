
let index = require('./index');

let searcher={
    format:function (novelArr) {
        return JSON.stringify(
            {
                data: {
                    novelArr:novelArr,
                },
                msg: `This is a rank piece info : novel info array .`,
                success: 1,
                code: 3003,
            }
        );
    },
    errTotalRank:function(){
        return JSON.stringify({
            msg : "a rank piece info: no find",
            success : 0,
            code : 3003,
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
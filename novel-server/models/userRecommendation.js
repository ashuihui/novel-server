
let index = require('./index');

let userRecommendation={
    format:function (novelArr) {
        return JSON.stringify(
            {
                data: {
                    recommendation:novelArr,
                },
                msg: `给用户的推荐小说`,
                success: 1,
                code: 3010,
            }
        );
    },
    err:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3010,
        })
    },
    getNids:function (sqlData) {
        let result = [];
        const arr = JSON.parse(sqlData[0].recommendation);
        result=arr.map((index)=>{
            return index[0];
        })
        return result;
    },
};


module.exports=userRecommendation;
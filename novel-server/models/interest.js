

let interest={
    format:function (novelsArr) {
        return JSON.stringify(
            {
                data: {
                    novelArr:novelsArr,
                },
                msg: `This is a user interest info : novels info array .`,
                success: 1,
                code: 3004,
            }
        );
    },
    formatAdd:function (novelsArr) {
        return JSON.stringify(
            {
                data: {
                    msg: `添加到书架成功`,
                },
                msg: `添加到书架成功`,
                success: 1,
                code: 3005,
            }
        );
    },
    formatdelete:function (novelsArr) {
        return JSON.stringify(
            {
                data: {
                    msg: `删除成功`,
                },
                msg: `删除成功`,
                success: 1,
                code: 3006,
            }
        );
    },
    err:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3004,
        })
    },
    errAdd:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3005,
        })
    },
    errDelete:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3006,
        })
    },
    getNidArr:function (interestData) {
        let result= [];
        result=interestData.map((item)=>{
            return item.novel_id;
        });
        return result;
    },

};


module.exports=interest;



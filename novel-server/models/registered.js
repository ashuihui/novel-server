

let registered={
    format:function () {
        return JSON.stringify(
            {
                data: {
                    msg: `注册成功`,
                },
                msg: `注册成功`,
                success: 1,
                code: 2004,
            }
        );
    },
    err:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 2004,
        })
    },
    errToken:function(){
        return JSON.stringify({
            msg : "token err",
            success : 0,
            code : 2003,
        })
    }
};


module.exports=registered;



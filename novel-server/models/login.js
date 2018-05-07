

let login={
    format:function (user,token) {
        return JSON.stringify(
            {
                data: {
                    user:{
                        userId:user.user_id,
                        userName:user.user_name
                    },
                    token:token,
                },
                msg: `user : ${user.user_name} login success!`,
                success: 1,
                code: 2002,
            }
        );
    },
    err:function(err){
        return JSON.stringify({
            msg : "登录失败:"+err,
            success : 0,
            code : 2002,
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


module.exports=login;



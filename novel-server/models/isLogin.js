

let isLogin={
    format:function (user,token) {
        return JSON.stringify(
            {
                data: {
                    user:{
                        userId:user.uid,
                        userName:user.userName
                    },
                    token:token,
                },
                msg: `user has right token `,
                success: 1,
                code: 2001,
            }
        );
    },
    err:function(err){
        return JSON.stringify({
            msg : "token is err:"+err,
            success : 0,
            code : 2001,
        })
    },
};


module.exports=isLogin;



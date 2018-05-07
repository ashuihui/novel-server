//中间件：用户关注或者用户书架

const config = require('../config');
const sql = require('../utils/db-util');
const deal = require('../models/login');
const hash = require('../models/hash');
const jwt = require('../models/jwt');


let controller ={
    login:async function(ctx,next){
        let queryObj = ctx.request.query;
        let loginInfo={
            userName:queryObj.userName,
            password:queryObj.password
        };
        if(loginInfo.userName&&loginInfo.password){
            try{
                let usersData = await sql.getUserInfo(loginInfo.userName);
                if(usersData.length>0){
                        let userItem = usersData[0];
                        let check = await hash.checkHash(loginInfo.password,userItem.password);
                        if(check){
                            let token = jwt.creatJwt({
                                uid:userItem.user_id,
                                userName:userItem.user_name
                            });
                            ctx.cookies.set(
                                'token',
                                token,
                                {
                                    domain: config.domain,  // 写cookie所在的域名
                                    expires: new Date('2018-06-15'),  // cookie失效时间
                                    httpOnly: false,
                                }
                                );
                            ctx.response.body=deal.format(userItem,token);
                        }else{
                            ctx.response.body=deal.err('密码错误');
                        }
                    }else{
                    ctx.response.body=deal.err('没有该用户');
                }
            }catch (e) {
                ctx.response.body=deal.err('登录失败');
            }
        }else {
            ctx.response.body=deal.err('参数错误');
        }
    },

};

module.exports = controller;
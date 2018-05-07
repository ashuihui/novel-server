//中间件：用户关注或者用户书架

const config = require('../config');
const sql = require('../utils/db-util');
const deal = require('../models/registered');
const hash = require('../models/hash');


let controller ={
    reg:async function(ctx,next){
        let queryObj = ctx.request.query;
        let regInfo={
            userName:queryObj.userName,
            password:queryObj.password,
            testCode:queryObj.testCode
        };
        if(regInfo.testCode===config.testCode&&regInfo.userName&&regInfo.password){
            const hashPassword = await hash.creatHash(regInfo.password);
            await sql.addUser(regInfo.userName,hashPassword)
                .then(()=>{
                    ctx.response.body=deal.format();
                })
                .catch(()=>{
                    ctx.response.body=deal.err('已有用户使用该名字');
                })
        }else {
            ctx.response.body=deal.err('内测码错误');
        }
    },

};

module.exports = controller;
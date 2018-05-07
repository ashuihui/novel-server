"use strict";

let mysql = require("mysql");
let config = require('../config');

let sql={
    init: function () {
        let me = this;
        return new Promise((resolve,reject)=>{
            global.pool = mysql.createPool(config.poolConfig);
            console.log("连接数据库成功");
            resolve("连接数据库成功");
        })
            .catch(err=>{
                console.log('连接数据库失败'+err);
                me.poolEnd();
                throw(err);
            })
    },
    poolEnd:function () {
        global.pool.end( (err)=> {
            if(err){
                console.log('关闭连接池失败，err：'+err);

            }
            console.log('关闭连接池：');
        });
    },
    deal:function (sqlStr,value) {
        let me = this;
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err, connection) {
                // 使用连接
                connection.query(sqlStr,value,function(err, result) {
                    if (err) {
                        reject(err);
                    }else if(result.length==0){
                        resolve([]);
                    }else {
                        let data = sql.jsonObj(result);
                        resolve(data);
                    }
                    connection.release();
                    //连接不再使用，返回到连接池
                });
            });
        })
            .catch((err)=>{
                if(err=='nofind'){
                    return [];
                }else{
                    console.log(`sql deal err :`+err);
                    throw (err);
                }
            })
    },
    getNovelInfo:function(novelId){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.novelTable} where novel_id=? `;
        return me.deal( sqlStr,[novelId])
    },
    searchNovel:async function(word){
        let me = this;
        let  sqlStr = `select * from ${config.dbConfig.novelTable} where novel_name like ? limit 0,9`;
        word=`%${word}%`;
        return me.deal( sqlStr,[word]);
    },
    getTotalRankNext:function (num) {
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.totalRank} order by user_number desc limit ?,10`;
        return me.deal( sqlStr,[num])
    },
    getNewRankNext:function (num) {
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.newRank} order by update_time desc limit ?,10`;
        return me.deal( sqlStr,[num])
    },
    getUserInfo:function(userName){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.userTabel} where user_name=? `;
        return me.deal( sqlStr,[userName])
    },
    getUserInterest:function(uid){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.novelInterestTable} where user_id=? `;
        return me.deal( sqlStr,[uid])
    },
    addUserInterest:function(uid,nid){
        let me = this;
        let  sqlStr =  `insert into ${config.dbConfig.novelInterestTable} (user_id,novel_id) VALUES (?,?) `;
        return me.deal( sqlStr,[uid,nid])
    },
    deleteUserInterest:function(uid,nid){
        let me = this;
        let  sqlStr =  `delete from ${config.dbConfig.novelInterestTable} where user_id=? and novel_id=? `;
        return me.deal( sqlStr,[uid,nid])
    },
    addUser:function(userName,hashPassword){
        let me = this;
        let  sqlStr =  `insert into ${config.dbConfig.userTabel} (user_name, password) value (?,?) `;
        return me.deal( sqlStr,[userName,hashPassword])
    },
    getNovelComment:function(uid,num=0){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.commentTable} where novel_id=? order by update_time desc limit ?,10 `;
        return me.deal( sqlStr,[uid,num])
    },
    addNovelComment:function(valueArr){
        let me = this;
        let  sqlStr =  `insert into ${config.dbConfig.commentTable} (novel_id,novel_name,user_id,user_name,comment,score,update_time) value (?) `;
        return me.deal( sqlStr,[valueArr])
    },
    getCommentFlow:function(num){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.commentTable} order by update_time desc limit ?,10`;
        return me.deal( sqlStr,[num])
    },
    checkCommentExit:function(uid,nid){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.commentTable} where user_id=? and novel_id=?`;
        return me.deal( sqlStr,[uid,nid])
    },
    deleteComment:function(id){
        let me = this;
        let  sqlStr =  `delete from ${config.dbConfig.commentTable} where id=?`;
        return me.deal( sqlStr,[id])
    },
    getUserRecommendation:function(uid){
        let me = this;
        let  sqlStr =  `select * from ${config.dbConfig.userTabel} where user_id=?`;
        return me.deal( sqlStr,[uid])
    },
    jsonObj:function (result) {
        let str=JSON.stringify(result);
        return  JSON.parse(str);
    }
};

module.exports=sql;

if (require.main === module) {
    sql.init();

    sql.addUser('dd','daf')
        .then((result)=>{
            console.log(result);
            sql.poolEnd();
        })
        .catch((err)=>{
            console.log(err)
            sql.poolEnd();
        })

}
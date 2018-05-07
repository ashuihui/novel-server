
const sql = require('../utils/db-util');

let index={
    formatNovel:function (novel) {
        let timeStr=novel.update_time.replace(/T16:00:00.000Z/,'');
        return {
            nid: novel.novel_id,
            novelName: novel.novel_name,
            author: novel.author,
            imgUrl: novel.img_url,
            wordCount: novel.word_number,
            updateTime: timeStr,
            beFrom: novel.befrom,
            novelUrl:novel.novel_url,
        }
    },
    getNovels:async function(nidArr){
        let me = this;
        let result=[];
        for(let index=0;index<nidArr.length;index++){
            let novelData = await sql.getNovelInfo(nidArr[index]);
            result.push(
                me.formatNovel(novelData[0])
            );
        }
        return result;
    },

};


module.exports=index;



/*状态码：
3001:一本书的推荐信息
3002:搜索一本书的结果
3003:总排行榜信息
3004:用户兴趣/书架
3005：添加书架
3006：删除一本书架
3007：查找一本书的评价
3008：添加一本书的评价
3009：信息流
3010：用户推荐

2001: token 验证登录
2002: 登录
2003: 未登录
2004:注册

*/



/*

1001: 无权限访问
1002: access_token过期
1003: unique_token无效
...

// 用户相关
2001: 未登录
2002: 用户信息错误
2003: 用户不存在

// 业务相关
3001: 业务XXX
3002: 业务XXX

// 系统异常
5001：Internal Server Error
*/


/*
{
    data : { // 请求数据，对象或数组均可
        user_id: 123,
            user_name: "zwz",
            user_avatar_url: "http://www.abc.com/1.jpg"
    ...
    },
    msg : "done", // 请求状态描述，调试用
    success : 1,
    code : 3001, // 业务自定义状态码
    extra : { // 其他扩展的数据，字段、内容不定
        type: 1,
            desc: "签到成功！"
    }
}*/



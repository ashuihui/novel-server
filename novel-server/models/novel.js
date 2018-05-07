

let novel={
    format:function (novel,novels) {
        let me = this;
        let timeStr=novel.update_time.replace(/T16:00:00.000Z/,'');
        return JSON.stringify(
            {
                data: {
                    nid: novel.novel_id,
                    novelName: novel.novel_name,
                    author: novel.author,
                    imgUrl: novel.img_url,
                    wordCount: novel.word_number,
                    updateTime: timeStr,
                    beFrom: novel.befrom,
                    novelUrl:novel.novel_url,
                    recommendation:novels,
                },
                msg: `This is a novel info whit it's recommendation info.`,
                success: 1,
                code: 3001,
            }
        )
    },
    err:function(err){
        return JSON.stringify({
            msg : err,
            success : 0,
            code : 3001,
        })
    },
    getNidArr:function (strArr) {
        let arr = JSON.parse(strArr);
        let result = arr.map((value)=>{
            return parseInt(value[0]);
        });
        console.log("result:"+result);
        return result;
    },
};


module.exports=novel;




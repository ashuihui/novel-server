

let bcrypt = require('bcrypt');

let hash = {
    creatHash:async function (password) {
        let result=null;
        const saltRounds = 5;
        await bcrypt.hash(password, saltRounds)
            .then(function(hash) {
                result=hash;
            });
        return result;
    },
    checkHash:async function(checkStr,hash){
        let result = null;
        await bcrypt.compare(checkStr, hash)
            .then(function(res) {
                result= res;
            });
        return result;
    },
    test:async function(oneStr,hash){

        let result = await this.checkHash(oneStr,hash);
        console.log(result);
        return result;
    },

};

module.exports=hash;

if (require.main === module) {
   hash.test('test1','$2b$05$o5iFRNpSNlAbmfmuJxeaX.LwsG3EAesKUcgbzrEXYxrGexg9S.RAS');
}
//$05$loAbSEs2jdaknvwxt9g7uu4uEH1BdRg.GH6L2v7H8V/yDl1dIxldi

let jwt = require('jsonwebtoken');
let config = require('../config');

let jwtDeal={
/*{
    uid:
    userName:
}*/
    creatJwt: function(user){
        return jwt.sign(user, config.jwtSecret);
    },
    checkJwt:function (token) {
        let result = false;
        jwt.verify(token, config.jwtSecret, function (err, data) {
            if (err) {
                result = false;
            } else {
                result = data;
            }
        });
        return result;
    },
};




module.exports=jwtDeal;

if (require.main === module) {
    let token = jwtDeal.creatJwt({ uid: '16545',userName:'123'});
    console.log('token:'+token)
    let checkResult = jwtDeal.checkJwt(token);
    console.log('check result:'+JSON.stringify(checkResult));

}
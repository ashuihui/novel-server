
const config = {
    port: 7280,
    poolConfig:{
        connectionLimit : 50,
        host     : '',
        user     : '',
        password : '',
        database : ''
    },
    dbConfig:{
        novelTable:'',
        novelInterestTable:'',
        userTabel:'',
        commentTable:'',
        totalRank:'',
        newRank:'',
    },
    jwtSecret:'',
    domain:'',
    testCode:'',

};
module.exports = config;
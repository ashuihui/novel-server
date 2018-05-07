const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const config = require('./config');
const routers = require('./routers/index');
const jsonp = require('koa-jsonp');

const sql = require('./utils/db-util');
const erro = require('./controllers/err');
const cors = require('@koa/cors');

sql.init();

const app = new Koa();


//配置返回数据格式为jsonp
app.use(jsonp());

//顶层捕捉错误
app.use(erro.errHandler);

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

//cors
app.use(cors());


// 监听启动端口
app.listen( config.port );
console.log(`the server is start at port ${config.port}`);

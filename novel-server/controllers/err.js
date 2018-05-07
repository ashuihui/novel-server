//中间件：顶层错误捕捉
let err={
    errHandler:async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                success:0,
                message: err.message
            };
        }
    },
};

module.exports = err;
const zlib = require('zlib')
const isJSON = require('koa-is-json')

module.exports = options => {
    return async function gzip (ctx, next) {
        await next();
        let body = ctx.body;
        if (!body) return;
        if (options.threshold && ctx.length < options.threshold) return;
        if (isJSON(body)) {
            body = JSON.stringify(body)
        }
        const stream = zlib.createGzip();
        stream.end(body);
        ctx.body = stream;
        ctx.logger.info("gzip中间件进行gzip压缩啦");
        ctx.set('Content-Encoding','gzip');
    }
}
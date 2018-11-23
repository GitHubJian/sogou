'use strict';
const koa = require('koa');
const koaBody = require('koa-body');

const { ssrMiddleware } = require('./middlewares');

const host = 'localhost',
    port = 8417;

const app = new koa();

app.use(koaBody({ patchKoa: true }));
app.use(ssrMiddleware());

app.listen(port, () => {
    console.log(`✨ 服务已启动 http://${host}:${port}\n`);
});

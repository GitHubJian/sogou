'use strict';
const path = require('path');
const koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaFavicon = require('koa-favicon');
const koaStatic = require('koa-static');
const { logger } = require('./utils');
const { entry } = require('./../webpack/entry');

const {
    pathConfig: { static: staticPath },
    serverConfig: { isDevelopment }
} = require('./config');

const {
    assetProxyMiddleware,
    webpackMiddleware,
    authMiddleware,
    routeMiddleware,
    notfoundMiddleware
} = require('./middlewares');

let hasVueRouter = true;

module.exports = ({ host = 'localhost', port = 8417 }) => {
    const app = new koa();
    app.use(koaLogger());
    app.use(koaFavicon(path.resolve(staticPath, 'favicon.ico')));
    app.use(koaBody({ patchKoa: true }));
    //app.use(authMiddleware());

    routeMiddleware(app);

    //静态资源
    webpackMiddleware({ hasVueRouter }, app);
    // app.use(assetProxyMiddleware());
    app.use(notfoundMiddleware());
    // app.use(assetProxyMiddleware({ hasVueRouter }));

    app.listen(port, () => {
        logger.info(`✨ 服务已启动 http://${host}:${port}\n`);

        Object.keys(entry).map(v => {
            console.log(`http://${host}:${port}/${v}.html`);
        });
    });
};

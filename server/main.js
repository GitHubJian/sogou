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

module.exports = ({ host = 'localhost', port = 8418 }) => {
    const app = new koa();
    app.use(koaLogger());
    app.use(koaFavicon(path.resolve(staticPath, 'favicon.ico')));
    app.use(koaStatic('/static'));
    app.use(koaBody({ patchKoa: true }));
    //app.use(authMiddleware());

    routeMiddleware(app);

    //静态资源
    webpackMiddleware(app);
    app.use(assetProxyMiddleware());
    app.use(notfoundMiddleware());

    app.listen(port, () => {
        logger.info(`✨ 服务已启动 http://${host}:${port}\n`);
        
        Object.keys(entry).map(v => {
            console.log(`http://${host}:${port}/${v}.html`);
        });
    });
};
'use strict';
const koa = require('koa');
const koaBody = require('koa-body');
const { logger } = require('./utils');

const {
    serverConfig: { isDevelopment }
} = require('./config');

const {
    assetProxyMiddleware,
    webpackMiddleware,
    authMiddleware,
    routeMiddleware
} = require('./middlewares');

module.exports = ({ host = 'localhost', port = 8418 }) => {
    const app = new koa();

    app.use(koaBody({ patchKoa: true }));

    //app.use(authMiddleware());

    if (isDevelopment) {
        webpackMiddleware(app);
    } else {
        app.use(assetProxyMiddleware());
    }

    routeMiddleware(app);

    app.listen(port, () => {
        logger.info(`✨ 服务已启动 http://${host}:${port}\n`);
    });
};

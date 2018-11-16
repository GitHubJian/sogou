const rootPath = process.cwd();
const fs = require('fs');
const path = require('path');
const {
    pathConfig,
    serverConfig: { NODE_ENV, isDevelopment }
} = require('./../config');

const webpack = require('webpack');
const singleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const { hotMiddleware } = require('koa-webpack-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const logger = require('./../utils/logger');
const { webpackConfig } = require(path.resolve(
    rootPath,
    'webpack/webpack.config.js'
));
const { htmlAssets } = require(path.resolve(rootPath, 'webpack/asset.js'));

const deepClone = val => {
    return JSON.parse(JSON.stringify(val));
};

const del = require('del');
const prepack = require(path.resolve(pathConfig.webpack, 'prepack.js'));

const projectEntry = deepClone(webpackConfig.entry);

webpackConfig.entry = {
    global: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
        pathConfig.global
    ]
};

const utimeFn = strPath => {
    const now = Date.now() / 1000;
    const then = now - 10;
    fs.utimes(strPath, then, then, err => {
        if (err) {
            throw err;
        }
    });
};

const setFileUtime = entryPath => {
    if (Array.isArray(entryPath)) {
        entryPath.forEach(utimeFn);
    } else {
        utimeFn(entryPath);
    }
};

const getSingleHtmlPlugin = function(k, v) {
    setFileUtime(v);
    return new HtmlWebpackPlugin({
        filename: path.resolve(pathConfig.static, `${k}.html`),
        title: '测试',
        template: pathConfig.template,
        favicon: pathConfig.favicon,
        chunks: ['global', k],
        NODE_ENV
    });
};

module.exports = async app => {
    if (!isDevelopment) {
        return;
    }
    //执行prepack
    // del.sync(pathConfig.prepack + '');

    // await prepack();

    const htmlCache = {};
    const compiler = webpack(webpackConfig);
    const devMiddlewareInstance = webpackDevMiddleware(compiler, {
        publicPath: '/'
    });

    app.use(async (ctx, next) => {
        if (ctx.path === '/' || ctx.path.endsWith('.html')) {
            const entryKey =
                ctx.path === '/'
                    ? 'index'
                    : path.join(ctx.path.replace('.html', '').substring(1));
            const entryValue = projectEntry[entryKey];

            if (entryValue) {
                if (htmlCache[entryKey]) {
                    await next();
                } else {
                    compiler.apply(
                        new singleEntryPlugin(rootPath, entryValue, entryKey)
                    );
                    compiler.apply(getSingleHtmlPlugin(entryKey, entryValue));
                    compiler.apply(
                        new HtmlWebpackIncludeAssetsPlugin({
                            append: false,
                            assets: htmlAssets
                        })
                    );
                    devMiddlewareInstance.invalidate();
                    htmlCache[entryKey] = true;
                    await next();
                }
            } else {
                ctx.status = 404;
                ctx.body = {
                    msg: '不存在当前路径'
                };
            }
        } else {
            await next();
        }
    });

    app.use(async (ctx, next) => {
        ctx.status = 200;
        await devMiddlewareInstance(ctx.req, ctx.res, async () => {
            await next();
        });
    });

    app.use(hotMiddleware(compiler));
};

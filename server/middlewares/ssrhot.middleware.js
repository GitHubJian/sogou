const clone = require('clone');
const path = require('path');
const rootPath = process.cwd();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const singleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const { webpackConfig: webpackClientConfig } = require(path.resolve(
    rootPath,
    'webpack/webpack.client.config.js'
));

const { webpackConfig: webpackServerConfig } = require(path.resolve(
    rootPath,
    'webpack/webpack.server.config.js'
));

const clientEntry = clone(webpackClientConfig.entry);
const serverEntry = clone(webpackServerConfig.entry);

webpackClientConfig.entry = {};
webpackServerConfig.entry = {};

webpackClientConfig.entry['global'] = [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true'
];
webpackServerConfig.entry['global'] = [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true'
];

// const devMiddlewareInstance = webpackDevMiddleware(compiler, {
//     publicPath: '/'
// });

function compile(compiler) {
    return new Promise((res, rej) => {
        compiler.run((err, stats) => {
            if (err) rej(err);
            res();
        });
    });
}

const middleware = async (ctx, next) => {
    const urlpath = ctx.path === '/' ? '/index.html' : ctx.path;
    if (!urlpath.endsWith('.html')) {
        return next();
    }

    const [entryKey] = path.basename(urlpath).split('.');
    const entryClientValue = clientEntry[entryKey];
    const entryServerValue = serverEntry[entryKey];

    webpackClientConfig.entry[entryKey] = entryClientValue;
    webpackServerConfig.entry[entryKey] = entryServerValue;

    //compiler.apply(new singleEntryPlugin(rootPath, entryValue, entryKey));
    try {
        let compiler = webpack(webpackClientConfig);
        await compile(compiler);

        compiler = webpack(webpackServerConfig);
        await compile(compiler);

        next();
    } catch (e) {
        ctx.body = e;
    }
};

module.exports = () => {
    return middleware;
};

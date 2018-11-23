const pathConfig = require('config').get('path');
const webpackCompiler = require('./compiler');
const {
    webpackConfig: webpackClientConfig
} = require('./webpack.client.config');

const {
    webpackConfig: webpackServerConfig
} = require('./webpack.server.config');

const beforeWebpack = require('./hook-before-webpack.js');
const afterWebpack = require('./hook-after-webpack.js');

const need_copy_files = [
    {
        from: `${pathConfig.dist}/css/*.css`,
        to: pathConfig.static + '/css'
    },
    {
        from: `${pathConfig.dist}/js/*.js`,
        to: pathConfig.static + '/js'
    },
    {
        from: `${pathConfig.dll}/css/*.css`,
        to: pathConfig.static + '/css'
    },
    {
        from: `${pathConfig.dll}/js/*.js`,
        to: pathConfig.static + '/js'
    },
    {
        from: pathConfig.favicon,
        to: pathConfig.static
    }
];

async function build() {
    await beforeWebpack();
    await webpackCompiler(webpackServerConfig);
    await webpackCompiler(webpackClientConfig);
    await afterWebpack(need_copy_files);
}

build();

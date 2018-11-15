process.env.NODE_WEBPACK_TYPE = 'ssr';

const webpackCompiler = require('./compiler');
const prepack = require('./prepackSSR');
const afterpack = require('./afterpack');
const {
    webpackConfig: webpackClientConfig
} = require('./webpack.client.config');

const {
    webpackConfig: webpackServerConfig
} = require('./webpack.server.config');

const build = async () => {
    await prepack();
    await webpackCompiler(webpackClientConfig);
    await webpackCompiler(webpackServerConfig);
    await afterpack();
};

module.exports = build;

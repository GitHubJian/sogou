const webpackCompiler = require('./compiler');
const prepack = require('./prepackSSR');
const afterpack = require('./afterpack');
const { webpackConfig } = require('./webpack.client.config');

const build = async () => {
    await webpackCompiler(webpackConfig);
};

module.exports = build;

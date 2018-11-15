const webpackCompiler = require('./compiler');
const prepack = require('./prepackSSR');
const afterpack = require('./afterpack');
const { webpackConfig } = require('./webpack.server.config');

const build = async () => {
    await prepack();
    await webpackCompiler(webpackConfig);
    await afterpack();
};

module.exports = build;

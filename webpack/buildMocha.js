const webpackCompiler = require('./compiler');
const { webpackConfig } = require('./webpack.mocha.config');

const build = async () => {
    await webpackCompiler(webpackConfig);
};

module.exports = build;

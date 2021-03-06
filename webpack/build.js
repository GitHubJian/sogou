const webpackCompiler = require('./compiler');
const prepack = require('./prepack');
const afterpack = require('./afterpack');
const { webpackConfig } = require('./webpack.config');

const build = async () => {
    await prepack();
    await webpackCompiler(webpackConfig);
    await afterpack();
};

module.exports = build;

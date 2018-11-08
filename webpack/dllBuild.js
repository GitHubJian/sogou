const webpackCompiler = require('./compiler');
const { webpackConfig } = require('./webpack.dll.config');
const { createDllVersion } = require('./dllVersion');

const dllBuild = async () => {
    if (Object.keys(webpackConfig.entry).length > 0) {
        await webpackCompiler(webpackConfig);
    }

    createDllVersion();
};

module.exports = dllBuild;

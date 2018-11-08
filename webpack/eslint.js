const bulkingCheck = require('./bulkingCheck');
const { root, src } = require('config').get('path');
const path = require('path');

const createEslintRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules/,
    include: file => {
        if (file.includes('node_modules')) {
            return false;
        }
        if (!file.startsWith(src)) {
            return false;
        }
        const bulkingCheckFiles = bulkingCheck();
        return bulkingCheckFiles.some(v => {
            return file === path.resolve(root, v);
        });
    },
    options: {
        formatter: require('eslint/lib/formatters/table'),
        emitWarning: true, // 热更新模式下开启 https://github.com/webpack-contrib/eslint-loader#emitwarning-default-false
        configFile: path.resolve(root, '.eslintrc.js')
    }
});

module.exports = createEslintRule;

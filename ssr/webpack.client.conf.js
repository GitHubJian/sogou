const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    entry: {
        client: './ssr/entry-client.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './ssr/index.html',
            filename: 'index.html'
        })
    ]
});

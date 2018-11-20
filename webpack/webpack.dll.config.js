const { pathConfig } = require('./config');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin(`css/[name].css`);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const LIBRARY_NAME = '__[name]_[chunkhash]__';

const entry = {
    vendor: ['vue', 'vuex', 'vue-router']
};

const webpackConfig = {
    entry,
    output: {
        filename: `js/[name].js`,
        path: pathConfig.dll,
        publicPath: '/',
        library: LIBRARY_NAME
    },
    resolve: {
        extensions: ['.js', '.css'],
        modules: [pathConfig.nodeModule]
    },
    resolveLoader: {
        modules: [pathConfig.nodeModule]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'image/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin([pathConfig.dll], {
            root: pathConfig.root,
            verbose: false
        }),
        extractCSS,
        new webpack.DllPlugin({
            path: path.resolve(pathConfig.dll, '[name].json'),
            name: LIBRARY_NAME
        }),
        new AssetsWebpackPlugin({
            path: pathConfig.dll,
            filename: 'index.json',
            prettyPrint: true
        })
    ],
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false
    }
};

module.exports = { entry, webpackConfig };

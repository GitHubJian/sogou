const { pathConfig } = require('./config');

const { serverEntry: entry } = require('./entry');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const extractCSS = require('./extract');

const webpackConfig = {
    mode: 'production',
    target: 'node',
    entry: Object.assign({ global: pathConfig.global }, entry),
    output: {
        filename: 'server/[name].js',
        path: pathConfig.static,
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {},
        extensions: ['.js', '.json', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: extractCSS.extract({
                                    fallback: 'vue-style-loader',
                                    use: ['css-loader']
                                }),
                                sass: extractCSS.extract({
                                    fallback: 'vue-style-loader',
                                    use: ['sass-loader', 'css-loader']
                                }),
                                js: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: ['@babel/preset-env']
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'image/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {}
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractCSS,
        new VueLoaderPlugin(),
        // new webpack.DllReferencePlugin({
        //     manifest: require(`${pathConfig.dll}/vendor.json`)
        // }),
        // new VueSSRServerPlugin()
    ]
};

module.exports = { webpackConfig };

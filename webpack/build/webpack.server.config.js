const pathConfig = require('config').get('path');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
});

const { serverEntry: entry } = require('./entry');

const webpackConfig = {
    mode: 'production',
    target: 'node',
    entry,
    output: {
        filename: 'js/[name]-server.js',
        path: pathConfig.dist,
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            api: path.resolve(pathConfig.src, 'api')
        },
        extensions: ['.js', '.json', '.vue']
    },
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/
    }),
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                            presets: [['env', { modules: false }]],
                            plugins: ['syntax-dynamic-import'],
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
                            presets: ['@babel/preset-env'],
                            plugins: ['syntax-dynamic-import']
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
        new webpack.DllReferencePlugin({
            manifest: require(`${pathConfig.dll}/vendor.json`)
        }),
        new VueSSRServerPlugin(),
        new FriendlyErrorsPlugin()
    ]
};

module.exports = { webpackConfig };

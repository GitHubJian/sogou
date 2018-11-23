const pathConfig = require('config').get('path');

const path = require('path');
const webpack = require('webpack');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
});

const { clientEntry } = require('./entry');

const webpackConfig = {
    mode: 'production',
    entry: Object.assign({ global: pathConfig.global }, clientEntry),
    output: {
        filename: 'js/[name].js',
        path: pathConfig.dist,
        publicPath: '/'
    },
    resolve: {
        alias: {
            api: path.resolve(pathConfig.src, 'api')
        },
        extensions: ['.js', '.json', '.vue']
    },
    module: {
        rules: [
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
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-syntax-dynamic-import']
                        }
                    }
                ]
            },
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
        new VueLoaderPlugin(),
        new VueSSRClientPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production',
            'process.env.buildTime': JSON.stringify(Date.now())
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllReferencePlugin({
            manifest: require(`${pathConfig.dll}/vendor.json`)
        })
    ],
    optimization: {
        splitChunks: {}
    },
    performance: {
        hints: false
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false
    }
    // devtool: '#eval-source-map'
};

// webpackConfig.plugins.push(
//     ...Object.keys({
//         vendor: ['vue', 'vuex', 'vue-router']
//     }).reduce((prev, v) => {
//         if (fs.existsSync(`${pathConfig.dll}/${v}.json`)) {
//             prev.push(
//                 new webpack.DllReferencePlugin({
//                     manifest: require(`${pathConfig.dll}/${v}.json`)
//                 })
//             );
//         }

//         return prev;
//     }, [])
// );

webpackConfig.plugins.push(
    ...[
        extractCSS,
        new CleanWebpackPlugin(
            ['dist/**/*.(js|css|json)', 'static/**/*.(js|css)'], // glob 匹配
            {
                root: pathConfig.root, // 根目录
                exclude: ['favicon.ico'], // 不包含
                verbose: true, // 开启输出
                dry: false // 启动删除文件
            }
        )
    ]
);

module.exports = { webpackConfig };

const { basename, resolve, join } = require('path');
const glob = require('glob');
const { statSync, existsSync, readdirSync } = require('fs');
const fs = require('fs-extra');
const { pathConfig } = require('./config');
const { entry } = require('./entry');
const { rules, extractCSS, happyPackPlugins } = require('./rules');
const { alias } = require('./alias');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { entry: dllEntry } = require('./webpack.dll.config');

const { htmlAssets } = require('./asset');

const { NODE_ENV } = process.env;
const [isDevelopment, isProduction] = [
    NODE_ENV == 'development',
    NODE_ENV == 'production'
];

let dllCopyPath = [];

if (existsSync(pathConfig.dll)) {
    dllCopyPath = readdirSync(pathConfig.dll)
        .filter(v => {
            const stat = statSync(join(pathConfig.dll, v));
            return stat.isDirectory();
        })
        .map(v => {
            return {
                from: resolve(pathConfig.dll, v),
                to: resolve(pathConfig.static, v)
            };
        })
        .concat([
            {
                from: pathConfig.favicon,
                to: pathConfig.static
            }
        ]);
}

const HtmlWebpackPluginList = Object.entries(entry).map(([k, v]) => {
    return new HtmlWebpackPlugin({
        filename: resolve(pathConfig.static, `${k}.html`),
        template: pathConfig.template,
        title: '测试',
        favicon: pathConfig.favicon,
        chunks: ['global', k],
        chunksSortMode: 'dependency',
        NODE_ENV
    });
});

const webpackConfig = {
    mode: 'production',
    entry: Object.assign({ global: pathConfig.global }, entry),
    output: {
        filename: 'js/[name].js',
        path: pathConfig.static,
        publicPath: '/',
        chunkFilename: 'js/[name].bundle.js'
    },
    resolve: {
        alias,
        extensions: ['.js', '.json', '.vue']
    },
    module: {
        rules
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            'process.env.buildTime': JSON.stringify(Date.now())
        }),
        new webpack.ProvidePlugin({
            qs: 'query-string',
            axios: 'axios'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin(dllCopyPath),
        ...happyPackPlugins
    ],
    optimization: {
        splitChunks: {
            // chunks(chunk) {
            //     return ['vendors', 'global'].includes(chunk.name);
            // }
            // chunks: 'all'
        }
    },
    performance: {
        hints: false
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false
    },
    devtool: isDevelopment ? 'eval-source-map' : ''
};
//动态引入dll
webpackConfig.plugins.push(
    ...Object.keys(dllEntry).reduce((prev, v) => {
        if (existsSync(`${pathConfig.dll}/${v}.json`)) {
            prev.push(
                new webpack.DllReferencePlugin({
                    manifest: require(`${pathConfig.dll}/${v}.json`)
                })
            );
        }

        return prev;
    }, [])
);

if (isDevelopment) {
    webpackConfig.plugins.push(
        ...[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin()
        ]
    );
} else {
    webpackConfig.plugins.push(
        ...[
            extractCSS,
            new CleanWebpackPlugin([pathConfig.static], {
                root: pathConfig.root,
                exclude: [],
                verbose: true,
                dry: false
            }),
            // new AssetsWebpackPlugin({
            //     path: pathConfig.static,
            //     filename: 'index.json',
            //     prettyPrint: true,
            //     processOutput(assets) {
            //         delete assets[''];
            //         return JSON.stringify(assets, null, 4);
            //     }
            // }),
            ...HtmlWebpackPluginList
        ]
    );
}

if (existsSync(`${pathConfig.dll}/index.json`)) {
    webpackConfig.plugins.push(
        new HtmlWebpackIncludeAssetsPlugin({
            append: false,
            assets: htmlAssets
        })
    );
}

if (isProduction) {
    webpackConfig.plugins.push(
        new ParallelUglifyPlugin({
            uglifyJS: {
                compress: {
                    warnings: false
                }
            }
        })
    );
}

module.exports = { webpackConfig };

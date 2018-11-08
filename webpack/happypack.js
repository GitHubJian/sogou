const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const { NODE_ENV } = process.env;
let [isDevelopment, isProduction] = [
    NODE_ENV == 'development',
    NODE_ENV == 'production'
];

const extractCSS = require('./extract');

const jsHappyPackPlugin = new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    verbose: false,
    loaders: [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ]
});

const cssHappyPackPlugin = new HappyPack({
    id: 'css',
    threadPool: happyThreadPool,
    verbose: false,
    loaders: ['vue-style-loader', 'css-loader']
});

const scssHappyPackPlugin = new HappyPack({
    id: 'scss',
    threadPool: happyThreadPool,
    verbose: false,
    loaders: ['vue-style-loader', 'css-loader', 'sass-loader']
});

const vueHappyPackPlugin = new HappyPack({
    id: 'vue',
    threadPool: happyThreadPool,
    verbose: false,
    loaders: ['vue-loader']
});

module.exports = {
    jsHappyPackPlugin,
    cssHappyPackPlugin,
    scssHappyPackPlugin,
    vueHappyPackPlugin
};

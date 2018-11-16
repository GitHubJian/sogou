const { NODE_ENV } = process.env;
const [isDevelopment, isProduction] = [
    NODE_ENV == 'development',
    NODE_ENV == 'production'
];

const extractCSS = require('./extract');
const eslintRule = require('./eslint.js')();

const {
    jsHappyPackPlugin,
    cssHappyPackPlugin,
    vueHappyPackPlugin,
    scssHappyPackPlugin
} = require('./happypack');

const rules = [
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
        use: 'happypack/loader?id=js'
    }
];

const rules4Prod = [
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
].concat(rules);

const rules4Dev = [
    {
        test: /\.vue$/,
        use: 'vue-loader'
    },
    {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
    }
].concat(rules);
//.concat([eslintRule]);

module.exports = {
    happyPackPlugins: [
        jsHappyPackPlugin,
        cssHappyPackPlugin,
        scssHappyPackPlugin,
        vueHappyPackPlugin
    ],
    extractCSS,
    rules: isDevelopment ? rules4Dev : rules4Prod
};

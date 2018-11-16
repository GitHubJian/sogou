const root = process.cwd();
const path = require('path');

const webpackConfig = {
    entry: {
        test: path.resolve(root, 'test/client/test.spec.js')
    },
    output: {
        filename: '[name].spec.js',
        path: path.resolve(root, '.temp/mocha')
    },
    resolve: {
        alias: {
            client: path.resolve(root, 'client')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
};

module.exports = { webpackConfig };

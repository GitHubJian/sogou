const path = require('path');
const root = process.cwd();
const alias = {
    client: path.resolve(root, 'client')
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['requirejs', 'mocha', 'should'],
        files: ['client/*.js', 'test/client/*.js'],
        exclude: [],
        preprocessors: {
            'client/*.js': ['webpack'],
            'test/client/*.js': ['webpack']
        },
        reporters: ['progress'],
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                {
                    type: 'json',
                    subdir: '.',
                    file: 'coverage.json'
                },
                {
                    type: 'lcov',
                    subdir: '.'
                },
                {
                    type: 'text-summary'
                }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        plugins: [
            'karma-coverage',
            'karma-mocha',
            'karma-should',
            'karma-commonjs',
            'karma-requirejs',
            'karma-spec-reporter',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-chrome-launcher'
        ],
        webpack: {
            mode: 'development',
            resolve: {
                alias
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader'
                    }
                ]
            }
        }
    });
};

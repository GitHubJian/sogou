const AfterWebpackPlugin = require('../after-webpack-plugin');
const pathConfig = require('config').get('path');

let after = new AfterWebpackPlugin([
    {
        from: `${pathConfig.dist}/css/*.css`,
        to: pathConfig.static + '/css'
    },
    {
        from: `${pathConfig.dist}/js/*.js`,
        to: pathConfig.static + '/js'
    }
]);

after._copy_();

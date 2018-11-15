process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const root = process.cwd();
const { resolve } = require('path');

const { NODE_ENV, PORT } = process.env;
const [isDevelopment, isProduction] = [
    NODE_ENV === 'development',
    NODE_ENV === 'production'
];

let port = PORT || 8417,
    host = 'localhost',
    url = `http://${host}${port ? ':' + port : ''}`;

module.exports = {
    path: {
        root: root,
        mock: resolve(root, 'mock'),
        src: resolve(root, 'src'),
        pages: resolve(root, 'src/pages'),
        global: resolve(root, 'src/global.js'),
        globalServer: resolve(root, 'src/global-server.js'),
        temp: resolve(root, '.temp'),
        dll: resolve(root, '.temp/dll'),
        dllVersion: resolve(root, '.temp/dll/version.json'),
        webpack: resolve(root, 'webpack'),
        template: resolve(root, 'webpack/template.ejs'),
        templateSSR: resolve(root, 'webpack/template.ssr.ejs'),
        prepackPath: resolve(root, '.temp/prepack'),
        static: resolve(root, 'static'),
        nodeModule: resolve(root, 'node_modules'),
        dist: resolve(root, 'dist'),
        favicon: resolve(root, 'favicon.ico'),
        zoo: resolve(root, 'zoo')
    },
    project: {
        title: 'Sogou Test'
    },
    server: {
        NODE_ENV,
        isDevelopment,
        isProduction,
        port,
        host,
        url
    },
    mysql: {
        host: 'localhost',
        port: 3306,
        database: 'test',
        username: 'root',
        password: 'P@ssw0rd'
    },
    mongodb: {
        url: 'mongodb://localhost:27017',
        db: 'test'
    }
};

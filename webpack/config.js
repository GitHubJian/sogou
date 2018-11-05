const config = require('config');
const pathConfig = config.get('path');
const serverConfig = config.get('server');

module.exports = {
    pathConfig,
    serverConfig
};

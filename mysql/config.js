const config = require('config');
const mysqlConfig = config.get('mysql');

module.exports = {
    mysqlConfig
};

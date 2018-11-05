const {
    mysqlConfig: { database, username, password, host }
} = require('./../config');
const Sequelize = require('sequelize');

let instance = Symbol['sequelize'];

let signle = {
    [instance]: undefined,
    getInstance() {
        return this[instance] !== undefined
            ? this[instance]
            : (this[instance] = new Sequelize(database, username, password, {
                  host: host,
                  dialect: 'mysql'
              }));
    }
};

module.exports = signle.getInstance();

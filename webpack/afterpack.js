const { entry } = require('./entry');
const {
    serverConfig: { host, port }
} = require('./config');

const afterpack = async () => {
    Object.entries(entry).forEach(([k, v]) => {
        console.log('路由：');
        console.log(`http://${host}:${port}/${k}.html`);
    });
};

module.exports = afterpack;

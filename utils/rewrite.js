const fse = require('fs-extra');
const input = require('./input');
const root = process.cwd();
const path = require('path');

const jsonPath = path.resolve(root, `utils/test/${Date.now()}.json`);

const write = async () => {
    const response = await input();
    fse.writeJSONSync(jsonPath, response);
};

module.exports = write;

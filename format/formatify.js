const path = require('path');
const root = process.cwd();
const prettier = require('prettier');
const prettierrc = require(path.resolve(root, 'prettier.config.js'));

const format = content => {
    try {
        let p = prettier.format(content, prettierrc);
        return p;
    } catch (e) {
        throw e;
    }
};

module.exports = format;

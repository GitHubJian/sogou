const { execSync } = require('child_process');
const chalk = require('chalk');
const colors = require('colors');

let v1 = '1.0.1',
    v2 = '1.0.2';
let text = [
    `Update available ${v1} -> ${v2}`,
    `Run ${'npm update sogou@' + v2} to update`
];

const single = {
    topLeft: '┌',
    topRight: '┐',
    bottomRight: '┘',
    bottomLeft: '└',
    vertical: '│',
    horizontal: '─'
};

const round = {
    topLeft: '╭',
    topRight: '╮',
    bottomRight: '╯',
    bottomLeft: '╰',
    vertical: '│',
    horizontal: '─'
};

let box = round;

function getWindowWidth() {
    if (typeof process === 'object' && process.stdout && process.stdout.columns)
        return process.stdout.columns;
}
const maxWidth = getWindowWidth() || 80;
let line = box.topLeft + box.horizontal.repeat(maxWidth - 2) + box.topRight;
let lastLine =
    box.bottomLeft + box.horizontal.repeat(maxWidth - 2) + box.bottomRight;

console.log(line);
function padding(str, len = 0, code = ' ') {
    return code.repeat(len) + str + code.repeat(len);
}
text.forEach(v => {
    let width = Math.trunc((maxWidth - v.length - 2) / 2);
    let str = padding(v, width);
    if (str.length % 2 == 1) {
        str += ' ';
    }
    debugger;

    let centerLine = box.vertical + str + box.vertical;
    console.log(centerLine);
});

console.log(lastLine);

const checkUpdate = () => {
    const pkg = require('../package.json');
    let { version } = pkg;
    let a = execSync('npm info sokit', { encoding: 'utf-8' });
};

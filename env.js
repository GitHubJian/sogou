process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // 配置node
// process.env.NODE_CONFIG_ENV; // 配置config环境
// process.env['NODE_CONFIG_DIR']; // 配置config路径
// process.env.NODE_APP_INSTANCE = 'company'; // 配置config实例

const {
    NODE_ENV,
    NODE_CONFIG_ENV = 'undefined',
    NODE_CONFIG_DIR = 'undefined',
    NODE_APP_INSTANCE = 'undefined'
} = process.env;

const chalk = require('chalk');
const cliui = require('cliui');

let ui = cliui();
let ui2 = cliui();

ui.div(
    {
        text: chalk.green('NODE ENV')
    },
    {
        text: 'Prefix: NODE_'
    }
);

let thead = ['ENV', 'CONFIG_ENV', 'CONFIG_DIR', 'APP_INSTANCE'];
let tbody = [[NODE_ENV, NODE_CONFIG_ENV, NODE_CONFIG_DIR, NODE_APP_INSTANCE]];

let table = [thead].concat(tbody);

const width = Math.trunc(ui.width / thead.length);

table.forEach(row => {
    let cols = row.reduce((prev, cur) => {
        prev.push({ text: cur, width });

        return prev;
    }, []);

    ui.span(...cols);
});

ui2.div({
    text: ui.toString(),
    border: 1
});

console.log(ui2.toString(), '\t');

// const loading = require('loading-cli');
// const load = loading('loading text!!').start();

// setTimeout(function() {
//     load.color = 'yellow';
//     load.text = ' Loading rainbows';
// }, 2000);

// // stop
// setTimeout(function() {
//     load.stop();
// }, 3000);

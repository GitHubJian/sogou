#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander');
const copy = require('./../utils/copy');
const write = require('../utils/rewrite');

commander
    .version('0.1.0')
    .usage('[options] <params ...>')
    .option('init', '初始化')
    .option('-y, --yes', '自动化生成')
    .option('-p, --path [path]', '路径')
    .option('update', '更新')
    .on('--help', () => {
        console.log('  更多信息请访问');
        console.log(chalk.cyan('     http://www.baidu.com'));
    })
    .parse(process.argv);

if (commander.init) {
    //check input
    if (commander.path) {
        //if path is exist,
        //copy to path
        (async () => {
            let to = commander.path;
            let response = await input();
            await copy(to);
            write(response);
        })();
    } else if (!commander.path && commander.yes) {
        //if path is not exist but yes
        //copy to cwd
        console.log(`if path is not exist but yes, copy to cwd`);
    } else {
        let answer = '';
        //input path of copy
        rl.question('What do you think of Node.js?', input => {
            answer = input;
            rl.close();
        });
        rl.question('What do you think of Node.js 2?', input => {
            console.log(input);
        });
    }
}

if (commander.install) {
}

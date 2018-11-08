#!/usr/bin/env node

// const root = process.cwd();
// let rootPathArray = root.split('/');
// const copyDirPath = rootPathArray
//     .slice(0, rootPathArray.length - 1)
//     .concat(['copyTo'])
//     .join('/');
// const { execSync, spawn } = require('child_process');
// const fse = require('fs-extra');

// let temp = `${root}Temp`;

// // copy to
// const ls = execSync(`cp -r ${root} ${temp}`);
// // rename
// let a = execSync(`mv ${temp} ${copyDirPath}`);
// const pkg = require('./../package.json');
// const path = require('path');
// const glob = require('glob');
// const fs = require('fs');

// const copyDirPath = rootPathArray
//     .slice(0, rootPathArray.length - 1)
//     .concat(['copyTo'])
//     .join('/');
const chalk = require('chalk');
const commander = require('commander');

commander
    .version('0.1.0')
    .usage('[options] <params ...>')
    .option('init', '初始化')
    .option(' '.repeat(10) + '-y, --yes', '自动化生成')
    .option('update', '更新')
    .option(' '.repeat(10) + '-i, --install <package>', '安装')
    .option(' '.repeat(10) + '-s, --size <size>', 'size', '22222')
    .on('--help', () => {
        console.log('  更多信息请访问');
        console.log(chalk.cyan('     http://www.baidu.com'));
    })
    .parse(process.argv);

if (commander.init) {
}

if (commander.install) {
}

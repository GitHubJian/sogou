#!/usr/bin/env node

const commander = require('commander');
const pkg = require('./../package.json');

commander
    .version(pkg.version)
    .usage('[Options]')
    .option('init', '初始化')
    .parse(process.argv);

if (commander.init) {
    
}

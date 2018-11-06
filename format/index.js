// const loading = require('loading-cli');
// const load = loading('Prettier Format Start!!').start();
const chalk = require('chalk');
const cliui = require('cliui');
const path = require('path');
const root = process.cwd();
const prettier = require('prettier');
const prettierrc = require(path.resolve(root, 'prettier.config.js'));
const diffFiles = require('./bulkingCheck')();
const fs = require('fs');
console.log(chalk.green('Prettier Start!\n'));
const headerUi = cliui();
headerUi.span(
    {
        text: 'name',
        width: 40
    },
    {
        text: 'filesize',
        width: 20
    },
    {
        text: 'time',
        width: 20
    }
);

console.log(chalk.red(headerUi.toString()));

for (const ite of diffFiles) {
    const st = Date.now();
    let content = fs.readFileSync(ite, { encoding: 'utf-8' });
    let format = prettier.format(content, prettierrc);
    fs.writeFileSync(ite, format);
    const stat = fs.statSync(ite);
    const et = Date.now();
    const ui = cliui();

    ui.span(
        {
            text: path.basename(ite),
            width: 40
        },
        {
            text: stat.size,
            width: 20
        },
        {
            text: et - st,
            width: 20
        }
    );
    console.log(ui.toString());
}

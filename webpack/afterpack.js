const chalk = require('chalk');
const cliui = require('cliui');
const ui = cliui();
const { entry } = require('./entry');
const {
    serverConfig: { host, port }
} = require('./config');

const afterpack = async () => {
    Object.entries(entry).forEach(([k, v], i) => {
        let href = `http://${host}:${port}/${k}.html`;
        if (i === 0) {
            ui.span(
                { text: chalk.green('Router:'), width: 10 },
                { text: href }
            );
        } else {
            ui.span({ text: ' ', width: 10 }, { text: href });
        }
    });
    console.log('\t');
    console.log(ui.toString());
    console.log('\t');
};

module.exports = afterpack;

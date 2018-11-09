const checkUpdate = require('./check');
const chalk = require('chalk');

function getWindowWidth() {
    if (typeof process === 'object' && process.stdout && process.stdout.columns)
        return process.stdout.columns;
    return 80;
}

async function printUpdateInfo() {
    const {
        name,
        currentVersion,
        lastestVersion,
        isNeedUpdate
    } = await checkUpdate();

    if (isNeedUpdate) {
        let text = [
            `Update avaliable ${currentVersion} -> ${lastestVersion}`,
            `Run npm update ${name}@${lastestVersion} to update`
        ];

        const round = {
            topLeft: '╭',
            topRight: '╮',
            bottomRight: '╯',
            bottomLeft: '╰',
            vertical: '│',
            horizontal: '─'
        };

        let box = round;

        const maxWidth = getWindowWidth();

        const lines = [];
        let line =
            box.topLeft + box.horizontal.repeat(maxWidth - 2) + box.topRight;
        let lineOfCenter = '';
        let lineOfLast =
            box.bottomLeft +
            box.horizontal.repeat(maxWidth - 2) +
            box.bottomRight;

        lines.push(line);

        function paddingWithCode(str, len = 0, code = ' ') {
            return code.repeat(len) + str + code.repeat(len);
        }

        text.forEach(v => {
            let width = Math.trunc((maxWidth - v.length - 2) / 2);
            let str = paddingWithCode(v, width);
            if (str.length % 2 == 1) {
                str += ' ';
            }
            lineOfCenter = box.vertical + str + box.vertical;
            lines.push(lineOfCenter);
        });

        lines.push(lineOfLast);

        console.log(lines.join('\n'));
    }
}

(async () => {
    await printUpdateInfo();
})();

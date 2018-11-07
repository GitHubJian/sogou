let uuid = 1;

const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const { mock } = require('config').get('path');
const path = require('path');
const root = process.cwd();
const fs = require('fs');
const fse = require('fs-extra');
const formatify = require(path.resolve(root, 'format/formatify.js'));

router.get('/list', (ctx, next) => {});
router.get('/:id', (ctx, next) => {});
router.post('/', (ctx, next) => {
    let body = ctx.request.body;

    let { project, name, method } = body;

    let dir = path.resolve(mock, project),
        file = path.resolve(mock, project, 'a.js');
    debugger;
    try {
        fse.ensureDirSync(dir);
        // file is exists
        // read file and merge content to file
        // if not, create file
        let content = [
            `getUserById${uuid++}() {`,
            `return {`,
            `name: {`,
            `last: 'mock'`,
            `}`,
            `};`,
            `}`
        ].join('');

        if (fs.existsSync(file)) {
            let originContent = fs.readFileSync(file, { encoding: 'utf-8' });
            let startIndex = originContent.indexOf('{');
            let endIndex = originContent.lastIndexOf('}');
            originContent =
                originContent.substring(startIndex + 1, endIndex).trim() + ',';
            content = originContent + content;
        }

        content = 'module.exports = {' + content + '};';

        //写文件
        debugger;
        content = formatify(content);
        console.log(content);
        fs.writeFileSync(file, content, { encoding: 'utf-8' });

        ctx.body = '成功1111';
    } catch (e) {
        ctx.body = e;
    }
});

module.exports = router;

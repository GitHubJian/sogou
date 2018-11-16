const should = require('should');
const { isNumber } = require('./../../client/test2');

describe('Test', () => {
    it('!!!!', () => {
        let a = isNumber('111');
        should.equal(a, true, '成功');
    });
});

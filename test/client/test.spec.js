require('should');
require('mocha');

import { isNumber } from 'client/test.js';

describe('Test File', () => {
    it('Test isNumber', function() {
        console.log(11111);
        let a = isNumber('1');
        should.equal(a, true, '成功');
    });
});

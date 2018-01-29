import * as utils from '../src/utils';


QUnit.module("sdom.utils");

QUnit.test('imports', assert => {
    assert.ok(typeof utils.isEventSupport === 'function');
});

QUnit.test('utils.isEventSupport(element) - correct', assert => {
    debugger
    assert.ok(utils.isEventSupport('click'));
});

QUnit.test('utils.isEventSupport(element) - exists', assert => {
    assert.ok(!utils.isEventSupport('click2'));
});
import * as utils from '../src/utils';

test('imports', function(){
    ok(typeof utils.uid === 'function'); 
    ok(typeof utils.isEventSupport === 'function'); 
});

module("sdom.utils");
test('utils.uid(element) - equal', function(){
    var el = document.createElement('div');
    var uid1 = utils.uid(el);
    var uid2 = utils.uid(el);       
    ok(uid1 === uid2);
});

test('utils.uid(element) - diffrent', function(){
    var e1 = document.createElement('div');
    var e2 = document.createElement('div');
    var uid1 = utils.uid(e1);
    var uid2 = utils.uid(e2);       
    ok(uid1 !== uid2);
});

test('utils.isEventSupport(element) - correct', function(){
    ok(utils.isEventSupport('click'));
});

test('utils.isEventSupport(element) - exists', function(){
    ok(!utils.isEventSupport('click2'));
});
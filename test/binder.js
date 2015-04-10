import Binder from '../src/binder';
import {user} from './helper';

test('imports', function(){
    ok(typeof Binder === 'function'); 
});
function create(options, dom){
    return new Binder(options, dom);
}
var handler; 
module("sdom.binder(config, element)", {
    setup: function() {
        handler = user.setup();
    },
    teardown: function() {
        user.teardown();
        handler = null;
    }
});
test('empty', function(){
    var sdom = create({}, document.body);
    ok(typeof sdom.update === 'function');
});

test('update plain', function(){
    var sdom = create({
        title:'h1@text',
        user:{
            name:'.user .name@text',
            role:'.user .role@text'
        }
    }, document.body);
    sdom.update('title','Title');
    sdom.update('user.name','User name');
    sdom.update('user.role','User role');
    equal(handler.title.textContent, 'Title');
    equal(handler.name.textContent, 'User name');
    equal(handler.role.textContent, 'User role');
});

test('update plain - default binder (text)', function(){
    var sdom = create({
        title:'h1',
        user:{
            name:'.user .name',
            role:'.user .role'
        }
    }, document.body);
    sdom.update('title','Title');
    sdom.update('user.name','User name');
    sdom.update('user.role','User role');
    equal(handler.title.textContent, 'Title');
    equal(handler.name.textContent, 'User name');
    equal(handler.role.textContent, 'User role');
});

test('update using object', function(){
    var sdom = create({
        title:'h1',
        user:{
            name:'.user .name',
            role:'.user .role'
        }
    }, document.body);
    sdom.update({
        title:'Title',
        user:{
            name:'User name',
            role:'User role'
        }
    });
    equal(handler.title.textContent, 'Title');
    equal(handler.name.textContent, 'User name');
    equal(handler.role.textContent, 'User role');
});

test('element[class]', function(){
    var sdom = create({
        title:'h1@text'
    }, document.body);
    sdom.update('title','test-<em>class</em>');
    equal(handler.title.innerHTML, 'test-&lt;em&gt;class&lt;/em&gt;');
});

test('element[class]', function(){
    var sdom = create({
        title:'h1@class'
    }, document.body);
    sdom.update('title','test-class');
    ok(handler.title.classList.contains('test-class'));
});

test('element.dataset', function(){
    var sdom = create({
        title:'h1@dataset:test'
    }, document.body);
    sdom.update('title','some-data');
    equal(handler.title.dataset.test, 'some-data');
});

test('update incorect element.dataset', function(){
    throws(function(){
        var sdom = create({
            title:'h1@dataset'
        }, document.body);
    },'dataset without name parameter');

    throws(function(){
        var sdom = create({
            title:'h1@dataset:'
        }, document.body);
    },'dataset with empty name parameter');
});

test('update element[attribute]', function(){
    var sdom = create({
        title:'h1@attr:title'
    }, document.body);
    sdom.update('title','Some title');
    equal(handler.title.title, 'Some title');
});

test('update element@html', function(){
    var sdom = create({
        title:'h1@html'
    }, document.body);
    sdom.update('title','Some<em>title</em>');
    equal(handler.title.innerHTML, 'Some<em>title</em>');
});

test('update incorect element[attribute]', function(){
    throws(function(){
        var sdom = create({
            title:'h1@attr'
        }, document.body);
    },'attribute without name parameter');

    throws(function(){
        var sdom = create({
            title:'h1@attr:'
        }, document.body);
    },'attribute with empty name parameter');
});

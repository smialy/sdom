import Binder from '../src/binder';
import {user} from './helper';

function create(options, dom) {
    return new Binder(options, dom);
}

QUnit.module("sdom.binder(config, element)", {
    beforeEach: function() {
        this.handler = user.setup();
    },
    afterEach: function() {
        user.teardown();
        this.handler = null;
    }
});

QUnit.test('imports', function(assert) {
    assert.ok(typeof Binder === 'function');
});

QUnit.test('empty', function(assert) {
    var sdom = create({}, document.body);
    assert.ok(typeof sdom.update === 'function');
});

QUnit.test('update plain', function(assert) {
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
    assert.equal(this.handler.title.textContent, 'Title');
    assert.equal(this.handler.name.textContent, 'User name');
    assert.equal(this.handler.role.textContent, 'User role');
});

QUnit.test('update plain - default binder (text)', function(assert) {
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
    assert.equal(this.handler.title.textContent, 'Title');
    assert.equal(this.handler.name.textContent, 'User name');
    assert.equal(this.handler.role.textContent, 'User role');
});

QUnit.test('update using object', function(assert) {
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
    assert.equal(this.handler.title.textContent, 'Title');
    assert.equal(this.handler.name.textContent, 'User name');
    assert.equal(this.handler.role.textContent, 'User role');
});

QUnit.test('element[class]', function(assert) {
    var sdom = create({
        title:'h1@text'
    }, document.body);
    sdom.update('title','test-<em>class</em>');
    assert.equal(this.handler.title.innerHTML, 'test-&lt;em&gt;class&lt;/em&gt;');
});

QUnit.test('element[class]', function(assert) {
    var sdom = create({
        title:'h1@class'
    }, document.body);
    sdom.update('title','test-class');
    assert.ok(this.handler.title.classList.contains('test-class'));
});

QUnit.test('element.dataset', function(assert) {
    var sdom = create({
        title:'h1@dataset:test'
    }, document.body);
    sdom.update('title','some-data');
    assert.equal(this.handler.title.dataset.test, 'some-data');
});

QUnit.test('update incorect element.dataset', function(assert) {
    assert.throws(function(assert) {
        var sdom = create({
            title:'h1@dataset'
        }, document.body);
    },'dataset without name parameter');

    assert.throws(function(assert) {
        var sdom = create({
            title:'h1@dataset:'
        }, document.body);
    },'dataset with empty name parameter');
});

QUnit.test('update element[attribute]', function(assert) {
    var sdom = create({
        title:'h1@attr:title'
    }, document.body);
    sdom.update('title','Some title');
    assert.equal(this.handler.title.title, 'Some title');
});

QUnit.test('update element@html', function(assert) {
    var sdom = create({
        title:'h1@html'
    }, document.body);
    sdom.update('title','Some<em>title</em>');
    assert.equal(this.handler.title.innerHTML, 'Some<em>title</em>');
});

QUnit.test('update incorect element[attribute]', function(assert) {
    assert.throws(function(assert) {
        var sdom = create({
            title:'h1@attr'
        }, document.body);
    },'attribute without name parameter');

    assert.throws(function(assert) {
        var sdom = create({
            title:'h1@attr:'
        }, document.body);
    },'attribute with empty name parameter');
});

import create from '../src/create'; 
import {uid} from '../src/utils'; 

module('create(element)');

test('incorect name', function() {
    expect(10);

    equal(create(), null, 'create() === null');
    equal(create(undefined), null, 'create(undefined) === null');
    equal(create(null), null, 'create(null) === null');
    equal(create(''), null, 'create("") === null');
    equal(create('<>'), null, 'create("<>") === null');

    var $el = create('div');
    equal($el.nodeName.toLowerCase(), 'div');

    $el = create('<div>');
    equal($el.nodeName.toLowerCase(), 'div');

    $el = create('<span>');
    equal($el.nodeName.toLowerCase(), 'span');

    $el = create('<div>test</div>');
    equal($el.nodeName.toLowerCase(), 'div');
    equal($el.innerHTML, 'test');
});

test('create directly from <html>', function() {
    expect(5);

    var $el = create('<div id="element-id" class="element-class" data-test="element-dataset">');
    equal($el.id, 'element-id', 'HTMLElement.id');
    equal($el.className, 'element-class', 'HTMLElement.className');
    equal($el.classList.contains('element-class'), true, 'HTMLElement.classList');

    ok(create('<link rel="stylesheet"/>'), 'Creating a link');
    ok(create('<option>test</option>'), 'Creating a link');
});

test('set attributes', function() {
    var $div;

    $div = create('div', {
        id: 'test-id'
    });
    equal($div.id, 'test-id', 'Element[id]');

    $div = create('div', {
        for: 'test-for'
    });
    equal($div.htmlFor, 'test-for', 'Element[for]');

    $div = create('div', {
        style: 'width:100%'
    });
    equal($div.cssText, 'width:100%', 'Element[style]');

    $div = create('input', {
        value: '1'
    });
    equal($div.value, '1', 'InputElement[value]');

    $div = create('div', {
        class: 'test-class'
    });
    equal($div.className, 'test-class', 'Element[class]');

});

test('create input text/password', function() {
    var $username = create('input', {
        type: 'text',
        name: 'name',
        value: 'username'
    });
    var $password = create('input', {
        type: 'password',
        name: 'password',
        value: 'password'
    });

    equal($username.type, 'text', 'Input[type]');
    equal($username.name, 'name', 'Input[name]');
    equal($username.value, 'username', 'Input[value]');

    equal($password.type, 'password', 'PasswordInput[type]');
    equal($password.name, 'password', 'PasswordInput[name]');
    equal($password.value, 'password', 'PasswordInput[value]');
});

test('create checkbox input', function() {
    var $c1 = create('input', {
        type: 'checkbox',
        checked: false
    });
    var $c2 = create('input', {
        type: 'checkbox',
        checked: true
    });
    var $c3 = create('input', {
        type: 'checkbox',
        checked: 'checked'
    });

    ok(!$c1.checked);
    ok($c2.checked);
    ok($c3.checked);
});
test('classList', function() {
    var $el = create('div', {
        class: ''
    });

    equal($el.className, '', '{class:""}');

    $el = create('div', {
        class: 'foo'
    });
    equal($el.className, 'foo', '{class:"foo"}');

    $el = create('div', {
        class: ' foo '
    });
    equal($el.className, 'foo', '{class:" foo "}');

    $el = create('div', {
        class: 'foo bar'
    });
    equal($el.className, 'foo bar', '{class:"foo bar"}');

    $el = create('div', {
        class: ' foo bar '
    });
    equal($el.className, 'foo bar', '{class:" foo bar "}');

    $el = create('div', {
        class: 'foo foo'
    });
    equal($el.className, 'foo', '{class:"foo foo"}');

    $el = create('div', {
        class: 'foo foo'
    });
    equal($el.className, 'foo', '{class:"foo foo"}');

});

module('uid(HTMLElement)');

test('retrieve uid for html element', function() {
    var $div = create('div');
    ok(uid($div));
});
test('equal uid for one element', function() {
    var $div = create('div');
    ok(uid($div) === uid($div));
});
test('difrent uid for difrent elements', function() {
    var $div1 = create('div');
    var $div2 = create('div');
    ok(uid($div1) !== uid($div2));
});
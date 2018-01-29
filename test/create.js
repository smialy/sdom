import create from '../src/create';


QUnit.module('create(element)');

QUnit.test('incorect name', function(assert) {
    assert.expect(10);

    assert.equal(create(), null, 'create() === null');
    assert.equal(create(undefined), null, 'create(undefined) === null');
    assert.equal(create(null), null, 'create(null) === null');
    assert.equal(create(''), null, 'create("") === null');
    assert.equal(create('<>'), null, 'create("<>") === null');

    var $el = create('div');
    assert.equal($el.nodeName.toLowerCase(), 'div');

    $el = create('<div>');
    assert.equal($el.nodeName.toLowerCase(), 'div');

    $el = create('<span>');
    assert.equal($el.nodeName.toLowerCase(), 'span');

    $el = create('<div>test</div>');
    assert.equal($el.nodeName.toLowerCase(), 'div');
    assert.equal($el.innerHTML, 'test');
});

QUnit.test('create directly from <html>', function(assert) {
    assert.expect(5);

    var $el = create('<div id="element-id" class="element-class" data-test="element-dataset">');
    assert.equal($el.id, 'element-id', 'HTMLElement.id');
    assert.equal($el.className, 'element-class', 'HTMLElement.className');
    assert.equal($el.classList.contains('element-class'), true, 'HTMLElement.classList');

    assert.ok(create('<link rel="stylesheet"/>'), 'Creating a link');
    assert.ok(create('<option>test</option>'), 'Creating a link');
});

QUnit.test('set attributes', function(assert) {
    var $div;

    $div = create('div', {
        id: 'test-id'
    });
    assert.equal($div.id, 'test-id', 'Element[id]');

    $div = create('div', {
        for: 'test-for'
    });
    assert.equal($div.htmlFor, 'test-for', 'Element[for]');

    $div = create('div', {
        style: 'width:100%'
    });
    assert.equal($div.cssText, 'width:100%', 'Element[style]');

    $div = create('input', {
        value: '1'
    });
    assert.equal($div.value, '1', 'InputElement[value]');

    $div = create('div', {
        class: 'test-class'
    });
    assert.equal($div.className, 'test-class', 'Element[class]');

});

QUnit.test('create input text/password', function(assert) {
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

    assert.equal($username.type, 'text', 'Input[type]');
    assert.equal($username.name, 'name', 'Input[name]');
    assert.equal($username.value, 'username', 'Input[value]');

    assert.equal($password.type, 'password', 'PasswordInput[type]');
    assert.equal($password.name, 'password', 'PasswordInput[name]');
    assert.equal($password.value, 'password', 'PasswordInput[value]');
});

QUnit.test('create checkbox input', function(assert) {
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

    assert.ok(!$c1.checked);
    assert.ok($c2.checked);
    assert.ok($c3.checked);
});
QUnit.test('classList', function(assert) {
    debugger
    var $el = create('div', {
        class: ''
    });

    assert.equal($el.className, '', '{class:""}');

    $el = create('div', {
        class: 'foo'
    });
    assert.equal($el.className, 'foo', '{class:"foo"}');

    $el = create('div', {
        class: ' foo '
    });
    assert.equal($el.className, 'foo', '{class:" foo "}');

    $el = create('div', {
        class: 'foo bar'
    });
    assert.equal($el.className, 'foo bar', '{class:"foo bar"}');

    $el = create('div', {
        class: ' foo bar '
    });
    assert.equal($el.className, 'foo bar', '{class:" foo bar "}');

    $el = create('div', {
        class: 'foo foo'
    });
    assert.equal($el.className, 'foo', '{class:"foo foo"}');

    $el = create('div', {
        class: 'foo foo'
    });
    assert.equal($el.className, 'foo', '{class:"foo foo"}');

});

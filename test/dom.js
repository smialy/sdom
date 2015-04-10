import sdom from '../src/dom'; 

module('sdom(element)');

test('incorect name', function() {
    expect(10);

    equal(sdom(), null, 'sdom() === null');
    equal(sdom(undefined), null, 'sdom(undefined) === null');
    equal(sdom(null), null, 'sdom(null) === null');
    equal(sdom(''), null, 'sdom("") === null');
    equal(sdom('<>'), null, 'sdom("<>") === null');

    var $el = sdom('div');
    equal($el.nodeName.toLowerCase(), 'div');

    $el = sdom('<div>');
    equal($el.nodeName.toLowerCase(), 'div');

    $el = sdom('<span>');
    equal($el.nodeName.toLowerCase(), 'span');

    $el = sdom('<div>test</div>');
    equal($el.nodeName.toLowerCase(), 'div');
    equal($el.innerHTML, 'test');
});

test('create directly from <html>', function() {
    expect(5);

    var $el = sdom('<div id="element-id" class="element-class" data-test="element-dataset">');
    equal($el.id, 'element-id', 'HTMLElement.id');
    equal($el.className, 'element-class', 'HTMLElement.className');
    equal($el.classList.contains('element-class'), true, 'HTMLElement.classList');

    ok(sdom('<link rel="stylesheet"/>'), 'Creating a link');
    ok(sdom('<option>test</option>'), 'Creating a link');
});

test('set attributes', function() {
    var $div;

    $div = sdom('div', {
        id: 'test-id'
    });
    equal($div.id, 'test-id', 'Element[id]');

    $div = sdom('div', {
        for: 'test-for'
    });
    equal($div.htmlFor, 'test-for', 'Element[for]');

    $div = sdom('div', {
        style: 'width:100%'
    });
    equal($div.cssText, 'width:100%', 'Element[style]');

    $div = sdom('input', {
        value: '1'
    });
    equal($div.value, '1', 'InputElement[value]');

    $div = sdom('div', {
        class: 'test-class'
    });
    equal($div.className, 'test-class', 'Element[class]');

});

test('create input text/password', function() {
    var $username = sdom('input', {
        type: 'text',
        name: 'name',
        value: 'username'
    });
    var $password = sdom('input', {
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
    var $c1 = sdom('input', {
        type: 'checkbox',
        checked: false
    });
    var $c2 = sdom('input', {
        type: 'checkbox',
        checked: true
    });
    var $c3 = sdom('input', {
        type: 'checkbox',
        checked: 'checked'
    });

    ok(!$c1.checked);
    ok($c2.checked);
    ok($c3.checked);
});
test('classList', function() {
    var $el = sdom('div', {
        class: ''
    });

    equal($el.className, '', '{class:""}');

    $el = sdom('div', {
        class: 'foo'
    });
    equal($el.className, 'foo', '{class:"foo"}');

    $el = sdom('div', {
        class: ' foo '
    });
    equal($el.className, 'foo', '{class:" foo "}');

    $el = sdom('div', {
        class: 'foo bar'
    });
    equal($el.className, 'foo bar', '{class:"foo bar"}');

    $el = sdom('div', {
        class: ' foo bar '
    });
    equal($el.className, 'foo bar', '{class:" foo bar "}');

    $el = sdom('div', {
        class: 'foo foo'
    });
    equal($el.className, 'foo', '{class:"foo foo"}');

    $el = sdom('div', {
        class: 'foo foo'
    });
    equal($el.className, 'foo', '{class:"foo foo"}');

});

module('sdom.uid(HTMLElement)');

test('retrieve uid for html element', function() {
    var $div = sdom('div');
    ok(sdom.uid($div));
});
test('equal uid for one element', function() {
    var $div = sdom('div');
    ok(sdom.uid($div) === sdom.uid($div));
});
test('difrent uid for difrent elements', function() {
    var $div1 = sdom('div');
    var $div2 = sdom('div');
    ok(sdom.uid($div1) !== sdom.uid($div2));
});
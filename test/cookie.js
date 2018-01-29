import Cookies from '../src/cookies';


QUnit.module('cookie()', {
    beforeEach: assert => {
        $document.reset();
        Cookies.document = $document;
    },
    afterEach: assert => {
        Cookies.document = document;
    }
});

QUnit.test('cookies.set()', assert => {
    Cookies.set('test', 'value');
    assert.equal($document.cookie, 'test=value; path=/');
});

QUnit.test('cookies.set() - empty value', assert => {
    Cookies.set('name');
    assert.equal($document.cookie, 'name=; path=/');
});

QUnit.test('cookies.get() - empty value', assert => {
    assert.equal(Cookies.get(), null);
});

QUnit.test('cookies.get()', assert => {
    $document.cookie = 'test=value';
    assert.equal(Cookies.get('test'), 'value');
});

QUnit.test('cookies.remove()', assert => {
    document.cookie = 'test=value';
    Cookies.remove('test');
    assert.ok($document.$cookie.$expires.getTime() < new Date().getTime());
});

QUnit.test('cookie path', assert => {
    Cookies.set('name', 'path', {
        path: '/test'
    });
    assert.equal($document.cookie, 'name=path; path=/test');
});

QUnit.test('cookie secure', assert => {
    Cookies.set('name', '', {
        secure: true
    });
    assert.equal($document.cookie, 'name=; path=/; secure');
});

QUnit.test('cookie domain', assert => {
    Cookies.set('name', 'secure', {
        domain: 'domain.pl'
    });
    assert.equal($document.cookie, 'name=secure; domain=domain.pl; path=/');
});

QUnit.test('cookie default encode', assert => {
    Cookies.set('name', '+');
    assert.equal($document.cookie, 'name=%2B; path=/');
});

QUnit.test('cookie disable encode', assert => {
    Cookies.set('name', '+', {
        encode: false
    });
    assert.equal($document.cookie, 'name=+; path=/');
});


var cookieHelper = (assert => {
    var keys = ['path', 'expires', 'domain', 'secure'];

    function makeGroup(buff) {
        return function(name, value) {
            switch (name) {
                case 'secure':
                    value = true;
                case 'expires':
                    buff.$expires = new Date(value);
                case 'path':
                case 'domain':
                    buff[name] = value;
                    break;
                default:
                    buff.name = name;
                    buff.value = value || '';
                    break;
            }
        }
    };
    return {
        parse: function(cookie) {

            var parts = cookie.split('; '),
                part, m, buff = {};
            var group = makeGroup(buff);
            for (var i = 0; i < parts.length; i += 1) {
                part = parts[i];
                m = part.match('(.+?)=(.*)');
                if (m) {
                    group(m[1], m[2]);
                } else {
                    group(part);
                }
            }
            return buff;
        }
    };
})();


var $document = {

    set cookie(value) {
        this.$cookie = cookieHelper.parse(value);
        this._value = value;
    },
    get cookie(){
        return this._value;
    }
};
$document.reset = function(){
    this.$cookie = {};
    this._value = '';
};

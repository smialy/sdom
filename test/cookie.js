import sdom from '../src/index'; 

module('sdom.cookie()', {
    setup: function() {
        $document.reset();
        sdom.cookie.document = $document;
    },
    teardown: function() {
        sdom.cookie.document = document;
    }
});

test('cookie.set()', function() {
    sdom.cookie.set('test', 'value');
    equal($document.cookie, 'test=value; path=/');
});

test('cookie.set() - empty value', function() {
    sdom.cookie.set('name');
    equal($document.cookie, 'name=; path=/');
});

test('cookie.get() - empty value', function() {
    equal(sdom.cookie.get(), null);
});

test('cookie.get()', function() {
    $document.cookie = 'test=value';
    equal(sdom.cookie.get('test'), 'value');
});

test('cookie.remove()', function() {
    document.cookie = 'test=value';
    sdom.cookie.remove();
    ok($document.$cookie.$expires.getTime() < new Date().getTime());
});

test('cookie path', function() {
    sdom.cookie.set('name', 'path', {
        path: '/test'
    });
    equal($document.cookie, 'name=path; path=/test');
});

test('cookie secure', function() {
    sdom.cookie.set('name', '', {
        secure: true
    });
    equal($document.cookie, 'name=; path=/; secure');
});

test('cookie domain', function() {
    sdom.cookie.set('name', 'secure', {
        domain: 'domain.pl'
    });
    equal($document.cookie, 'name=secure; domain=domain.pl; path=/');
});

test('cookie default encode', function() {
    sdom.cookie.set('name', '+');
    equal($document.cookie, 'name=%2B; path=/');
});

test('cookie disable encode', function() {
    sdom.cookie.set('name', '+', {
        encode: false
    });
    equal($document.cookie, 'name=+; path=/');
});


var cookieHelper = (function() {
    var keys = ['path', 'expires', 'domain', 'secure'];
    var makeGroup = function(buff) {

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
                    buff['name'] = name;
                    buff['value'] = value || '';
                    break;
            }
        };

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


var $document = Object.create({}, {
    cookie: {
        set: function(value) {
            this.$cookie = cookieHelper.parse(value);
            this._value = value;
        },
        get: function() {
            return this._value;
        }
    }
});
$document.reset = function() {
    this.$cookie = {};
    this._value = '';
};

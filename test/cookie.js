import cookies from '../src/cookies'; 

module('cookie()', {
    setup: function() {
        $document.reset();
        cookies.document = $document;
    },
    teardown: function() {
        cookies.document = document;
    }
});

test('cookies.set()', function() {
    cookies.set('test', 'value');
    equal($document.cookie, 'test=value; path=/');
});

test('cookies.set() - empty value', function() {
    cookies.set('name');
    equal($document.cookie, 'name=; path=/');
});

test('cookies.get() - empty value', function() {
    equal(cookies.get(), null);
});

test('cookies.get()', function() {
    $document.cookie = 'test=value';
    equal(cookies.get('test'), 'value');
});

test('cookies.remove()', function() {
    document.cookie = 'test=value';
    cookies.remove();
    ok($document.$cookie.$expires.getTime() < new Date().getTime());
});

test('cookie path', function() {
    cookies.set('name', 'path', {
        path: '/test'
    });
    equal($document.cookie, 'name=path; path=/test');
});

test('cookie secure', function() {
    cookies.set('name', '', {
        secure: true
    });
    equal($document.cookie, 'name=; path=/; secure');
});

test('cookie domain', function() {
    cookies.set('name', 'secure', {
        domain: 'domain.pl'
    });
    equal($document.cookie, 'name=secure; domain=domain.pl; path=/');
});

test('cookie default encode', function() {
    cookies.set('name', '+');
    equal($document.cookie, 'name=%2B; path=/');
});

test('cookie disable encode', function() {
    cookies.set('name', '+', {
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

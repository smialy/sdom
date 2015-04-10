

var cookie = {
    document: window.document,
    set:function(name, value, options){
        cookies(name, options).set(value);
    },
    get: function(name, options) {
        return cookies(name, options).get();
    },
    remove: function(name, options) {
        return cookies(name, options).remove();
    }
};

export default cookie;

function cookies(name, options) {
    options = Object.assign({}, {
        path: '/',
        domain: false,
        expires: false,
        secure: false,
        document: cookie.document,
        encode: true
    }, options || {});
    return {
        set: function(value) {
            value = typeof value === 'undefined' ? '' : value;

            if (options.encode) {
                value = encodeURIComponent(value);
            }
            if (options.domain) {
                value += '; domain=' + options.domain;
            }
            if (options.path) {
                value += '; path=' + options.path;
            }
            if (options.expires) {
                var date = new Date();
                date.setTime(date.getTime() + options.expires * 86400000); //24 * 60 * 60 * 1000 - 1 day
                value += '; expires=' + date.toGMTString();
            }
            if (options.secure) {
                value += '; secure';
            }
            options.document.cookie = name + '=' + value;
        },
        get: function() {
            var value = options.document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
            return value ? decodeURIComponent(value[1]) : null;
        },
        remove: function() {
            cookies(name, Object.assign({}, options, {
                expires: -1
            })).set();
        }
    };
}
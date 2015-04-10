System.register([], function (_export) {
    var cookie;

    function cookies(name, options) {
        options = Object.assign({}, {
            path: "/",
            domain: false,
            expires: false,
            secure: false,
            document: cookie.document,
            encode: true
        }, options || {});
        return {
            set: function set(value) {
                value = typeof value === "undefined" ? "" : value;

                if (options.encode) {
                    value = encodeURIComponent(value);
                }
                if (options.domain) {
                    value += "; domain=" + options.domain;
                }
                if (options.path) {
                    value += "; path=" + options.path;
                }
                if (options.expires) {
                    var date = new Date();
                    date.setTime(date.getTime() + options.expires * 86400000); //24 * 60 * 60 * 1000 - 1 day
                    value += "; expires=" + date.toGMTString();
                }
                if (options.secure) {
                    value += "; secure";
                }
                options.document.cookie = name + "=" + value;
            },
            get: function get() {
                var value = options.document.cookie.match("(?:^|;)\\s*" + name + "=([^;]*)");
                return value ? decodeURIComponent(value[1]) : null;
            },
            remove: function remove() {
                cookies(name, Object.assign({}, options, {
                    expires: -1
                })).set();
            }
        };
    }
    return {
        setters: [],
        execute: function () {
            "use strict";

            cookie = {
                document: window.document,
                set: function set(name, value, options) {
                    cookies(name, options).set(value);
                },
                get: function get(name, options) {
                    return cookies(name, options).get();
                },
                remove: function remove(name, options) {
                    return cookies(name, options).remove();
                }
            };

            _export("default", cookie);
        }
    };
});
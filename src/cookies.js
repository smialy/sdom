

export default class Cookies {
    static set(name, value, options = {}){
        options = extend(options);
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
            let date = new Date();
            date.setTime(date.getTime() + options.expires * 86400000); //24 * 60 * 60 * 1000 - 1 day
            value += '; expires=' + date.toGMTString();
        }
        if (options.secure) {
            value += '; secure';
        }
        options.document.cookie = name + '=' + value;
    }
    static get(name, options = {}) {
        options = extend(options);
        let value = options.document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
        return value ? decodeURIComponent(value[1]) : null;
    }
    static remove(name, options) {
        Cookies.set(name, undefined, Object.assign({}, options, {
            expires: -1
        }));
    }
};
Cookies.document = window.document;

function extend(options){
    return Object.assign({}, {
        path: '/',
        domain: false,
        expires: false,
        secure: false,
        document: Cookies.document,
        encode: true
    }, options);
}


var UID = 0;
var eventCache = {};

export function uid(element) {
    return element.$$sdomuid || (element.$$sdomuid = UID += 1);
}

export function isEventSupport(name) {
    var el = document.createElement('div');
    if (name in eventCache) {
        return true;
    }
    var el = window;
    var ename = 'on' + name.toLowerCase();
    var isSupport = false;
    if (ename in el) {

        isSupport = true;
    } else {
        if (el.setAttribute) {
            el.setAttribute(ename, 'return;');
            isSupport = typeof el[ename] === 'function';
            el.removeAttribute(ename);
        }
    }
    eventCache[name] = isSupport;
    return isSupport;
}

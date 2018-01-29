
var eventCache = {};


export function isEventSupport(name) {
    if (!eventCache.hasOwnProperty(name)) {
        eventCache[name] = checkEvent(name);
    }
    return eventCache[name];
}

function checkEvent(name){
    let el = document.createElement('div');
    const eventName = 'on' + name.toLowerCase();
    if (eventName in el) {
        el = null;
        return true;
    }
    el.setAttribute(eventName, 'return;');
    const isSupport = typeof el[eventName] === 'function';
    el.removeAttribute(eventName);
    el = null;

    return isSupport;
}

export function fixMousewheel(name) {
    if (name === 'mousewheel') {
        if (!utils.isEventSupport('mousewheel')) {
            name = 'DOMMouseScroll';
        }
    }
    return name;
}
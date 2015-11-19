import * as utils from './utils';

var EVENTS_CACHE = {};


export function addEvent(target, type, callback, bind) {
    bind = bind || null;

    var listeners = removeEvent(target, type, callback);
    var handler = nativeTypes.indexOf(type) !== -1 ? () => callback.call(bind) : (e) => {
        callback.call(bind, new Event(e, type));
    };

    target.addEventListener(getType(type), handler, false);
    listeners.add(type, callback, handler, bind);

    return {
        remove: function() {
            removeEvent(target, type, callback);
        }
    };
}

export function onceEvent(element, type, callback, bind) {
    let handler = addEvent(element, type, function(e) {
        callback(e);
        handler.remove();
    }, bind);
    return handler;
}

export function removeEvent(target, type, callback) {
    var items = listeners.type(utils.uid(target), type);
    var listener = items.remove(callback);
    if (listener !== null) {
        target.removeEventListener(getType(type), listener.handler, false);
    }
    return items;
}
export function createEvent(element){
    var uid = utils.uid(element);
    if(!(uid in EVENTS_CACHE)){
        EVENTS_CACHE[uid] = new Events(element);
    }
    return EVENTS_CACHE[uid];
}

class Events{
    constructor(element){
        this.element = element;
    }


    add(type, callback, bind){
        addEvent(this.element, type, callback, bind);
    }

    addAll(items) {
        for (let name in items) {
            addEvent(this.element, name, items[name]);
        }
    }

    once(type, callback, bind) {
        let handler = addEvent(this.element, type, function(e) {
            callback(e);
            handler.remove();
        }, bind);
        return handler;
    }

    remove(type, callback, bind) {
        removeEvent(this.element, type, callback, bind);
    }

    removeAll(types) {
        var items = [];
        var uid = utils.uid(this.element);
        if (typeof types === 'undefined') {
            items = listeners.target(uid);
        } else {
            if (typeof types === 'string') {
                types = types.trim().split(' ').unique();
            }
            for (var t = 0; t < types.length; t += 1) {
                items.extend(listeners.type(uid, types[t]).findAll());
            }
        }
        for (var i = 0; i < items.length; i += 1) {
            removeEvent(this.element, items[i].type, items[i].callback);
        }
    }

    dispose(){
        this.removeAll();
        this.element = null;
        delete EVENTS_CACHE[utils.uid(this.element)];
    }
}


class Event{

    constructor(e, ctype){
        var target = e.target;
        while (target && target.nodeType === 3) {
            target = target.parentNode;
        }

        this.e = e;
        this.type = ctype || e.type;
        this.shift = e.shiftKey;
        this.control = e.ctrlKey;
        this.alt = e.altKey;
        this.meta = e.metaKey;
        this.target = e.target;
        this.related = e.relatedTarget;
        this.page = null;
        this.client = null;
        prepareEvent(this, e);
        Object.freeze(this);
    }

    preventDefault(){
        this.e.preventDefault();
    }

    stopPropagation(){
        this.e.stopPropagation();
    }

    stop() {
        this.preventDefault();
        this.stopPropagation();
    }
}

const CODES = {
    38: 'up',
    39: 'right',
    40: 'down',
    37: 'left',
    16: 'shift',
    17: 'control',
    18: 'alt',
    9: 'tab',
    13: 'enter',
    36: 'home',
    35: 'end',
    33: 'pageup',
    34: 'pagedown',
    45: 'insert',
    46: 'delete',
    27: 'escape',
    32: 'space',
    8: 'backspace'
};

const nativeTypes = ['unload', 'beforeunload', 'resize', 'DOMContentLoaded', 'hashchange', 'popstate', 'error', 'abort', 'scroll', 'message'];


function getType(type) {
    if (type === 'mousewheel') {
        if (!utils.isEventSupport('mousewheel')) {
            type = 'DOMMouseScroll';
        }
    }
    return type;
}

function addEvent(target, type, callback, bind) {
    bind = bind || null;

    var listeners = removeEvent(target, type, callback);
    var handler = nativeTypes.indexOf(type) !== -1 ? () => callback.call(bind) : (e) => {
        callback.call(bind, new Event(e, type));
    };

    target.addEventListener(getType(type), handler, false);
    listeners.add(type, callback, handler, bind);

    return {
        remove: function() {
            removeEvent(target, type, callback);
        }
    };
}


function removeEvent(target, type, callback) {
    var items = listeners.type(utils.uid(target), type);
    var listener = items.remove(callback);
    if (listener !== null) {
        target.removeEventListener(getType(type), listener.handler, false);
    }
    return items;
}

function prepareEvent(api, e) {
    var type = e.type;
    if (type.indexOf('key') === 0) {
        var code = e.which || e.keyCode;
        if (CODES[code]) {
            api.key = CODES[code];
        } else if (type === 'keydown' || type === 'keyup') {
            if (code > 111 && code < 124) {
                api.key = 'f' + (code - 111);
            } else if (code > 95 && code < 106) {
                api.key = code - 96;
            } else {
                api.key = String.fromCharCode(code).toLowerCase();
            }
        }
    } else if (type === 'click' || type === 'dbclick' || type.indexOf('mouse') === 0 || type === 'DOMMouseScroll' || type === 'wheel' || type === 'contextmenu') {
        var doc = (!document.compatMode || document.compatMode === 'CSS1Compat') ? document.html : document.body;
        api.page = {
            x: (e.pageX !== null) ? e.pageX : e.clientX + doc.scrollLeft,
            y: (e.pageY !== null) ? e.pageY : e.clientY + doc.scrollTop
        };
        api.client = {
            x: (e.pageX !== null) ? e.pageX - window.pageXOffset : e.clientX,
            y: (e.pageY !== null) ? e.pageY - window.pageYOffset : e.clientY
        };
        api.isRight = (e.which === 3 || e.button === 2);
        if (type === 'mouseover' || type === 'mouseout') {

        } else if (e.type === 'mousewheel' || e.type === 'DOMMouseScroll' || e.type === 'wheel') {
            api.wheel = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            if (e.axis) {
                if (e.axis === e.HORIZONTAL_AXIS) {
                    api.axis = "horizontal";
                } else {
                    api.axis = "vertical";
                }
            } else if (e.wheelDeltaX && e.wheelDeltaX === e.wheelDelta) {
                api.axis = "horizontal";
            } else {
                api.axis = "vertical";
            }
        }
    } else if (type.indexOf('touch') === 0 || type.indexOf('gesture') === 0) {
        api.touch = {
            rotation: e.rotation,
            scale: e.scale,
            target: e.targetTouches,
            changed: e.changedTouches,
            touches: e.touches,
        };
        var touches = e.touches;
        if (touches && touches[0]) {
            var touch = touches[0];
            api.touch.page = {
                x: touch.pageX,
                y: touch.pageY
            };
            api.touch.client = {
                x: touch.clientX,
                y: touch.clientY
            };
        }
    }

}

var listeners = (function() {

    var $group = {};

    return {
        target: function(uid) {
            var buff = [];
            for (var name in $group) {
                if (name.indexOf(uid) === 1) {
                    buff.extend($group[name]);
                }
            }
            return buff;
        },
        type: function(uid, type) {
            var sid = '_' + uid + '_' + type;
            if (!(sid in $group)) {
                $group[sid] = [];
            }
            return {
                findAll: function() {
                    return $group[sid].concat();
                },
                contains: function(callback) {
                    var listeners = $group[sid];
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i].callback === callback) {
                            return true;
                        }
                    }

                    return false;
                },
                find: function(callback) {

                    var listeners = $group[sid];
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i].callback === callback) {
                            return listeners[i];
                        }
                    }
                    return null;
                },
                remove: function(callback) {
                    var listeners = $group[sid];
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i].callback === callback) {
                            var tmp = listeners[i];
                            listeners.splice(i, 1);
                            return tmp;
                        }
                    }
                    return null;
                },
                add: function(type, callback, handler, bind) {
                    if (!this.contains(callback)) {
                        $group[sid].push({
                            type: type,
                            callback: callback,
                            handler: handler,
                            bind: bind
                        });
                    }
                }
            };
        }
    };
})();

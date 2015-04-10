import * as utils from './utils';

var EVENTS_CACHE = {};

export default class Events{

    static create(element){
        var uid = utils.uid(element);
        if(!(uid in EVENTS_CACHE)){
            EVENTS_CACHE[uid] = new Binder(config, element);
        }
        return EVENTS_CACHE[uid];
    }

    constructor(element){
        this.element = element;
    }


    on(type, callback, bind){
        addEvent(this.element, type, callback, bind);
    }

    ons(items) {
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

    off(type, callback, bind) {
        removeEvent(this.element, type, callback, bind);
    }

    offs(types) {
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
        this.offs();
        this.element = null;
        delete EVENTS_CACHE[utils.uid(this.element)];
    }
}

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
        callback.call(bind, customEvent(e, type));
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
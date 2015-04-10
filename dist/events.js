System.register(["./utils"], function (_export) {
    var utils, _createClass, _classCallCheck, EVENTS_CACHE, Events, nativeTypes, listeners;

    function getType(type) {
        if (type === "mousewheel") {
            if (!utils.isEventSupport("mousewheel")) {
                type = "DOMMouseScroll";
            }
        }
        return type;
    }

    function addEvent(target, type, callback, bind) {
        bind = bind || null;

        var listeners = removeEvent(target, type, callback);
        var handler = nativeTypes.indexOf(type) !== -1 ? function () {
            return callback.call(bind);
        } : function (e) {
            callback.call(bind, customEvent(e, type));
        };

        target.addEventListener(getType(type), handler, false);
        listeners.add(type, callback, handler, bind);

        return {
            remove: function remove() {
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

    return {
        setters: [function (_utils) {
            utils = _utils;
        }],
        execute: function () {
            "use strict";

            _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            EVENTS_CACHE = {};

            Events = (function () {
                function Events(element) {
                    _classCallCheck(this, Events);

                    this.element = element;
                }

                _createClass(Events, {
                    on: {
                        value: function on(type, callback, bind) {
                            addEvent(this.element, type, callback, bind);
                        }
                    },
                    ons: {
                        value: function ons(items) {
                            for (var _name in items) {
                                addEvent(this.element, _name, items[_name]);
                            }
                        }
                    },
                    once: {
                        value: function once(type, callback, bind) {
                            var handler = addEvent(this.element, type, function (e) {
                                callback(e);
                                handler.remove();
                            }, bind);
                            return handler;
                        }
                    },
                    off: {
                        value: function off(type, callback, bind) {
                            removeEvent(this.element, type, callback, bind);
                        }
                    },
                    offs: {
                        value: function offs(types) {
                            var items = [];
                            var uid = utils.uid(this.element);
                            if (typeof types === "undefined") {
                                items = listeners.target(uid);
                            } else {
                                if (typeof types === "string") {
                                    types = types.trim().split(" ").unique();
                                }
                                for (var t = 0; t < types.length; t += 1) {
                                    items.extend(listeners.type(uid, types[t]).findAll());
                                }
                            }
                            for (var i = 0; i < items.length; i += 1) {
                                removeEvent(this.element, items[i].type, items[i].callback);
                            }
                        }
                    },
                    dispose: {
                        value: function dispose() {
                            this.offs();
                            this.element = null;
                            delete EVENTS_CACHE[utils.uid(this.element)];
                        }
                    }
                }, {
                    create: {
                        value: function create(element) {
                            var uid = utils.uid(element);
                            if (!(uid in EVENTS_CACHE)) {
                                EVENTS_CACHE[uid] = new Binder(config, element);
                            }
                            return EVENTS_CACHE[uid];
                        }
                    }
                });

                return Events;
            })();

            _export("default", Events);

            nativeTypes = ["unload", "beforeunload", "resize", "DOMContentLoaded", "hashchange", "popstate", "error", "abort", "scroll", "message"];

            listeners = (function () {

                var $group = {};

                return {
                    target: function target(uid) {
                        var buff = [];
                        for (var name in $group) {
                            if (name.indexOf(uid) === 1) {
                                buff.extend($group[name]);
                            }
                        }
                        return buff;
                    },
                    type: (function (_type) {
                        var _typeWrapper = function type(_x, _x2) {
                            return _type.apply(this, arguments);
                        };

                        _typeWrapper.toString = function () {
                            return _type.toString();
                        };

                        return _typeWrapper;
                    })(function (uid, type) {
                        var sid = "_" + uid + "_" + type;
                        if (!(sid in $group)) {
                            $group[sid] = [];
                        }
                        return {
                            findAll: function findAll() {
                                return $group[sid].concat();
                            },
                            contains: function contains(callback) {
                                var listeners = $group[sid];
                                for (var i = 0; i < listeners.length; i += 1) {
                                    if (listeners[i].callback === callback) {
                                        return true;
                                    }
                                }

                                return false;
                            },
                            find: function find(callback) {

                                var listeners = $group[sid];
                                for (var i = 0; i < listeners.length; i += 1) {
                                    if (listeners[i].callback === callback) {
                                        return listeners[i];
                                    }
                                }
                                return null;
                            },
                            remove: function remove(callback) {
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
                            add: function add(type, callback, handler, bind) {
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
                    })
                };
            })();
        }
    };
});
System.register(['./create', './styles', './attrs', './cookies', './utils', './binder', './events'], function (_export) {
    'use strict';

    var create, styles, attrs, cookies, uid, Binder, addEvent, removeEvent, onceEvent, createEvent;

    _export('default', dom);

    function dom(element, attrs, context) {
        return create(element, attrs, context);
    }

    return {
        setters: [function (_create) {
            create = _create['default'];
        }, function (_styles) {
            styles = _styles['default'];
        }, function (_attrs) {
            attrs = _attrs['default'];
        }, function (_cookies) {
            cookies = _cookies['default'];
        }, function (_utils) {
            uid = _utils['default'];
        }, function (_binder) {
            Binder = _binder['default'];
        }, function (_events) {
            addEvent = _events.addEvent;
            removeEvent = _events.removeEvent;
            onceEvent = _events.onceEvent;
            createEvent = _events.createEvent;
        }],
        execute: function () {

            dom.uid = uid;
            dom.styles = styles;
            dom.attrs = attrs;
            dom.cookies = cookies;

            dom.binder = function (config, element) {
                return Binder.create(config, element);
            };
            dom.on = addEvent;
            dom.off = removeEvent;
            dom.once = onceEvent;
            dom.events = function (element) {
                return createEvent;
            };
        }
    };
});
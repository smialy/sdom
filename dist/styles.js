System.register([], function (_export) {
    var styles;

    function camelCase(txt) {
        return txt.replace(/-(.)/g, function (_, char) {
            return char.toUpperCase();
        });
    }

    return {
        setters: [],
        execute: function () {
            "use strict";

            styles = {
                set: function set(element, name, value) {
                    name = name === "float" ? "cssFloat" : camelCase(name);
                    element.style[name] = value;
                },
                get: function get(element, name) {
                    return name = name === "float" ? "cssFloat" : camelCase(name);
                },
                sets: function sets(element, items) {
                    for (var _name in items) {
                        styles.set(element, _name, items[_name]);
                    }
                }
            };

            _export("default", styles);
        }
    };
});
System.register([], function (_export) {
    var UID, eventCache;

    _export("uid", uid);

    _export("isEventSupport", isEventSupport);

    function uid(element) {
        return element.$$sdomuid || (element.$$sdomuid = UID += 1);
    }

    function isEventSupport(name) {
        var el = document.createElement("div");
        if (name in eventCache) {
            return true;
        }
        var el = window;
        var ename = "on" + name.toLowerCase();
        var isSupport = false;
        if (ename in el) {

            isSupport = true;
        } else {
            if (el.setAttribute) {
                el.setAttribute(ename, "return;");
                isSupport = typeof el[ename] === "function";
                el.removeAttribute(ename);
            }
        }
        eventCache[name] = isSupport;
        return isSupport;
    }

    return {
        setters: [],
        execute: function () {
            "use strict";

            UID = 0;
            eventCache = {};
        }
    };
});
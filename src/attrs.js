const ATTRS = {
    'class': 'className',
    'for': 'htmlFor',
    'html': 'innerHTML',
    'style': 'cssText'
};
const ATTRS_BOOL = ["autofocus", "autoplay", "checked", "compact", "controls", "declare", "defaultChecked", "defer", "disabled", "ismap", "loop", "multiple", "noresize", "noshade", "nowrap", "readOnly", "selected"];


var attr = {
    sets: function(element, attrs) {
        for (var name in attrs) {
            attr.set(element, name, attrs[name]);
        }
    },
    set: function(element, name, value) {
        //trim string
        if (typeof value === 'string') {
            value = value.trim();
        }
        switch (name) {
            case 'id':
                element.id = value;
                break;
            case 'class':
                element.className = unique(value.split(' ')).join(' ');
                break;
            case 'css':
                $attrs.style.set(name, value);
                break;
            default:
                if (name in ATTRS) {
                    name = ATTRS[name];
                } else if (ATTRS_BOOL.indexOf(name) !== -1) {
                    value = !!value;
                }
        }
        element[name] = value;
    }

};
var style = {
    set: function(element, name, value) {
        name = name === 'float' ? 'cssFloat' : camelCase(name);
        element.style[name] = value;
    },
    get: function(element, name) {
        return name = name === 'float' ? 'cssFloat' : camelCase(name);
    },
    sets: function(element, styles) {
        for (let name in styles) {
            style.set(element, name, styles[name]);
        }
    }
};

function camelCase(){

}

function unique(tab){
    var tmp = [],
        l, item;
    for (var i = 0, j = tab.length; i < j;) {
        item = tab[i++];
        if (tmp.indexOf(item) === -1) {
            tmp.push(item);
        }
    }
    return tmp;
        
}
export {
    attr,
    style
};

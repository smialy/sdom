const ATTRS = {
    'class': 'className',
    'for': 'htmlFor',
    'html': 'innerHTML',
    'style': 'cssText'
};
const ATTRS_BOOL = ["autofocus", "autoplay", "checked", "compact", "controls", "declare", "defaultChecked", "defer", "disabled", "ismap", "loop", "multiple", "noresize", "noshade", "nowrap", "readOnly", "selected"];


var attrs = {
    sets: function(element, attributes) {
        for (var name in attributes) {
            attrs.set(element, name, attributes[name]);
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
                element.style.set(name, value);
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
export default attrs;

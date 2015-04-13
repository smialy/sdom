import attrs from './attrs';


//html tag name finder
const TAG_RE = /^<(\w+)\/?>$/;

export default function create(name, attributes, context) {
    attributes = attributes || {};
    if (context === undefined || typeof context.createElement !== 'function') {
        context = document;
    }
    var element = null;
    if (typeof name === 'string') {
        name = name.trim();
        if (name.length > 1) {
            if (name.charAt(0) === '<' && name.charAt(name.length - 1) === '>') {
                if (name.length > 2) {
                    var m = TAG_RE.exec(name);
                    if (m) {
                        element = context.createElement(m[1]);
                    } else {
                        var fragment = context.createElement('div');
                        fragment.innerHTML = name;
                        element = fragment.firstChild;
                    }
                }
            } else {
                element = context.createElement(name);
            }
            if (element !== null) {
                if (attributes) {
                    attrs.sets(element, attributes);
                }
            }
        }
    }
    return element;
}
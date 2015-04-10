import Binder from './binder';
import Events from './events';
import cookie from './cookie';
import attrs from './attrs';
import styles from './styles';
import {uid} from './utils';

//html tag name finder
const TAG_RE = /^<(\w+)\/?>$/;

export default function sdom(name, attributes, context) {
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

sdom.uid = uid;
sdom.style = styles;
sdom.attr = attrs;
sdom.cookie = cookie;

sdom.binder = function(config, element){
    return Binder.create(config, element);
};

sdom.event = function(element){
    return Events.create(element);
};


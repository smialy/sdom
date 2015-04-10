import Binder from './binder';
import Events from './events';
import cookie from './cookie';
import * as $attrs from './attrs';
import {uid} from './utils';

//html tag name finder
const TAG_RE = /^<(\w+)\/?>$/;

export default function sdom(name, attrs, context) {
    attrs = attrs || {};
    if (context === undefined || typeof context.createElement !== 'function') {
        context = document;
    }
    var $dom = null;
    if (typeof name === 'string') {
        name = name.trim();
        if (name.length > 1) {
            if (name.charAt(0) === '<' && name.charAt(name.length - 1) === '>') {
                if (name.length > 2) {
                    var m = TAG_RE.exec(name);
                    if (m) {
                        $dom = context.createElement(m[1]);
                    } else {
                        var fragment = context.createElement('div');
                        fragment.innerHTML = name;
                        $dom = fragment.firstChild;
                    }
                }
            } else {
                $dom = context.createElement(name);
            }
            if ($dom !== null) {
                if (attrs) {
                    $attrs.attr.sets($dom, attrs);
                }
            }
        }
    }
    return $dom;
}

sdom.uid = uid;
sdom.style = $attrs.style;
sdom.attr = $attrs.attr;
sdom.cookie = cookie;

sdom.binder = function(config, element){
    return Binder.create(config, element);
};

sdom.event = function(element){
    return Events.create(element);
};


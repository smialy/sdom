import create from './create';
import styles from './styles';
import attrs from './attrs';
import cookies from './cookies';
import Binder from './binder';
import {on, once, listen} from './events';

export default function dom(element, attrs, context){
    return create(element, attrs, context)
}

dom.styles = styles;
dom.attrs = attrs;
dom.cookies = cookies;

dom.binder = function(config, element){
    return Binder.create(config, element);
};
dom.on = on;
dom.once = once;
dom.listen = listen;
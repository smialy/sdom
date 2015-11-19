import create from './create';
import styles from './styles';
import attrs from './attrs';
import cookies from './cookies';
import uid from './utils';
import Binder from './binder';
import {addEvent, removeEvent, onceEvent, createEvent} from './events';

export default function dom(element, attrs, context){
    return create(element, attrs, context)
}

dom.uid = uid;
dom.styles = styles;
dom.attrs = attrs;
dom.cookies = cookies;

dom.binder = function(config, element){
    return Binder.create(config, element);
};
dom.on = addEvent;
dom.off = removeEvent;
dom.once = onceEvent;
dom.events = element => createEvent

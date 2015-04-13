export {create} from './create';
export {styles} from './styles';
export {attrs} from './attrs';
export {cookie} from './cookie';
export {uid} from './utils';

import Binder from './binder';
import Events from './events';

export function binder(config, element){
    return Binder.create(config, element);
};

export function event(element){
    return Events.create(element);
};


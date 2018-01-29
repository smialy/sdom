import {RootNode, Node, MultipleNode, walker} from './nodes';
import * as $utils from './utils';


var BINDERS = new WeakMap();

export default class Binder{

    static create(config, element){
        if(!BINDERS.has(element)){
            BINDERS.set(element, new Binder(config, element));
        }
        return BINDERS.get(element);
    }

    constructor(config, element){
        this._map = {};
        this.root = new RootNode(element);
        walker(this.root, config, element);
    }

    update(data, value = null){
        if(value !== null){
            var names = data.split('.');
            var node = this.root;
            while(names.length && node){
                var name = names.shift();
                node = node.find(name);
                if(node && names.length === 0){
                    node.update(value);
                    break;
                }
            }
        }else{
            this.root.update(data);
        }
    }

    dispose(){
        this.root.dispose();
    }

}

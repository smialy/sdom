import {RootNode, Node, MultipleNode, nodeFactory} from './node';

function walk(parent, config, element){
    var node;
    Object.keys(config).forEach(name => {
        if(typeof config[name] === 'string'){ 
        node = nodeFactory(name, element, config[name]);
        parent.addChild(node);
    }else if(Array.isArray(config[name])){
        var multiple = new MultipleNode('multiple', name);
        config[name].forEach(sub => {
            node = nodeFactory(name, element, sub);
            multiple.addChild(node);
        });
        parent.addChild(multiple);
    }else{
        node = new Node('node', name);
        walk(node, config[name], element);
        parent.addChild(node);
    }
   });
}
   

export default class Binder{
    constructor(config, element){
        this._map = {};
        this.root = new RootNode(element);
        walk(this.root, config, element);
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

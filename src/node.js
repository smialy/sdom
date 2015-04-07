export class Node{
	constructor(type, name, element, options=null){
		
		this.type = type;
		this.name = name;
		this.element = element;

		this._childs = [];
	}
	addChild(node){
		this._childs.push(node);
	}

	update(data){
		this._childs.forEach(node => {
			if(typeof data[node.name] !== 'undefined'){
				node.update(data[node.name]);
			}
		});
	}
	find(name){
		for(var i = 0; i<this._childs.length;i+=1){
			if(this._childs[i].name === name){
				return this._childs[i];
			}
		}
		return null;
	}
}
export class RootNode extends Node{
	constructor(element){
		super('root', 'root', element);
	}
}

export class MultipleNode extends Node{
	update(data){
		this._childs.forEach(node => {
			node.update(data);
		});
	}	
}

class LeafNode extends Node{
	
	addChild(node){

	}
	
}

class TextNode extends LeafNode{
	constructor(name, element){
		super('text', name, element);
	}
	update(value){
		this.element.textContent = value;
	}
}

class HtmlNode extends LeafNode{
	constructor(name, element){
		super('html', name, element);
	}
	update(value){
		this.element.innerHTML = value;	
	}
}

class AttrNode extends LeafNode{
	constructor(name, element){
		super('attr', name, element);
	}
	update(value){
		this.element[this.options.name] = value;
	}
}
class DatasetNode extends LeafNode{
	constructor(name, element, setname){
		super('dataset', name, element);
		this.setname = setname;
	}
	update(value){
		this.element.dataset[this.setname] = value;
	}
}

class ClassNode extends LeafNode{
	constructor(name, element, value = null){
		super('class', name, element);
		this.value = value;
	}
	update(value){
		if(this.value){

			if(value){
				this.element.classList.add(this.value);
			}else{
				this.element.classList.remove(this.value);
			}
		}else{
			if(this.actualValue){
				this.element.classList.remove(this.actualValue);
			}
			this.actualValue = value;
			this.element.classList.add(value);
		}
	}
}

function parseConfig(text){
	var [selector, rest] = text.split('@');
	if(!rest){
		rest = 'text';
	}
	var [type, options] = rest.split(':');

	return {
		selector: selector,
		type:type,
		options: options
	};
}

var nodes = {
	text:function(name, element){
		return new TextNode(name, element);
	},
	html:function(name, element){
		return new HtmlNode(name, element);
	},
	dataset:function(name, element, options){
		return new DatasetNode(name, element, options);
	},
	'class':function(name, element, options){
		return new ClassNode(name, element, options);
	},
	attr:function(name, element, options){
		return new AttrNode(name, element, options);
	}
};

export function nodeFactory(name, element, config){
	if(typeof config === 'string'){
		config = parseConfig(config);
	}
	if(nodes[config.type]){
		var dom = element.querySelector(config.selector);
		return nodes[config.type](name, dom, config.options);
	}
	return new TextNode('name', element);

}
const ATTRS = {
    'class': 'className',
    'for': 'htmlFor',
    'html': 'innerHTML',
    'style': 'cssText'
};

const ATTRS_BOOL = [
    'autofocus',
    'autoplay',
    'checked',
    'compact',
    'controls',
    'declare',
    'defaultChecked',
    'defer',
    'disabled',
    'ismap',
    'loop',
    'multiple',
    'noresize',
    'noshade',
    'nowrap',
    'readOnly',
    'selected'
];


export default class Attrs{
    static sets(element, attributes) {
        for (let name of Object.keys(attributes)) {
            Attrs.set(element, name, attributes[name]);
        }
    }
    static set(element, name, value) {
        //trim string
        if (typeof value === 'string') {
            value = value.trim();
        }
        switch (name) {
            case 'id':
                element.id = value;
                break;
            case 'class':
                for(let name of value.split(' ')){
                    if(name){
                        element.classList.add(name);
                    }
                }
                break;
            case 'css':
                element.style[name] = value;
                break;
            default:
                if (name in ATTRS) {
                    name = ATTRS[name];
                } else if (ATTRS_BOOL.indexOf(name) !== -1) {
                    value = !!value;
                }
                element[name] = value;
        }
    }

};

var styles = {
    set: function(element, name, value) {
        name = name === 'float' ? 'cssFloat' : camelCase(name);
        element.style[name] = value;
    },
    get: function(element, name) {
        return name = name === 'float' ? 'cssFloat' : camelCase(name);
    },
    sets: function(element, items) {
        for (let name in items) {
            styles.set(element, name, items[name]);
        }
    }
};

function camelCase(txt){
    return txt.replace(/-(.)/g, function(_, char) {
        return char.toUpperCase();
    });
}

export default styles;

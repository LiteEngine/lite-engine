var componentList = {};

// lite.component
module.exports = function(name, onset) {
    var key, comp;

    name = name.toLowerCase();
    comp = componentList[name];

    // query for components
    if (arguments.length === 1) {
        return comp;
    }

    if (typeof comp !== 'undefined') {
        throw 'component named' + name + 'already defined.'
    } else {
        componentList[name] = comp = {
            onset: onset
        };
    }

    for (key in Component) {
        if (Component.hasOwnProperty(key)) {
            comp[key] = Component[key];
        }
    }
    // init
    comp._values = {};

    return comp;
}

var Component = {
    _values: null,

    set: function (entityID, key, value) {
        var values = this._values[entityID] = this._values[entityID] || {};
        values[key] = value;
        if (typeof this.onset === 'function') this.onset(entityID, key, value);
    },

    get: function (entityID, key) {
        var values = this._values[entityID];
        return typeof values !== 'undefined' ? values[key] : null;
    }
};

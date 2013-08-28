var undef;

Object.prototype.extend = function (obj) {
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'init') {
            this[key] = obj[key];
        }
    }
    if (typeof obj.init === 'function') obj.init.call(this);
};

var Component = {
    _entities: undef,
    _values: undef,

    init: function () {
        this._entities = [];
        this._values = {};
    },

    // @param callOnSet [default=true]
    set: function (entityID, key, value, callOnSet) {
        if (this._entities.indexOf(entityID) === -1) {
            this._entities.push(entityID);
            this._values[entityID] = {};

            // set default component data
            if (this.defaults) {
                for (var k in this.defaults) {
                    if (k !== key) {
                        this._values[entityID][k] = this.defaults[k];
                    }
                }
            }
        }
        this._values[entityID][key] = value;
        if (callOnSet !== false && typeof this.onset === 'function') this.onset(entityID, key, value);
    },

    get: function (entityID, key) {
        if (this._entities.indexOf(entityID) === -1) {
            return undef;
        }
        return this._values[entityID][key];
    },

    unset: function (entityID) {
        var i = this._entities.indexOf(entityID);
        if (i !== -1) {
            delete this._values[entityID];
            this._entities.splice(i, 1);
        }
    },

    _process: function () {
        if (!this.process) return;
        var len = this._entities.length, i;
        for (i = 0; i < len; ++i) {
            if (this.update) this.update(this._entities[i]);
        }
    }

    /* to implement
    
    // default values of component
    defaults: {
        key1 : value1,
        key2 : value2,
        ...
        keyN : valueN
    }
    
    update: function(entityID) {
        // do something every game tick
    }
    
    onset: function(entityID, key, value) {
        // do something every time that a value is setted
    }
    */
};

module.exports = Component;
var systemList = {},
    undefined;

// lite.system
module.exports = function(name, process, priority) {
    var key, sys;

    name = name.toLowerCase();
    sys = componentList[name];

    // query for systems
    if (arguments.length === 1) {
        return sys;
    }

    if (typeof sys !== 'undefined') {
        throw 'system named' + name + 'already defined.'
    } else {
        systemList[name] = sys = {
            process: process
        };
    }

    for (key in System) {
        if (System.hasOwnProperty(key)) {
            sys[key] = System[key];
        }
    }
    // init
    sys._entities = [];

    return sys;
}

var system = {
    _entities: null,

    add: function (entityID) {
        var ents = this._entities;
        if (ents.indexOf(entityID) !== -1) {
            ents.push(entityID);
        }
    },

    remove: function (entityID, key) {
        var ents = this._entities,
            len = ents.length,
            i = ents.indexOf(entityID);

        // remove without Array#splice
        if (i !== -1) {
            if (len === 1) {
                ents.length = 0;
            } else {
                ents[i] = ents[len - 1];
                ents.length = len - 1;
            }
        }
    },

    _processAll: function () {
        var len = this._entities.length, i;
        if (len === 0) return;
        for (i = 0; i < len; ++i) {
            if this.process(this._entities[i]);
        }
    }
};

var GUID = require('./GUID'),
    recycledIndexes = [];

module.exports = {
    create: function () {
        if (recycledIndexes.length > 0) {
            return recycledIndexes.pop();
        }
        return GUID();
    },

    define: function(nome, initFunction) {
        // future implementation...
    },

    remove: function (entityID) {
        recycledIndexes.push(entityID);
    }
};

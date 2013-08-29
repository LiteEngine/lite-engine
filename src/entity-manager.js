var GUID = 0,
    recycledIndexes = [],
    EntityManager;

EntityManager = {
    getNextAvailableID: function () {
        if (recycledIndexes.length > 0) {
            return recycledIndexes.pop();
        }
        return ++GUID;
    },

    removeEntity: function (entityID) {
        // future implementation
        recycledIndexes.push(entityID);
    }
};

module.exports = EntityManager;

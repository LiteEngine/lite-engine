var EntityManager = {
    GUID: 0,
    recycledIndexes: [],

    getNextAvailableID: function () {
        var i = recycledIndexes.pop();
        if (i) return i
        return ++GUID;
    },

    removeEntity: function (entityID) {
        // future implementation
        recycledIndexes.push(entityID);
    }
};

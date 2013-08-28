var EntityManager = {

    activeEntityIDs: [],

    getNextAvailableID: function () {
        var len = this.activeEntityIDs.length,
            i;
        // See if there is an unused id in the activeEntityIDs list
        for (i = 0; i < len; i++) {
            // If so, set that id to "true" (meaning it's in use now) and return it
            if (!this.activeEntityIDs[i]) {
                this.activeEntityIDs[i] = true;
                return i;
            }
        }

        // Otherwise, add a new entity id to the list and return its index
        this.activeEntityIDs.push(true);
        return len;
    },

    removeEntity: function (entityID) {
        // future implementation
    }
};

module.exports = EntityManager;

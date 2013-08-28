var component = require('../../src/component');

var Velocity = {
    defaults: {
        theta: 360,
        x: 0,
        y: 0
    },

    onset: function (eid, key, val) {
        if (key === 'speed') {
            this.set(eid, 'x', val, false);
            this.set(eid, 'y', val, false);
        }
    },

    update: function (eid) {
        var px = Position.get(eid, 'x'),
            py = Position.get(eid, 'y'),
            vx = this.get(eid, 'x'),
            vy = this.get(eid, 'y');

        Position.set(eid, 'x', px + vx, false);
        Position.set(eid, 'y', py + vy, false);
    }
};
Velocity.extend(component);

module.exports = Velocity;
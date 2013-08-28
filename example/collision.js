var component = require('../src/component'),
    Position = require('./position'),
    Velocity = require('./velocity');

var Collision = {
    defaults: {
        radius: 1
    },

    update: function (eid) {
        var px = Position.get(eid, 'x'),
            py = Position.get(eid, 'y'),
            vx = Velocity.get(eid, 'x'),
            vy = Velocity.get(eid, 'y'),
            radius = this.get(eid, 'radius'),
            // Check for collision with the screen edge (left and right)
            collision = false;


        if (px + radius >= game.width) {
            collision = true;
            px = game.width - radius;
        } else if (px - radius < 0) {
            collision = true;
            px = radius;
        }

        // Update position and velocity if there was a collision
        if (collision) {
            Position.set(eid, 'x', px, false);
            vx *= -1;
            Velocity.set(eid, 'x', vx, false);
        }

        // Check for collision with the screen edge (top and bottom)
        collision = false;

        if (py + radius > game.height) {
            collision = true;
            py = game.height - radius;
        } else if (py - radius < 0) {
            collision = true;
            py = radius;
        }

        // Update position and velocity if there was a collision
        if (collision) {
            Position.set(eid, 'y', py, false);
            vy *= -1;
            Velocity.set(eid, 'y', vy, false);
        }
    }
};
Collision.extend(component);

module.exports = Collision;

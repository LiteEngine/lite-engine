var lite = require('../../'),
	Position = require('./position'),
	Velocity = require('./velocity-and-moviment').velocity,
	Collision = {};

Collision.system = lite.system('collision manager', function (eid) {
	var px = Position.get(eid, 'x'),
		py = Position.get(eid, 'y'),
		vx = Velocity.get(eid, 'x'),
		vy = Velocity.get(eid, 'y'),
		radius = Collision.component.get(eid, 'radius'),
		collision = false;

	// Check for collision with the screen edge (left and right)
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
}, lite.PRIORITY.NORMAL);

Collision.component = lite.component('collision', function(eid, key, val) {
	if (key === 'collidable') {
		if (val === true) {
			Collision.system.add(eid);
		} else {
			Collision.system.remove(eid);
		}
	}
});

module.exports = Collision;

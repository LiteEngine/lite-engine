var lite = require('../../'),
	Position = require('./position'),
	Velocity, Moviment;

Velocity = lite.component('Velocity', function (eid, key, val) {
	if (key === 'speed') {
		this.set(eid, 'x', val);
		this.set(eid, 'y', val);
		if (val !== 0) {
			Moviment.add(eid);
		} else {
			Moviment.remove(eid);
		}
	}
});

Moviment = lite.system('Moviment', function (eid) {
	var px = Position.get(eid, 'x'),
		py = Position.get(eid, 'y'),
		vx = Velocity.get(eid, 'x'),
		vy = Velocity.get(eid, 'y');

	Position.set(eid, 'x', px + vx, false);
	Position.set(eid, 'y', py + vy, false);
}, lite.PRIORITY.HIGH);

module.exports = {
	velocity: Velocity,
	moviment: Moviment
};

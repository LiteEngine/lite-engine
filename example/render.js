var lite = require('../'),
	Position = require('./position'),
	Velocity = require('./velocity'),
	Collision = {},

	TWO_PI = Math.PI * 2,
	COLOR = "#CCC";

var Render = lite.component('render', function(eid, key, val) {
	if (key === 'visible') {
		if (val === true) {
			Renderer.add(eid);
		} else {
			Renderer.remove(eid);
		}
	}
});

var Renderer = lite.system('renderer', function (eid) {
	var ctx = game.ctx,
		px = Position.get(eid, 'x') | 0,
		py = Position.get(eid, 'y') | 0,
		radius = Collision.get(eid, 'radius') |0;

	ctx.save();
	ctx.beginPath();
	ctx.arc(px, py, radius, 0, TWO_PI); // draw a circle
	ctx.fillStyle = COLOR;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}, lite.PRIORITY.LOW);

module.exports = Render;

var lite = require('../../'),
	Renderer = require('./renderer');

var Render = lite.component('render', function(eid, key, val) {
	if (key === 'visible') {
		if (val === true) {
			Renderer.add(eid);
		} else {
			Renderer.remove(eid);
		}
	}
});

module.exports = Render;

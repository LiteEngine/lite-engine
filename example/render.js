var component = require('../src/component'),
    Position = require('./position'),
    Collision = require('./collision');

Render = {
    TWO_PI: 2 * Math.PI,
    COLOR: '#ccc',

    defaults: {
        visible: true
    },

    update: function (eid) {
        //if (this.get(eid, 'visible') === false) return;

        var ctx = game.ctx,
            px = Position.get(eid, 'x') | 0,
            py = Position.get(eid, 'y') | 0,
            radius = Collision.get(eid, 'radius') |0;

        ctx.save();
        ctx.beginPath();
        // draw a circle
        ctx.arc(px, py, radius, 0, this.TWO_PI);
        ctx.fillStyle = this.COLOR;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
};
Render.extend(component);

module.exports = Render;

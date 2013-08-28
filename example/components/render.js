var component = require('../../src/component');

Render = {
    TWO_PI: 2 * Math.PI,
    COLOR: '#888',

    defaults: {
        visible: true
    },

    update: function (eid) {
        //if (this.get(eid, 'visible') === false) return;

        var ctx = game.ctx,
            px = Position.get(eid, 'x'),
            py = Position.get(eid, 'y'),
            radius = Collision.get(eid, 'radius');

        ctx.beginPath();
        // draw a circle
        ctx.arc(px, py, radius, 0, this.TWO_PI);
        ctx.fillStyle = this.COLOR;
        ctx.fill();
        ctx.closePath();
        console.log(ctx, 'draw');
    }
};
Render.extend(component);

module.exports = Render;
var EntityManager = require('../src/entity-manager');

function loop() {
    Velocity._process();
    Collision._process();
    // clear game screen 
    game.ctx.clearRect(0, 0, game.width, game.height);
    Render._process();

    window.requestAnimationFrame(loop);
}

game = {
    width: null,
    height: null,
    ctx: null,

    start: function(width, heigth, ctx) {
        if (!this.initialized) {
            this.initialized = true;
            
            game.ctx = ctx;
            game.ctx.canvas.width = width;
            game.ctx.canvas.height = height;

            addEntity(32);
            loop();
        }
    }
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addEntity(diameter) {
    var newEntityID = EntityManager.getNextAvailableID(),
        px = random(diameter, game.width - diameter),
        py = random(diameter, game.height - diameter),
        speed = random(1, 10);

    Position.set(newEntityID, 'x', px);
    Position.set(newEntityID, 'y', py);
    Velocity.set(newEntityID, 'speed', speed);
    Collision.set(newEntityID, 'radius', diameter / 2);
    Render.set(newEntityID, 'visible', true);
}

module.exports = game;
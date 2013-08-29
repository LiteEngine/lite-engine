var EntityManager = require('../src/entity-manager'),
    Position = require('./position'),
    Velocity = require('./velocity'),
    Collision = require('./collision'),
    Render = require('./render'),
    stats = require('./stats');

function loop() {
    game.stats.begin();
    Moviment._processAll();
    Collision.system._processAll();
    // clear game screen 
    game.ctx.clearRect(0, 0, game.width, game.height);
    Render._processAll();
    game.stats.end();
    window.requestAnimationFrame(loop);
}

game = {
    width: null,
    height: null,
    ctx: null,

    start: function(canvas, width, height) {
        if (!this.initialized) {
            this.initialized = true;
            
            game.ctx = canvas.getContext('2d');
            game.width = canvas.width = width;
            game.height = canvas.height = height;

            addEntity(32);

            game.stats = new stats();
            document.body.appendChild( game.stats.domElement );
            loop();

            document.addEventListener('keydown', function(e) {
                if (e.keyCode === 32) addEntity(random(1,32));
            });
        }
    }
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var total = 0;
function addEntity(diameter) {
    var newEntityID = EntityManager.getNextAvailableID(),
        px = random(diameter, game.width - diameter),
        py = random(diameter, game.height - diameter),
        vx = random(1,3),
        vy = random(1,3);

    Position.set(newEntityID, 'x', px);
    Position.set(newEntityID, 'y', py);

    Velocity.set(newEntityID, 'x', vx);
    Velocity.set(newEntityID, 'y', vy);

    Collision.set(newEntityID, 'radius', diameter / 2);
    
    Render.set(newEntityID, 'visible', true);

    console.log(++total);
    return newEntityID;
}

module.exports = game;

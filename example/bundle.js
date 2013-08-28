require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../src/component":7,"./position":3,"./velocity":6}],"NZOi50":[function(require,module,exports){
var EntityManager = require('../src/entity-manager'),
    Position = require('./position'),
    Velocity = require('./velocity'),
    Collision = require('./collision'),
    Render = require('./render'),
    stats = require('./stats');

function loop() {
    game.stats.begin();
    Velocity._process();
    Collision._process();
    // clear game screen 
    game.ctx.clearRect(0, 0, game.width, game.height);
    Render._process();
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

},{"../src/entity-manager":8,"./collision":1,"./position":3,"./render":4,"./stats":5,"./velocity":6}],3:[function(require,module,exports){
var component = require('../src/component');

var Position = {
    defaults: {
        x: 0,
        y: 0
    }
};
Position.extend(component);

module.exports = Position;

},{"../src/component":7}],4:[function(require,module,exports){
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

},{"../src/component":7,"./collision":1,"./position":3}],5:[function(require,module,exports){
/** Stats
 * @repo github.com/mrdoob/stats.js
 * @author mrdoob / http://mrdoob.com/
 */
var Stats=function(){var l=Date.now(),m=l,g=0,n=Infinity,o=0,h=0,p=Infinity,q=0,r=0,s=0,f=document.createElement("div");f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
"block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
a+"px",m=b,r=0);return b},update:function(){l=this.end()}}};

module.exports = Stats;

},{}],6:[function(require,module,exports){
var component = require('../src/component'),
    Position = require('./position');

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

},{"../src/component":7,"./position":3}],7:[function(require,module,exports){
var undef;

Object.prototype.extend = function (obj) {
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'init') {
            this[key] = obj[key];
        }
    }
    if (typeof obj.init === 'function') obj.init.call(this);
};

var Component = {
    _entities: undef,
    _values: undef,

    init: function () {
        this._entities = [];
        this._values = {};
    },

    // @param callOnSet [default=true]
    set: function (entityID, key, value, callOnSet) {
        if (this._entities.indexOf(entityID) === -1) {
            this._entities.push(entityID);
            this._values[entityID] = {};

            // set default component data
            if (this.defaults) {
                for (var k in this.defaults) {
                    if (k !== key) {
                        this._values[entityID][k] = this.defaults[k];
                    }
                }
            }
        }
        this._values[entityID][key] = value;
        if (callOnSet !== false && typeof this.onset === 'function') this.onset(entityID, key, value);
    },

    get: function (entityID, key) {
        if (this._entities.indexOf(entityID) === -1) {
            return undef;
        }
        return this._values[entityID][key];
    },

    unset: function (entityID) {
        var i = this._entities.indexOf(entityID);
        if (i !== -1) {
            delete this._values[entityID];
            this._entities.splice(i, 1);
        }
    },

    _process: function () {
        if (!this.update) return;
        var len = this._entities.length, i;
        for (i = 0; i < len; ++i) {
            if (this.update) this.update(this._entities[i]);
        }
    }

    /* to implement
    
    // default values of component
    defaults: {
        key1 : value1,
        key2 : value2,
        ...
        keyN : valueN
    }
    
    update: function(entityID) {
        // do something every game tick
    }
    
    onset: function(entityID, key, value) {
        // do something every time that a value is setted
    }
    */
};

module.exports = Component;

},{}],8:[function(require,module,exports){
var EntityManager = {

    activeEntityIDs: [],

    getNextAvailableID: function () {
        var len = this.activeEntityIDs.length,
            i;
        // See if there is an unused id in the activeEntityIDs list
        for (i = 0; i < len; i++) {
            // If so, set that id to "true" (meaning it's in use now) and return it
            if (!this.activeEntityIDs[i]) {
                this.activeEntityIDs[i] = true;
                return i;
            }
        }

        // Otherwise, add a new entity id to the list and return its index
        this.activeEntityIDs.push(true);
        return len;
    },

    removeEntity: function (entityID) {
        if (entityID < this.activeEntityIDs.length) {
            position.removeDataFor(entityID);
            render.removeDataFor(entityID);
            velocity.removeDataFor(entityID);
            collision.removeDataFor(entityID);
            this.activeEntityIDs[entityID] = false;
        }
    }
};

module.exports = EntityManager;
},{}],"./game.js":[function(require,module,exports){
module.exports=require('NZOi50');
},{}]},{},[])
;
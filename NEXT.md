```javascript
/*
 * Create a Component
 */
var entId = lite.component.create('circle', {
  // default properties
  x: 0,
  y: 0,
  radius: 1
});

// another component
var entId = lite.component.create('transparent', {
  // default properties
  alpha: 1
});

/*
 * Entity Methods
 */
 // create an entity
// returns the entity id (integer) and add component "circle"
// the first parameter is an array with all initial components
var entId = lite.entity.create(['circle']);

// returns true if the entity exists
var cond = lite.entity.exists(entId);

// destroy and returns true if entity has destroyed
var cond = lite.entity.destroy(entId);

// returns all existent entities (array) 
var ents = lite.entity.select('*');

// returns all entities with the components of array
var ents = lite.entity.select(['circle', 'transparent']);

/*
 * Component Methods
 */
// first, get the component
var Transparent = lite.component.get('transparent');

// add the component to an entity
// the first parameter can be a array with many ids
Transparent.add(entId);

// change a property of entity
// the first parameter can be a array with many ids
Transparent.set(entId, 'alpha', 0.5); // 50% transparent

// returns a array with all entities that have this component
Transparent.getEntities();

// remove a component
Transparent.remove(entId);

/*
 * Systems
 */
// systems are fully automated
// you don't need add or remove entities
lite.system.create('Renderer', {

  priority: {
    update: 0,
    render: lite.PRIORITY.HIGH,
  },

  filter: {
    'circle': true
  },
  
  init: function(entityId) {
    // do something when an entity is added 
  },
  
  uninit: function(entityId) {
    // do something when an entity is removed 
  },
  
  update: function(entityId) {
    // do nothing
  },
  
  render: function(entityId) {
    var Circle = lite.component.get('circle'), 
      px = Circle.get(entityId, 'x'),
			py = Position.get(entityId, 'y'),
			radius = Collision.get(entityId, 'radius');

    // draw a circle
		ctx.save();
		ctx.beginPath();
		ctx.arc(px, py, radius, 0, 2 * Math.PI);
		ctx.fillStyle = '#FF0000';
		ctx.fill();
		ctx.closePath();
		ctx.restore();
  }

});

// get a system
var Renderer = lite.system.get('renderer');

// stop the update and render loops of the system
Renderer.disable();
// or
Renderer.enable();
// or
Renderer.toggle();

// stop the update and render loops of the system

/*
 * Time
 */
lite.time.dt // delta time

lite.time.current

lite.time.elapsed

/*
 * Library Entension
 */
 
// sample extension
lite.extension.set('globals', {
  _values: {},
  
  set: function(key, value) {
    this._values[key] = value;
  },
  
  get: function(key) {
    return this._values[key];
  }
});

var globals = lite.extension.get('globals');

globals.set('2PI', 2 * Math.PI);

```

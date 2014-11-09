```javascript
/*
 * Create a Component
 */
lite.component.create('circle', {
  // default properties
  x: 0,
  y: 0,
  radius: 1
});

// another component
lite.component.create('alpha', {
  // default properties
  value: 1
});

// or
lite.component.create('position', function() {
	var comp = new Vector();
	comp.x = 10;
	comp.y = 20;
	return comp; // returns a vector instance
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
var ents = lite.entity.select(['circle', 'alpha']);

/*
 * Component Methods
 */
// first, get the component
var Alpha = lite.component.get('alpha');

// add the component to an entity
// the first parameter can be a array with many ids
Alpha.add(entId);

// change a property of entity
// the first parameter can be a array with many ids
Alpha.set(entId, 'value', 0.5); // 50% alpha

// remove a component
Alpha.remove(entId);

/*
 * Systems
 */
// systems are fully automated
// you don't need add or remove entities
lite.system.create('Renderer', {

  priority: {
    // see below more about priority
    update: lite.system.PRIORITY.NORMAL,
    render: lite.system.PRIORITY.HIGH,
  },

  filter: {
    // see below more about the system filter 
    'circle': true,
    'position': function(entityId) {
      return true;
    }
  },
  
  init: function() {
    // do something when this system is initialized  
  },
  
  addEntity: function(entityId) {
    // do something when an entity is added 
  },
  
  removeEntity: function(entityId) {
    // do something when an entity is removed 
  },
  
  updateSystem: function() {
    // update method called before update each entity of system
  },
  
  updateEntity: function(entityId) {
    // update each entity of system
  },
  
  renderSystem: function() {
    // render method called before render each entity of system
  },
  
  renderEntity: function(entityId) {
    // render each entity of system
    var Circle = lite.component.get('circle'),
      Position = lite.component.get('position'),
      Alpha = lite.component.get('alpha'),

      pos = Position.get(entityId), // remember, Component position comp is a vector
			radius = Circle.get(entityId, 'radius'),
			alpha = 1;

		ctx.save();
		
		// Alpha is an optional component of this system
		if (Alpha.has(entityId) == true) {
		  alpha = Alpha.get(entityId).value;
		}
		
		ctx.globalAlpha = alpha;
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
  }

});

// possible system filters
/*
filter: {
  // filters are a group of conditions
  // if the entity pass on all conditions, it's added to the system

  // entities WITH component comp1
  comp1: true,

  // entities WITHOUT component comp1
  comp2: false,

  // returns `true` to the entity passes on this condition 
  comp3: function(entityId) {
    return someCondition;
  }
}
*/

// possible system priorities
/*
lite.system.PRIORITY.HIGHEST
lite.system.PRIORITY.HIGH
lite.system.PRIORITY.NORNAL
lite.system.PRIORITY.LOW
lite.system.PRIORITY.LOWEST
*/

// get a system
var Renderer = lite.system.get('renderer');

// stop the ALL update and render loops of the system
Renderer.disable();
// or
Renderer.enable();
// or
Renderer.toggle();

/*
  Engine
*/
// update all systems
lite.engine.update();
// render all systems
lite.engine.render();

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

// or
lite.extension.set('some-ext', function() {
  return new SomeExtension();
});

// extension usage
var globals = lite.extension.get('globals');

globals.set('myGlobal', 123456985);
globals.get('myGlobal'); // => 123456985

```

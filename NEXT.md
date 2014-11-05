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
    update: lite.system.PRIORITY.NORMAL,
    render: lite.system.PRIORITY.HIGH,
  },

  filter: {
    'circle': true,
    'position': function(entityId) {
      return true;
    }
  },
  
  init: function(entityId) {
    // do something when an entity is added 
  },
  
  uninit: function(entityId) {
    // do something when an entity is removed 
  },
  
  update: function(entityId) {
    // this is called before all render methods
  },
  
  render: function(entityId) {
    var Circle = lite.component.get('circle'),
      Position = lite.component.get('position'),
      Alpha = lite.component.get('alpha'),

      pos = Position.get(entityId), // remember, Component position comp is a vector
			radius = Circle.get(entityId, 'radius'),
			alpha = 1;

		ctx.save();
		
		// optional component
		if (Alpha.has(entityId) == true) {
		  alpha = Alpha.get(entityId).value;
		}
		
		ctx.globalAlpha = alpha;
		ctx.fillStyle = '#FF0000';
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
  comp1: true,

  comp2: false,

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

// stop the update and render loops of the system
Renderer.disable();
// or
Renderer.enable();
// or
Renderer.toggle();

// stop the update and render loops of the system

/*
 * Time (maybe)
 */
lite.time.delta // delta time

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

// or
lite.extension.set('math', function() {
  return SomeMathLib;
});

// extension usage
var globals = lite.extension.get('globals');

globals.set('myGlobal', 123456985);
globals.get('myGlobal'); // => 123456985

```

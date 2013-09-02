var timer = require('./timer'),
  SystemList = require('./lists').SystemList,
  Table = require('./table');

/*
// syntax
  lite.system('Renderer', {
    this.priority: lite.system.PRIORITY.NORMAL,

    config: function() {
      var viewport = lite.viewport;
      ctx.clearRect(0, 0, viewport.width, viewport.height);
    },

    process: function(eid) {
      // render entity
    }
  });
*/

// lite.system and lite.system.define

function system(name) {
  return SystemList.get(name.toLowerCase());
}

system.define = function (name, data) {
  name = name.toLowerCase();
  if (SystemList.get(name) !== null) {
    throw '[LiteEngine error] system named ' + name + ' already exists!'
  }

  SystemList.set(name, new System(data));

  return SystemList.get(name);
};

system.PRIORITY = {
  LOW: 1,
  NORMAL: 2,
  HIGH: 3
};

function System(data) {
  if (typeof data.process !== 'undefined') {
    this.config = data.config;
    this.process = data.process;
    timer.ontick(this._processAll.bind(this), data.priority, data.isRenderer);
    this._entitiesArray = [];
  }
  this._entitiesTable = new Table();
}

System.prototype = {
  add: function (entityID) {
    var entitiesTable = this._entitiesTable,
      entitiesArray = this._entitiesArray;

    if (entitiesTable.get(entityID) === null) {
      if (entitiesArray) {
        // if the system has process
        // stores the index of entity on array
        entitiesTable.set(entityID, entitiesArray.push(entityID) - 1);
      } else {
        entitiesTable.set(entityID, true);
      }
    }
  },

  remove: function (entityID) {
    var entitiesTable = this._entitiesTable,
      entitiesArray = this._entitiesArray,
      len,
      // get the index of entity on array
      i = entitiesTable.get(entityID);

      if (i !== null) {
        // remove without Array#splice
        if (entitiesArray) {
          len = entitiesArray.length;
          if (len > 1 || (i !== len - 1)) {
            entitiesArray[i] = entitiesArray[len - 1];
          }
          entitiesArray.length = len - 1;
        }
        entitiesTable.remove(entityID);
      }
  },

  _processAll: function () {
    var entities = this._entitiesArray,
      len = entities.length, i;

    if (len === 0 || ( this.config && this.config() )) return;

    for (i = 0; i < len; ++i) {
      this.process(entities[i]);
    }
  }
};

module.exports = system;

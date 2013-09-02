var GUID = require('./GUID'),
  Table = require('./table'),

  lists = require('./lists'),
  ComponentList = lists.ComponentList,
  EntityList = lists.EntityList;

// lite.component
module.exports = function (name) {
  var comp;

  name = name.toLowerCase();
  comp = ComponentList.get(name);

  if (comp === null) {
    ComponentList.set(name, new Component());
    comp = ComponentList.get(name);
  }

  return comp;
};

function Component () {
  this.values = new Table();
};

Component.prototype = {
  set: function (entityID, key, value) {
    this.values.set(entityID + " " + key, value);
  },

  get: function (entityID, key) {
    return this.values.get(entityID + " " + key);
  }
}

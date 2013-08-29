var lite = {};

lite.version = '0.2.0';

lite.EntityManager = require('./src/entity-manager');
lite.component = require('./src/component');
lite.system = require('./src/system');

lite.newEntityID = lite.EntityManager.getNextAvailableID;

// priorities
lite.PRIORITY = {
	LOW: 0,
	NORMAL: 1,
	HIGH: 2
};

// temporary viewport 
lite.viewport = {
  width: null,
  height: null
};

module.exports = lite;

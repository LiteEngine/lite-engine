var lite = {};

lite.version = '0.1.0';

lite.EntityManager = require('./src/entity-manager');
lite.component = require('./src/component');
lite.system = require('./src/system');

lite.newEntityID = lite.EntityManager.getNextAvailableID;

module.exports = lite;

var lite = require('./src/timer');

lite.version = '0.2.0';

lite.entity = require('./src/entity');
lite.component = require('./src/component');
lite.system = require('./src/system');
lite.viewport = require('./src/viewport');

// priorities
lite.PRIORITY = {
	LOW: 0,
	NORMAL: 1,
	HIGH: 2
};

module.exports = lite;

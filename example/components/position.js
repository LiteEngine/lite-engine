var component = require('../../src/component');

var Position = {
    defaults: {
        x: 0,
        y: 0
    }
};
Position.extend(component);

module.exports = Position;
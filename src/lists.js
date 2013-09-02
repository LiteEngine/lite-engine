var Table = require('./table');

module.exports = {
  EntityList: new Table(), // active entities
  ComponentList: new Table(), // defined components
  SystemList: new Table() // created systems
};

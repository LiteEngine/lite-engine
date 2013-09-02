function Table() {
  this.values = {};
};

Table.prototype = {
  length: 0,
  values: null,

  set: function(key, value) {
    var values = this.values;
    if (typeof values[key] === 'undefined') {
      this.length++;
    }
    values[key] = value;
  },

  get: function(key) {
    var values = this.values;
    return (typeof values[key] !== 'undefined' ? values[key] : null);
  },

  remove: function(key) {
    var values = this.values;
    if (typeof values[key] !== 'undefined') {
      this.length--;
    }
    delete values[key];
  },

  clear: function() {
    var values = this.values, key;
    for(key in values) {
      if (values.hasOwnProperty(key)) { 
        delete values[key];
      }
    }
    this.length = 0;
  }
};

module.exports = Table;

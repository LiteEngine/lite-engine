var lite = require('./')

Position = {
  defaults: {
    x: 0,
    y: 0
  },

  onset: function(eid, k, v) {
    console.log('set position '+ k + '[' + eid + '] = ' + v)
  }
}

Position.extend(lite.Component);

for (i = 0; i < 5; ++i) {
  Position.set(0, 'x', (Math.random() * 200) | 0 );
  var x = Position.get(0, 'x');
  console.log(x);
}

var timer = new (require('fixed-game-loop')),
  onstartFunctions = [];

module.exports = {
  start: function (options) {
    var i, l = onstartFunctions.length;
    timer.start(options.fps);

    for(var i = 0; i < l; ++i) {
      onstartFunctions[i]();
    }
  },

  onstart: function (callback) {
    onstartFunctions.push(callback);
  },

  pause: function () {
    return timer.pause();
  },

  unpause: function () {
    return timer.resume();
  },

  stop: function () {
    timer.pause();
    timer = null;
    onstartFunctions.length = 0;
  },

  ontick: function(callback, priority, isDrawRoutine) {
    if (isDrawRoutine !== true) {
      timer.ontick(callback);
    } else {
      timer.ondraw(callback);
    }
  }
};

(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Utils = Sassteroids.Utils = {};

  Utils.inherits = function (subClass, superClass) {
    var Surrogate = function () {};
    Surrogate.prototype = superClass.prototype;

    subClass.prototype = new Surrogate;
  };

  Utils.dotProduct = function (vector1, vector2) {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1];
  };

})();
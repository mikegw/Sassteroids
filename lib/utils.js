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

  var dotProduct = Utils.dotProduct = function (vect1, vect2) {
    return vect1[0] * vect2[0] + vect1[1] * vect2[1];
  };

  var scale = Utils.scale = function (vect, scalar) {
    newVect = Array(vect.length);

    for (var i = 0; i < vect.length; i++) {
      newVect[i] = vect[i] * scalar
    }

    return newVect
  };

  var addVects = Utils.addVects = function (vect1, vect2) {
    newVect = Array(vect1.length);

    for (var i = 0; i < vect1.length; i++) {
      newVect[i] = vect1[i] + vect2[i]
    }

    return newVect;
  };

  var magnitude = Utils.magnitude = function (vect) {
    return Math.sqrt(dotProduct(vect, vect));
  };

  var unitVect = Utils.unitVect = function (vect) {
    return scale(vect, 1/magnitude(vect));
  };

  var rotateVect = Utils.rotateVect = function (vect, rads) {
    var rotatedVect = Array(2);
    var rotationMatrix = [
      [Math.cos(rads), -Math.sin(rads)],
      [Math.sin(rads), Math.cos(rads)]
    ];
    for (var i = 0; i < 2; i++) {
      rotatedVect[i] = dotProd(vect, rotationMatrix[i]);
    }

    return rotatedVect;
  }

  var angle = Utils.

})();
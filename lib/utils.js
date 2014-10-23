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
    var newVect = Array(vect.length);

    for (var i = 0; i < vect.length; i++) {
      newVect[i] = vect[i] * scalar
    }

    return newVect
  };

  var addVects = Utils.addVects = function (vect1, vect2) {
    var newVect = Array(vect1.length);

    for (var i = 0; i < vect1.length; i++) {
      newVect[i] = vect1[i] + vect2[i]
    }

    return newVect;
  };

  var magnitude = Utils.magnitude = function (vect) {
    return Math.sqrt(dotProduct(vect, vect));
  };

  var unitVect = Utils.unitVect = function (vect) {
    var unitVect;
    var unity = 1;
    do {
      unitVect = scale(vect, unity / magnitude(vect));
      unity += 0.01;
    } while (magnitude(unitVect) < 1);

    return unitVect;
  };

  var rotateVect = Utils.rotateVect = function (vect, rads) {
    var rotatedVect = Array(2);
    var rotationMatrix = [
      [Math.cos(rads), -Math.sin(rads)],
      [Math.sin(rads), Math.cos(rads)]
    ];
    for (var i = 0; i < 2; i++) {
      rotatedVect[i] = dotProduct(vect, rotationMatrix[i]);
    }

    return rotatedVect;
  }

  var shortestVect = Utils.shortestVect = function(vect1, vect2, maxDimensions) {
    var shortestVect = [];
    for (var i = 0; i < 2; i++) {
      var shortestSide = vect2[i] - vect1[i];
      var vect2Alts = [
        vect2[i] - maxDimensions[i],
        vect2[i] + maxDimensions[i]
      ];

      for (var j = 0; j < vect2Alts.length; j++) {
        var side = vect2Alts[j] - vect1[i];
        if (Math.abs(side) < Math.abs(shortestSide)) shortestSide = side;
      }

      shortestVect.push(shortestSide);
    }
    return shortestVect;
  };

})();

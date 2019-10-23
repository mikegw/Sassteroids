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

  var randomColor = Utils.randomColor = function () {
    var hue = Math.floor(Math.random() * 360);
    var sat = 20 + Math.floor(Math.random() * 20);
    var lum = 60 + Math.floor(Math.random() * 20);

    return "hsl(" + hue + ", " + sat + "%, " + lum + "%)";
  };

  // options hash requires: movingObject, maxDimensions, drawLogic
  //    `drawLogic` gets passed `pos` anywhere between one and four times
  Sassteroids.Utils.drawWithWrap = function (options) {
    var pos = options.movingObject.pos;
    var radius = options.movingObject.radius;
    var maxDimensions = options.maxDimensions;
    var drawLogic = options.drawLogic;

    var planePos = [[], []];
    for (var i = 0; i < 2; i++) {
      planePos[i] = [
        pos[i] - maxDimensions[i], pos[i], pos[i] + maxDimensions[i]
      ];

      planePos[i] = planePos[i].filter(function (ord) {
        return (ord > -radius) && (ord < maxDimensions[i] + radius)
      });
    }
    var xValues = planePos[0], yValues = planePos[1];

    for (var i = 0; i < xValues.length; i++) {
      for (var j = 0; j < yValues.length; j++) {
        var posArg = [xValues[i], yValues[j]];
        drawLogic(posArg);
      }
    }
  }

})();

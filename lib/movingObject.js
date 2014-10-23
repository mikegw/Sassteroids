(function(){
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  MovingObject = Sassteroids.MovingObject = function (params) {
    this.pos = params.pos;
    this.nextPos = null;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.destroyed = false;
    this.name = params.name;
  };

  MovingObject.MAX_SIZE = 80;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var shortestVect = Sassteroids.Utils.shortestVect;

  MovingObject.prototype.draw = function (ctx, maxDimensions) {
    ctx.fillStyle = this.color;

    var xValues = [this.pos[0] - maxDimensions[0],
      this.pos[0],
      this.pos[0] + maxDimensions[0]
    ];
    var yValues = [this.pos[1] - maxDimensions[1],
      this.pos[1],
      this.pos[1] + maxDimensions[1]
    ];

    xValues = xValues.filter(function (xValue) {
      if ((xValue > -this.radius) && (xValue < maxDimensions[0] + this.radius)) {
        return true;
      } else {
        return false;
      }
    }.bind(this));

    yValues = yValues.filter(function (yValue) {
      if ((yValue > -this.radius) && (yValue < maxDimensions[1] + this.radius)) {
        return true;
      } else {
        return false;
      }
    }.bind(this));

    for (var i = 0; i < xValues.length; i++) {
      for (var j = 0; j < yValues.length; j++) {
        ctx.beginPath();

        ctx.arc(
          xValues[i],
          yValues[j],
          this.radius,
          0,
          2 * Math.PI,
          true
        );

        ctx.fill();
      }
    }

  };

  MovingObject.prototype.calculateNextPos = function (maxDimensions) {
    this.nextPos = addVects(this.pos, this.vel);
    this.wrap(maxDimensions);
  }


  MovingObject.prototype.move = function () {
    this.pos = this.nextPos;
  };

  // MovingObject.prototype.wrap = function (maxDimensions, vectArg) {
//     var vect = this.nextPos;// vectArg || this.pos;
//     for (var i = 0; i < 2; i++) {
//       if (vect[i] < -this.radius) {
//         vect[i] += ((2 * this.radius) + maxDimensions[i] +
//             (2 * MovingObject.MAX_SIZE) + 30);
//       } else if (vect[i] > this.radius + maxDimensions[i]) {
//         vect[i] -= ((2 * this.radius) + maxDimensions[i] +
//             (2 * MovingObject.MAX_SIZE) + 30);
//       }
//     }
//   };
//


  MovingObject.prototype.wrap = function (maxDimensions) {
    for (var i = 0; i < 2; i++) {
      this.nextPos[i] = (this.nextPos[i] + maxDimensions[i]) % maxDimensions[i];
    }
  };

  // MovingObject.prototype.avoid = function (that, maxDimensions) {
  //   console.log("Whoops");
  // };

  MovingObject.prototype.inCollisionWith = function (that, maxDimensions) {
    var posVector = shortestVect(this.pos, that.pos, maxDimensions);
    return (magnitude(posVector) < this.radius + that.radius);
  };

  // MovingObject.prototype.willCollideWith = function (that) {
//     var posVector = addVects(this.nextPos, scale(that.nextPos, -1));
//     return (magnitude(posVector) < this.radius + that.radius);
//   };

  MovingObject.prototype.willCollideWith = function(that, maxDimensions) {
    var posVector = shortestVect(this.nextPos, that.nextPos, maxDimensions);
    return (magnitude(posVector) < this.radius + that.radius);
  };

})();
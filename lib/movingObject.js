(function(){
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  MovingObject = Sassteroids.MovingObject = function (params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.destroyed = false;
  };

  MovingObject.MAX_SIZE = 80;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    ctx.fill();
  };


  MovingObject.prototype.move = function (maxDimensions) {
    var newPos = addVects(this.pos, this.vel);

    this.pos = newPos;
    this.wrap(maxDimensions);
  };

  MovingObject.prototype.wrap = function (maxDimensions) {
    for (var i = 0; i < 2; i++) {
      if (this.pos[i] < -this.radius) {
        this.pos[i] += ((2 * this.radius) + maxDimensions[i] +
            (2 * MovingObject.MAX_SIZE) + 10);
      } else if (this.pos[i] > this.radius + maxDimensions[i]) {
        this.pos[i] -= ((2 * this.radius) + maxDimensions[i] +
            (2 * MovingObject.MAX_SIZE) + 10);
      }
    }
  };

  MovingObject.prototype.inCollisionWith = function (that) {
    var posVector = [this.pos[0] - that.pos[0], this.pos[1] - that.pos[1]]
    return (magnitude(posVector) < this.radius + that.radius);
  };

})();
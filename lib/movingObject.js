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
    var newPos = Array(2);
    for (var i = 0; i < 2; i++) {
      newPos[i] = this.pos[i] + this.vel[i];
    }

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

    dx2 = Math.pow(this.pos[0] - that.pos[0], 2);
    dy2 = Math.pow(this.pos[1] - that.pos[1], 2);
    return (Math.sqrt(dx2 + dy2) < this.radius + that.radius);
  };

})();
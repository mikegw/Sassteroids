(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Ship = Sassteroids.Ship = function (params) {
    params.vel = [0, 0];
    params.radius = Ship.RADIUS;
    Sassteroids.MovingObject.call(this, params);

    this.image = params.image;
  }
  Sassteroids.Utils.inherits(Ship, Sassteroids.MovingObject);

  Ship.RADIUS = 29;
  Ship.SPEED = 1;

  Ship.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.pos[0] - 32, this.pos[1] - 29);
  };

  Ship.prototype.collidedWith = function (that) {
    console.log("collision!");
  };

  Ship.prototype.hit = function () {
    this.destroyed = true;
  };

  Ship.prototype.power = function (impulse) {
    for (var i = 0; i < 2; i++) {
      this.vel[i] += impulse[i];
    }
  };

  Ship.prototype.speed = function () {
    return Math.sqrt(Sassteroids.Utils.dotProduct(this.vel, this.vel));
  };

  Ship.prototype.direction = function () {
    var direction = Array(2);
    for (var i = 0; i < 2; i++) {
      direction[i] = this.vel[i] / this.speed();
    }

    return direction;
  };

})();
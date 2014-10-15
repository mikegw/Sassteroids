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

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;

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
    this.vel = addVects(this.vel, impulse);
  };

  Ship.prototype.speed = function () {
    return magnitude(this.vel);
  };

  Ship.prototype.direction = function () {
    return unitVect(this.vel);
  };

})();
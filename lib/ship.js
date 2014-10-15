(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Ship = Sassteroids.Ship = function (params) {
    params.vel = [0, 0];
    params.radius = Ship.RADIUS;
    Sassteroids.MovingObject.call(this, params);

    this.image = params.image;
    this.direction = [1, 0];
  }
  Sassteroids.Utils.inherits(Ship, Sassteroids.MovingObject);

  Ship.RADIUS = 29;
  Ship.ACCELERATION = 1;
  Ship.ROTATION_SPEED = (Math.PI * 2) / 360;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var rotateVect = Sassteroids.Utils.rotateVect;

  Ship.prototype.draw = function (ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate();
    ctx.drawImage(this.image, this.pos[0] - 32, this.pos[1] - 29);
  };

  Ship.prototype.collidedWith = function (that) {
    console.log("collision!");
  };

  Ship.prototype.hit = function () {
    this.destroyed = true;
  };

  Ship.prototype.power = function () {
    this.vel = addVects(this.vel, scale(this.dir, Ship.ACCELERATION));
  };

  Ship.prototype.turn = function (counterClockwise) {
    var angleSign;
    if (counterClockwise) {
      angleSign = 1
    } else {
      angleSign = -1
    }

    this.vel = rotateVect(this.vel, (Ship.ROTATION_SPEED * angleSign));
  };

  Ship.prototype.speed = function () {
    return magnitude(this.vel);
  };

  Ship.prototype.direction = function () {
    return unitVect(this.vel);
  };

})();
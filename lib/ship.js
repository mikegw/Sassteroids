(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Ship = Sassteroids.Ship = function (params) {
    params.vel = [0, 0];
    params.radius = Ship.RADIUS;
    Sassteroids.MovingObject.call(this, params);

    this.image = params.image;
    this.angle = 0;
  }
  Sassteroids.Utils.inherits(Ship, Sassteroids.MovingObject);

  Ship.RADIUS = 29;
  Ship.ACCEL = 0.8;
  Ship.ROTATION = (Math.PI * 5) / 360;

  var addVects = Sassteroids.Utils.addVects;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var rotateVect = Sassteroids.Utils.rotateVect;

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, -32, -32);
    ctx.restore();
  };

  Ship.prototype.collidedWith = function (that) {
    console.log("collision!");
  };

  Ship.prototype.hit = function () {
    this.destroyed = true;
  };

  Ship.prototype.power = function (forward) {
    var accelVel;
    if (forward) {
      accelVel = rotateVect([Ship.ACCEL, 0], this.angle);
    } else {
      accelVel = rotateVect([Ship.ACCEL / 1.5, 0], (this.angle - Math.PI));
    }

    this.vel = addVects(this.vel, accelVel);
  };

  Ship.prototype.turn = function (clockwise) {
    this.angle += (clockwise ? Ship.ROTATION : -Ship.ROTATION)
  };

  Ship.prototype.speed = function () {
    return magnitude(this.vel);
  };

  Ship.prototype.direction = function () {
    return unitVect(this.vel);
  };

  Ship.prototype.facing = function () {
    return rotateVect([1, 0], this.angle);
  };

})();

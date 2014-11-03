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
    this.charged = true;
  }
  Sassteroids.Utils.inherits(Ship, Sassteroids.MovingObject);

  Ship.RADIUS = 40;
  Ship.ACCEL = 0.2;
  Ship.ROTATION = (Math.PI * 10) / 360;
  Ship.RECHARGE_RATE = 25;

  var addVects = Sassteroids.Utils.addVects;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var rotateVect = Sassteroids.Utils.rotateVect;
  var scale = Sassteroids.Utils.scale;

  Ship.prototype.draw = function (ctx, screenInfo) {
    Sassteroids.Utils.drawWithWrap({
      movingObject: this,
      screenInfo: screenInfo,
      drawLogic: function (pos) {
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, -32, -32);
        ctx.restore();

        ctx.fillStyle = 'rgba(25, 200, 150, 0.1)';
        ctx.beginPath();
        ctx.arc(
          pos[0], pos[1],
          this.radius,
          0, 2 * Math.PI,
          true
        );
        ctx.fill();
      }.bind(this)
    });
  };

  Ship.prototype.fireBullet = function () {
    if (!this.charged) {
      return false;
    }

    var firingVel = rotateVect([Sassteroids.Bullet.SPEED, 0], this.angle);
    var bulletVel = addVects(this.vel, firingVel);

    this.charged = false;
    setTimeout(function () {
      this.charged = true;
    }.bind(this), Ship.RECHARGE_RATE);

    return new Sassteroids.Bullet({
      pos: this.cannonPos(),
      vel: Ship._addSpray(bulletVel)
    });
  };

  Ship._addSpray = function (bulletVel) {
    var perpVect = rotateVect(unitVect(bulletVel), Math.PI / 2);
    var sprayVel = scale(perpVect, Math.random() / 2);
    return addVects(bulletVel, sprayVel);
  };

  Ship.prototype.mass = function (isBullet) {
    if (isBullet) {
      return 10000000;
    }

    return Math.pow(this.radius, 2) / 3;
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

  Ship.prototype.cannonPos = function () {
    return addVects(this.pos, scale(this.facing(),
        Sassteroids.Ship.RADIUS - 12));
  };

  Ship.prototype.facing = function () {
    return rotateVect([1, 0], this.angle);
  };

  Ship.prototype.updateFutureVelocity = function (that, maxDimensions) {
    var isShipOnBullet = (that instanceof Sassteroids.Bullet);
    Sassteroids.MovingObject.prototype.updateFutureVelocity.call(
      this, that, maxDimensions, isShipOnBullet
    );
  };

})();

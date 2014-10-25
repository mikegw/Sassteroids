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

  MovingObject.MAX_SIZE = 120;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var shortestVect = Sassteroids.Utils.shortestVect;

  MovingObject.prototype.calculateNextPos = function (maxDimensions) {
    this.nextPos = addVects(this.pos, this.vel);
    this.wrap(maxDimensions);
  };

  MovingObject.prototype.move = function () {
    this.pos = this.nextPos;
  };

  MovingObject.prototype.wrap = function (maxDimensions) {
    for (var i = 0; i < 2; i++) {
      this.nextPos[i] = (this.nextPos[i] + maxDimensions[i]) % maxDimensions[i];
    }
  };

  MovingObject.prototype.inCollisionWith = function (that, maxDimensions) {
    var posVector = shortestVect(this.pos, that.pos, maxDimensions);
    return (magnitude(posVector) < this.radius + that.radius);
  };

  MovingObject.prototype.willCollideWith = function(that, maxDimensions) {
    var posVector = shortestVect(this.nextPos, that.nextPos, maxDimensions);
    return (magnitude(posVector) < this.radius + that.radius);
  };

  MovingObject.prototype.avoid = function (that, maxDimensions) {
    this.updateFutureVelocity(that, maxDimensions);

    this.calculateNextPos(maxDimensions);
    that.calculateNextPos(maxDimensions);

    MovingObject._handleFaultyVels([this, that], maxDimensions);
  };

  MovingObject._handleFaultyVels = function (movingObjects, maxDimensions) {
    while (movingObjects[0].willCollideWith(movingObjects[1], maxDimensions)) {
      movingObjects.forEach(function (movingObject) {
        if (movingObject instanceof Sassteroids.Bullet) {
          movingObject.destroyed = true;
          return false;
        }
      });

      movingObjects.forEach(function (movingObject) {
        movingObject.move();
        movingObject.calculateNextPos(maxDimensions);
      });
    }
  };

  MovingObject.prototype.mass = function () {
    return Math.pow(this.radius, 2);
  };

  MovingObject.prototype.updateFutureVelocity = function (that, maxDimensions, isShipOnBullet) {
    var uSpeed = magnitude(this.vel);
    var vSpeed = magnitude(that.vel);

    var perpVect = unitVect(shortestVect(this.nextPos, that.nextPos, maxDimensions));

    var ui = dotProd(this.vel, perpVect);
    var vi = dotProd(that.vel, perpVect);

    // isBullet to simulate anti-bullet ionization
    var mu = this.mass(isShipOnBullet);
    var mv = that.mass();

    var uf = ((2 * mv * vi) + (mu - mv) * ui) / (mu + mv);
    var vf = ((2 * mu * ui) + (mv - mu) * vi) / (mu + mv);

    var bounceVelU = scale(perpVect, uf);
    var bounceVelV = scale(perpVect, vf);

    var parallelVelU = addVects(this.vel, scale(perpVect, -ui));
    var parallelVelV = addVects(that.vel, scale(perpVect, -vi));
    this.vel = addVects(parallelVelU, bounceVelU);
    that.vel = addVects(parallelVelV, bounceVelV);
  };

  // Drawing logic
  MovingObject.prototype.draw = function (ctx, maxDimensions) {
    ctx.fillStyle = this.color;

    Sassteroids.Utils.drawWithWrap({
      movingObject: this,
      maxDimensions: maxDimensions,
      drawLogic: function (pos) {
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

})();

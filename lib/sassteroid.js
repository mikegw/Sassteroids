(function () {

  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }


  var Sassteroid = Sassteroids.Sassteroid = function (params) {
    params.color = Sassteroid.randomColor();
    params.radius = Sassteroid.randomRadius();
    params.vel = Sassteroid.randomVector();

    Sassteroids.MovingObject.call(this, params);
  };

  Sassteroids.Utils.inherits(Sassteroid, Sassteroids.MovingObject);

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;

  Sassteroid.randomColor = function () {
    var hue = Math.floor(Math.random() * 360);
    var sat = 20 + Math.floor(Math.random() * 20);
    var lum = 60 + Math.floor(Math.random() * 20);

    return "hsl(" + hue + ", " + sat + "%, " + lum + "%)";
  };

  Sassteroid.randomRadius = function () {
    var MAX_SIZE = Sassteroids.MovingObject.MAX_SIZE;
    return Math.floor(Math.random() * (MAX_SIZE - 20) + 20);
  };

  Sassteroid.randomVector = function () {
    var speed = 0.4 + Math.random() * 1.6;
    var x = Math.random() * speed;
    var y = Math.sqrt((speed * speed) - (x * x));
    x = ((Math.random() >= .5) ? (x * -1) : x);
    y = ((Math.random() >= .5) ? (y * -1) : y);

    return [x, y];
  };

  Sassteroid.prototype.hit = function () {
    this.destroyed = true;
  };

  Sassteroid.prototype.unmove = function () {
    newPos = Array(2);
    for (var i = 0; i < 2; i++) {
      newPos[i] = this.pos[i] - this.vel[i];
    }
    this.pos = newPos;
  };

  Sassteroid.prototype.collidedWith = function (that, maxDimensions) {
    if (that instanceof Sassteroid) {
      while (this.inCollisionWith(that)) {
        this.unmove();
        that.unmove();
      }
      this.updateVelocity(that, maxDimensions);
    }
  };

  Sassteroid.prototype.mass = function () {
    return Math.pow(this.radius, 2);
  };

  Sassteroid.prototype.updateVelocity = function (that, maxDimensions) {
    var uSpeed = magnitude(this.vel);
    var vSpeed = magnitude(that.vel);

    var perpVect = unitVect(addVects(that.pos, scale(this.pos, -1)));

    var ui = dotProd(this.vel, perpVect);
    var vi = dotProd(that.vel, perpVect);
    var mu = this.mass();
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

})();
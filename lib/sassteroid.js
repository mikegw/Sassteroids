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


  Sassteroid.randomColor = function () {
    var hue = Math.floor(Math.random() * 360);
    var sat = 20 + Math.floor(Math.random() * 20);
    var lum = 60 + Math.floor(Math.random() * 20);

    return "hsl(" + hue + ", " + sat + "%, " + lum + "%)"
  };

  Sassteroid.randomRadius = function () {
    return 20 + Math.floor(Math.random() * 80);
  };

  Sassteroid.randomVector = function () {
    var speed = 0.2 + Math.random() * 1.0;
    var x = Math.random() * speed;
    var y = Math.sqrt((speed * speed) - (x * x));
    x = ((Math.random() >= .5) ? (x * -1) : x);
    y = ((Math.random() >= .5) ? (y * -1) : y);

    return [x, y];
  };

  Sassteroid.prototype.unmove = function () {
    newPos = Array(2);
    for (var i = 0; i < 2; i++) {
      newPos[i] = this.pos[i] - this.vel[i]
    }
    this.pos = newPos
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
    return Math.PI * Math.pow(this.radius, 2);
  };

  Sassteroid.prototype.updateVelocity = function (that, maxDimensions) {
    var dotProd = Sassteroids.Utils.dotProduct;

    var perpVec = Array(2);
    var uSpeed = Math.sqrt(dotProd(this.vel, this.vel));
    var vSpeed = Math.sqrt(dotProd(that.vel, that.vel));

    var posVector = Array(2);
    for (var i = 0; i < 2; i++) {
      posVector[i] = that.pos[i] - this.pos[i];
    }

    var posVectorMagnitude = Math.sqrt(dotProd(posVector, posVector));
    var perpVec = Array(2);
    for (var i = 0; i < 2; i++) {
      perpVec[i] = posVector[i] / posVectorMagnitude;
    }

    var ui = dotProd(this.vel, perpVec);
    var vi = dotProd(that.vel, perpVec);

    var mu = this.mass();
    var mv = that.mass();

    var bounceVectoru = [];
    var bounceVectorv = [];
    for (var i = 0; i < 2; i++) {
      var uf = ((2 * mv * vi) + (mu - mv) * ui) / (mu + mv)
      bounceVectoru.push(uf * perpVec[i]);

      var vf = ((2 * mu * ui) + (mv - mu) * vi) / (mu + mv)
      bounceVectorv.push(vf * perpVec[i])
    }

    var newVelu = Array(2);
    var newVelv = Array(2);
    for (var i = 0; i < 2; i++) {
      newVelu[i] = this.vel[i] - (ui * perpVec[i]) + bounceVectoru[i];
      newVelv[i] = that.vel[i] - (vi * perpVec[i]) + bounceVectorv[i];
    }

    this.vel = newVelu;
    that.vel = newVelv;
  };


})();
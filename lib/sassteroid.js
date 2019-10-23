(function () {

  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Sassteroid = Sassteroids.Sassteroid = function (params) {
    params.color = randomColor();
    params.radius = Sassteroid.randomRadius();
    params.vel = Sassteroid.randomVector();

    Sassteroids.MovingObject.call(this, params);
    Sassteroid.count += 1;
  };
  Sassteroids.Utils.inherits(Sassteroid, Sassteroids.MovingObject);

  Sassteroid.count = 0;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var shortestVect = Sassteroids.Utils.shortestVect;
  var randomColor = Sassteroids.Utils.randomColor;

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

})();

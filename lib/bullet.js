(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Bullet = Sassteroids.Bullet = function (params) {
    params.radius = Bullet.RADIUS;
    params.color = Bullet.COLOR;

    Sassteroids.MovingObject.call(this, params);
  };
  Sassteroids.Utils.inherits(Bullet, Sassteroids.MovingObject);

  Bullet.RADIUS = 2;
  Bullet.COLOR = "#33DD00";
  Bullet.SPEED = 1;

  Bullet.prototype.collidedWith = function (that) {
    if (!(that instanceof Bullet)) {
      that.hit();
      this.destroyed = true;
    }
  };

})();
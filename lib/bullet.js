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
  Bullet.SPEED = 5;

  Bullet.prototype.collidedWith = function (that) {
    if (!this.destroyed && !(that instanceof Bullet)) {
      that.hit();
      this.destroyed = true;
    }
  };

  Bullet.prototype.wrap = function (maxDimensions) {
    var nowrapPos = this.nextPos.slice();
    Sassteroids.MovingObject.prototype.wrap.call(this, maxDimensions);

    console.log(nowrapPos, this.nextPos);
    if (this.nextPos[0] !== nowrapPos[0] || this.nextPos[1] !== nowrapPos[1]) {
      this.destroyed = true;
    }
  };

})();

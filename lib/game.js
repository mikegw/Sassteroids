(function () {

  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Game = Sassteroids.Game = function () {
    this.addSassteroids();
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;

  Game.NUM_SASSTEROIDS = 16;

  Game.prototype.addSassteroids = function () {
    this.sassteroids = [];
    while (this.sassteroids.length < Game.NUM_SASSTEROIDS) {
      var x = Math.random() * Game.DIM_X;
      var y = Math.random() * Game.DIM_Y;
      var sassteroid = new Sassteroids.Sassteroid({
        pos: [x, y]
      });
      var inCollision = false;
      for (var i = 0; i < this.sassteroids.length; i++) {
        if (sassteroid.inCollisionWith(this.sassteroids[i])) {
          inCollision = true;
        }
      }

      if (!inCollision) {
        this.sassteroids.push(sassteroid);
      }
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    for (var i = 0; i < this.sassteroids.length; i++) {
      this.sassteroids[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.sassteroids.length; i++) {
      this.sassteroids[i].move([Game.DIM_X, Game.DIM_Y]);
    }
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.sassteroids.length -1; i++) {
      for (var j = i+1; j < this.sassteroids.length; j++) {
        if (this.sassteroids[i].inCollisionWith(this.sassteroids[j])) {
          var s1 = this.sassteroids[i];
          var s2 = this.sassteroids[j];
          s1.collidedWith(s2, [Game.DIM_X, Game.DIM_Y]);
        }
      }
    }
  };

})();
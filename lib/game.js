(function () {

  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Game = Sassteroids.Game = function (shipImage) {
    this.addSassteroids();
    this.bullets = [];
    this.allowsBullets = true;
    this.ship = new Sassteroids.Ship({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      image: shipImage
    });
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;

  Game.NUM_SASSTEROIDS = 30;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;

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

  Game.prototype.fireBullet = function () {
    if (!game.allowsBullets) {
      return false;
    }

    var pos = addVects(this.ship.pos, scale(this.ship.direction(),
        Sassteroids.Ship.RADIUS + 4));

    var bulletSpeed = this.ship.speed() + Sassteroids.Bullet.SPEED;
    var vel = scale(this.ship.direction(), bulletSpeed);

    this.bullets.push(new Sassteroids.Bullet({
      pos: pos,
      vel: vel
    }));

    game.allowsBullets = false;

    game = this;
    setTimeout(function () {
      game.allowsBullets = true;
    }, 500);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move([Game.DIM_X, Game.DIM_Y]);
    }
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();

    for (var i = 0; i < allObjects.length - 1; i++) {
      for (var j = i + 1; j < allObjects.length; j++) {
        if (allObjects[i].inCollisionWith(allObjects[j])) {
          var s1 = allObjects[i];
          var s2 = allObjects[j];
          s1.collidedWith(s2, [Game.DIM_X, Game.DIM_Y]);
        }
      }
    }
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(this.bullets, this.sassteroids);
  };

  Game.prototype.filter = function () {
    var filteredSassteroids = this.sassteroids.filter(function (sassteroid) {
      return !sassteroid.destroyed;
    });
    var filteredBullets = this.bullets.filter(function (bullet) {
      return !bullet.destroyed;
    });

    this.sassteroids = filteredSassteroids;
    this.bullets = filteredBullets;
  };

})();
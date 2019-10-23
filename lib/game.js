(function () {

  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var Game = Sassteroids.Game = function (shipImage) {
    this.addSassteroids();
    this.bullets = [];
    this.ship = new Sassteroids.Ship({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      image: shipImage
    });
    this.hud = new Sassteroids.HUD({
      game: this
    });
    this.startTime = Date.now();
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.DIMENSIONS = function () { return [Game.DIM_X, Game.DIM_Y]; };

  Game.NUM_SASSTEROIDS = 10;
  Game.MAX_SPEED = 20;

  var addVects = Sassteroids.Utils.addVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var rotateVect = Sassteroids.Utils.rotateVect;

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
        if (sassteroid.inCollisionWith(this.sassteroids[i], Game.DIMENSIONS())) {
          inCollision = true;
        }
      }

      if (!inCollision) {
        this.sassteroids.push(sassteroid);
      }
    }
  };

  Game.prototype.isOver = function () {
    return this.ship.speed() > Game.MAX_SPEED;
  };

  Game.prototype.fireBullet = function () {
    if (this.ship.charged) {
      this.bullets.push(this.ship.fireBullet());
    };
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    allObjects = this.allObjects();
    for (var i = 0; i < this.allObjects().length; i++) {
      allObjects[i].draw(ctx, Game.DIMENSIONS());
    }
    this.hud.draw(ctx, Game.DIMENSIONS());
  };

  Game.prototype.moveObjects = function () {
    allObjects = this.allObjects();
    for (var i = 0; i < this.allObjects().length; i++) {
      allObjects[i].move();
    }
  };

  Game.prototype.FutureCollisions = function () {
    var allObjects = this.allObjects().filter(function (movingObject) {
      return !movingObject.phased && !movingObject.destroyed;
    });

    for (var i = 0; i < allObjects.length - 1; i++) {
      for (var j = i + 1; j < allObjects.length; j++) {
        if (allObjects[i].willCollideWith(allObjects[j], Game.DIMENSIONS())) {
          var s1 = allObjects[i];
          var s2 = allObjects[j];

          s1.avoid(s2, Game.DIMENSIONS());
          return true;
        }
      }
    }
    return false;
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

  Game.prototype.calculateNextState = function () {
    var allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
       allObjects[i].calculateNextPos(Game.DIMENSIONS());
    }
  };

  Game.prototype.wind = function () {
    //
    this.calculateNextState(Game.DIMENSIONS());
    var cols = 0;
    while (this.FutureCollisions()) {
      cols += 1
      // if (cols > Game.NUM_SASSTEROIDS * 100) {
      //   debugger;
      // }
    } //loops until no future collisions
    this.moveObjects();
  }

})();

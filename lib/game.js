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
  };

  Game.SCREEN_X = 800;
  Game.SCREEN_Y = 800;
  
  Game.DIM_X = 1200;
  Game.DIM_Y = 1200;
  
  Game.SCREEN_POS_X = 200;
  Game.SCREEN_POS_Y = 200;
  
  Game.PADDING = 50;
  
  Game.SCREEN_DIMENSIONS = function () { return [Game.SCREEN_X, Game.SCREEN_Y]; };
  Game.DIMENSIONS = function () { return [Game.DIM_X, Game.DIM_Y]; };
  Game.SCREEN_POS = function () { return [Game.SCREEN_POS_X, Game.SCREEN_POS_Y]};
  
  Game.SCREEN_INFO = function () { 
    return {
      screenDimensions: Game.SCREEN_DIMENSIONS(),
      gameDimensions: Game.DIMENSIONS(),
      screenPos: Game.SCREEN_POS()
    };
  };

  Game.NUM_SASSTEROIDS = 10;

  var addVects = Sassteroids.Utils.addVects;
  var subtractVects = Sassteroids.Utils.subtractVects;
  var scale = Sassteroids.Utils.scale;
  var dotProd = Sassteroids.Utils.dotProduct;
  var magnitude = Sassteroids.Utils.magnitude;
  var unitVect = Sassteroids.Utils.unitVect;
  var rotateVect = Sassteroids.Utils.rotateVect;
  var shortestVect = Sassteroids.Utils.shortestVect;

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

  Game.prototype.fireBullet = function () {
    if (this.ship.charged) {
      this.bullets.push(this.ship.fireBullet());
    };
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    allObjects = this.allObjects();
    for (var i = 0; i < this.allObjects().length; i++) {
      allObjects[i].draw(ctx, Game.SCREEN_INFO());
    }
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
  
  Game.prototype.updateScreenPos = function () {
    var screenPos = Game.SCREEN_POS();
    var shipPos = this.ship.pos;
    
    var distFromEdge = shortestVect(screenPos, shipPos, Game.SCREEN_DIMENSIONS());
    
    if(distFromEdge[0] < Game.PADDING || distFromEdge[1] < Game.PADDING) {
      this.moveScreen()
    }
    
  };
  
  Game.prototype.moveScreen = function () {
    this.
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
    this.updateScreenPos();
  }

})();

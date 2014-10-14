(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var GameView = Sassteroids.GameView = function (canvasEl, shipImage) {
    this.ctx = canvasEl.getContext("2d");
    this.game = new Sassteroids.Game(shipImage);
    canvasEl.width = Sassteroids.Game.DIM_X;
    canvasEl.height = Sassteroids.Game.DIM_Y;
  };

  GameView.prototype.start = function () {
    var game = this.game;
    var ctx = this.ctx;
    var keyHandlers = this.bindKeyHandlers();
    setInterval(function () {
      keyHandlers();
      game.moveObjects();
      game.draw(ctx);
      game.checkCollisions();
      game.filter();
    }, 30);
  };

  GameView.prototype.bindKeyHandlers = function () {
    game = this.game;
    ship = game.ship;
    var _keyHandlers = function () {
      if (key.isPressed("W")){
        ship.power([0, -Sassteroids.Ship.SPEED]);
      }
      if (key.isPressed("A")) {
        ship.power([-Sassteroids.Ship.SPEED, 0]);
      }
      if (key.isPressed("S")) {
        ship.power([0, Sassteroids.Ship.SPEED]);
      }
      if (key.isPressed("D")) {
        ship.power([Sassteroids.Ship.SPEED, 0]);
      }
      key("space", game.fireBullet.bind(game))
    };

    return _keyHandlers;
  };

})();
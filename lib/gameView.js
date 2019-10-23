(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var GameView = Sassteroids.GameView = function (canvasEl, shipImage) {
    Sassteroids.Game.DIM_X = canvasEl.width;
    Sassteroids.Game.DIM_Y = canvasEl.height;

    this.ctx = canvasEl.getContext("2d");
    this.game = new Sassteroids.Game(shipImage);
  };

  GameView.prototype.start = function () {
    var game = this.game;
    var ctx = this.ctx;
    var keyHandlers = this.bindKeyHandlers();
    var loop = function () {
      keyHandlers();
      game.draw(ctx);
      if (!game.isOver()) {
        game.wind();
        game.filter();
        setTimeout(loop, 20);
      }
    }
    loop();
  };

  GameView.prototype.bindKeyHandlers = function () {
    game = this.game;
    ship = game.ship;
    var _keyHandlers = function () {
      if (key.isPressed("W")){
        ship.power(true);
      }
      if (key.isPressed("A")) {
        ship.turn(false);
      }
      if (key.isPressed("D")) {
        ship.turn(true);
      }
      if (key.isPressed("S")) {
        ship.power(false);
      }
      if (key.isPressed("space")) {
        game.fireBullet();
      }
    };

    return _keyHandlers;
  };

})();

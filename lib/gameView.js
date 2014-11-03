(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var GameView = Sassteroids.GameView = function (canvasEl, shipImage) {
    Sassteroids.Game.SCREEN_X = canvasEl.width;
    Sassteroids.Game.SCREEN_Y = canvasEl.height;
    Sassteroids.Game.DIM_X = canvasEl.width * 2;
    Sassteroids.Game.DIM_Y = canvasEl.height * 2;
    Sassteroids.Game.SCREEN_POS_X = canvasEl.width / 2;
    Sassteroids.Game.SCREEN_POS_Y = canvasEl.height / 2;
    

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
      game.wind();
      game.filter();
      setTimeout(loop, 20);
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

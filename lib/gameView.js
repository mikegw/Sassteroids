(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var GameView = Sassteroids.GameView = function (canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    this.game = new Sassteroids.Game();
    canvasEl.width = Sassteroids.Game.DIM_X;
    canvasEl.height = Sassteroids.Game.DIM_Y;
  }

  GameView.prototype.start = function () {
    var game = this.game;
    var ctx = this.ctx;
    setInterval(function () {
      game.moveObjects();
      game.draw(ctx);
      game.checkCollisions();
    }, 20);
  };

})();
(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var HUD = Sassteroids.HUD = function (params) {
    this.game = params.game;
    this.color = Sassteroids.Utils.randomColor();
  };

  HUD.prototype.draw = function (ctx, dimensions) {
    if (this.game.isOver()) {
      this.drawGameOver(ctx, dimensions);
    }
  };

  HUD.prototype.drawGameOver = function (ctx, dimensions) {
    ctx.font = '48px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.color;
    ctx.fillText('Game Over', dimensions[0] / 2, dimensions[1] / 2);
  }

})();

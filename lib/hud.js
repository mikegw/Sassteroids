(function () {
  if (typeof Sassteroids === "undefined") {
    window.Sassteroids = {};
  }

  var HUD = Sassteroids.HUD = function (params) {
    this.game = params.game;
    this.color = Sassteroids.Utils.randomColor();
  };

  HUD.prototype.draw = function (ctx, dimensions) {
    this.drawStats(ctx);

    if (this.game.isOver) {
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

  HUD.prototype.drawStats = function (ctx) {
    ctx.font = '20px sans-serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = this.color;
    ctx.fillText("Speed:", 10, 10);
    ctx.fillText(this.speedStat(), 90, 10);
    ctx.fillText("Time:", 10, 40);
    ctx.fillText(this.timeStat(), 90, 40);
  };

  HUD.prototype.speedStat = function () {
    return this.game.ship.speed().toFixed(2);
  };

  HUD.prototype.timeStat = function () {
    return ((Date.now() - this.game.startTime) / 1000).toFixed(2);
  };

})();

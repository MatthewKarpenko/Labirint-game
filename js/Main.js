let main;

let { Container, autoDetectRenderer, Graphics, TextStyle } = PIXI;

function Main() {
  this.stage = new Graphics();
  this.stage.beginFill(0xffffff);
  this.stage.lineStyle(0, 0x000000, 1);
  this.stage.drawRect(0, 0, 900, 430);
  this.stage.endFill();
  this.app = autoDetectRenderer(900, 430);

  this.textStyles = new TextStyle({
    letterSpacing: 2,
    lineHeight: 3
  });

  this.labirint = new Labirint(this.stage);
  this.startPlayContainer = new StartPlaying(this.textStyles, this.stage);
  this.gameStateContainer = new GameState(this.textStyles, this.stage);
  this.timer = new Timer();

  this.startPlayContainer.playButton.click = this.startPlaying.bind(this);

  this.stage.addChild(this.startPlayContainer);

  document.body.appendChild(this.app.view);
  this.app.render(this.stage);
}

Main.prototype.startPlaying = function() {
  this.stage.removeChild(this.startPlayContainer);
  this.stage.addChild(this.labirint);
  this.timer.startTimer();
  this.animate();
};

Main.prototype.animate = function() {
  if (this.labirint.exit == false) {
    requestAnimationFrame(this.animate.bind(this));
    this.labirint.play();
    this.app.render(this.stage);
  } else {
    this.playerWin();
  }
};

Main.prototype.playerWin = function() {
  this.stage.addChild(this.gameStateContainer);
  this.gameStateContainer.restartButton.click = this.restartGame.bind(this);
  this.timer.stopTimer();
  this.gameStateContainer.timeText.text = 'Time: ' + this.timer.finalTime;
  this.stage.removeChild(this.labirint);
  this.app.render(this.stage);
};

Main.prototype.restartGame = function() {
  this.timer.clearTimer();
  this.timer.startTimer();
  this.labirint.character.x = 15;
  this.labirint.character.y = 340;
  this.labirint.exit = false;
  this.stage.removeChild(this.gameStateContainer);
  this.stage.addChild(this.labirint);
  this.animate();
};

function init() {
  main = new Main();
}

init();

let main;

let { Container, autoDetectRenderer, Graphics, TextStyle } = PIXI;

function Main() {
  this.stage = new Graphics();
  this.stage.beginFill(0xFFFFFF);
  this.stage.lineStyle(4,0x000000, 1)
  this.stage.drawRect(0, 0, 900, 430);
  this.stage.endFill();
  this.app = autoDetectRenderer(900, 430);

  this.textStyles = new TextStyle({
    letterSpacing: 2,
    lineHeight: 3
  })

  this.labirint = new Labirint(this.stage);
  this.startPlayContainer = new StartPlaying(this.textStyles);
  this.gameStateContainer = new GameState(this.textStyles);

  this.stage.addChild(
    this.startPlayContainer,
    this.labirint,
    this.gameStateContainer
    );
  
  document.body.appendChild(this.app.view);
  this.start();
}

Main.prototype.start = function () {
  requestAnimationFrame(this.start.bind(this));
  this.labirint.play();
  this.app.render(this.stage);
}

function init() {
  main = new Main();
}

init();

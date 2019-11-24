

function StartPlaying(textStyle, mainStage) {
  PIXI.Graphics.call(this);
  this.lineStyle(4, 0x00000, 1);
  this.drawRect(0, 0, 300, 350);
  this.endFill();
  this.position.set(mainStage.width / 2 - this.width / 2, 30);

  this.gameName = new PIXI.Text('Labirintus', textStyle);
  this.gameName.position.set(
      this.width / 2 - this.gameName.width / 2,
      this.height / 5
  );

  this.playButton = new PIXI.Text('Play', textStyle);
  this.playButton.position.set(
    this.width / 2 - this.playButton.width / 2,
    this.height / 2
  )
  this.playButton.interactive = true;
  this.playButton.buttonMode = true;
  this.playButton.click = this.startGame;

  this.addChild(this.gameName, this.playButton)
}

StartPlaying.prototype = Object.create(PIXI.Graphics.prototype);


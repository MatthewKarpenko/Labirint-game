

function GameState(textStyle) {
    PIXI.Graphics.call(this);
    this.lineStyle(4, 0x00000, 1);
    this.drawRect(0, 0, 200, 350);
    this.endFill();
    this.x = 650;
    this.y = 30;

    this.gameStateText = 'Let`s start !';
    this.restartButtonText = '';
    this.playTime = 0;

    this.gameState = new PIXI.Text(this.gameStateText, textStyle);
    this.gameState.position.set(
        this.width / 2 - this.gameState.width / 2,
        this.height / 5
    );

    this.timeText = new PIXI.Text('Time: ' + this.playTime, textStyle);
    this.timeText.position.set(
        this.width / 2 - this.timeText.width / 2,
        this.height / 2
    );
  
    this.restartButton = new PIXI.Text(this.restartButtonText, textStyle);
    this.restartButton.position.set(
      this.width / 2 - this.restartButton.width / 2,
      this.height / 1.5
    )

    this.restartButton.interactive = true;
    this.restartButton.buttonMode = true;
  
    this.addChild(this.gameState, this.timeText, this.restartButton)
  }
  
  GameState.prototype = Object.create(PIXI.Graphics.prototype);
  
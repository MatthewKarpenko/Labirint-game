function Door() {
  PIXI.Graphics.call(this);
  this.beginFill(0x808080 )
  this.drawRect(2,2,21,10);
  this.endFill()
}

Door.prototype = Object.create(PIXI.Graphics.prototype);

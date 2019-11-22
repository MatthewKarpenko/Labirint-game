function Wall(dimensions) {
  let { x, y, fromX, toY } = dimensions;
  PIXI.Graphics.call(this);

  this.lineStyle(2, 0x00000, 1);
  this.moveTo(0, 0);
  this.lineTo(80, 0);
  this.endFill();
  this.position.set(x, y);
}

Wall.prototype = Object.create(PIXI.Graphics.prototype);

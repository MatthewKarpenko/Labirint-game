function Labirint(mainStage) {
  PIXI.Graphics.call(this);
  this.lineStyle(4, 0x00000, 1);
  this.drawRect(0, 0, 300, 350);
  this.endFill();
  this.mainStage = mainStage;
  this.position.set(mainStage.width / 2 - this.width / 2, 30);
  this.exit = false;
  this.character = new Character();
  this.door = new Door();
  this.createLabirintWalls();
  this.addChild(this.character, this.door);
};

Labirint.prototype = Object.create(PIXI.Graphics.prototype);

Labirint.prototype.play = function() {

  this.checkOnColision();
  this.character.x += this.character.vx;
  this.character.y += this.character.vy;
  this.contain(this.character,  {
          x: 9,
          y: 9,
          width: 300,
          height: 350})
  if (this.collision(this.character, this.door)) {
    this.exit = true;
  }
};

Labirint.prototype.createLabirintWalls = function() {
  for(var i = 0; i < map1.length; i++) {
    this.addChild(new Wall({
      x: map1[i].x,
      y: map1[i].y,
      width: map1[i].width,
      height: map1[i].height,
      toY: map1[i].toY
     }))
  }
};

Labirint.prototype.collision = function(r1, r2) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;

  r1.centerX = r1.x;
  r1.centerY = r1.y;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2 - 1;

  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }
  return hit;
};

Labirint.prototype.checkOnColision = function() {
  var x = this.character.x,
      y = this.character.y,
      width = this.character.width,
      height = this.character.height,
      vx = this.character.vx,
      vy = this.character.vy;

  if(vx == -2) {
    for (var i = 0; i < map1.length; i++) {
      if (this.collision({x: x -2, y: y, width: width, height: height}, map1[i]))
      {
        this.character.vx = 0;
      }
  }
}
  
  if(vx == 2) {
    for (var i = 0; i < map1.length; i++) {
      if (this.collision({x: x + 2, y: y, width: width, height: height}, map1[i]))
      {
        this.character.vx = 0;
      }
    }
  }
   if(vy == -2) {
    for (var i = 0; i < map1.length; i++) {
      if (this.collision({x: x, y: y - 2, width: width, height: height}, map1[i]))
      {
        this.character.vy = 0; 
      }   
    }
  }
      if(vy == 2) {
        for (var i = 0; i < map1.length; i++) {
          if (this.collision({x: x, y: y + 2, width: width, height: height}, map1[i]))
          {
            this.character.vy = 0; 
          } 
        }
      }
}

Labirint.prototype.contain = function (sprite, container) {

    let collision = undefined;
  
    if (sprite.x < container.x) {
      sprite.x = container.x;
      collision = "left";
    }
  
    if (sprite.y < container.y) {
      sprite.y = container.y;
      collision = "top";
    }
  
    if (sprite.x + sprite.width > container.width) {
      sprite.x = container.width - sprite.width;
      collision = "right";
    }
  
    if (sprite.y + sprite.height > container.height) {
      sprite.y = container.height - sprite.height;
      collision = "bottom";
    }
  
    return collision;
}
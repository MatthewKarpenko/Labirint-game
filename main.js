let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Container = PIXI.Container,
  Graphics = PIXI.Graphics,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  fromImage = PIXI.Texture.fromImage,
  Text = PIXI.Text

let main;

function ArcherShoot() {
  this.arrowsQuantity = 5;
  this.arrowsLeft = [];
  this.arrows = [];
  this.arrowSpeed = 5;
  this.hits = 0;

  this.app = autoDetectRenderer(550, 550);
  this.loadTextures();
  document.body.appendChild(this.app.view);
}

ArcherShoot.prototype.loadTextures = function() {
  loader
    .add([
      "./assets/archer.png",
      "./assets/arrow.png",
      "./assets/dungeon.png",
      "./assets/target.png"
    ])
    .load(this.setup.bind(this));
};

ArcherShoot.prototype.setup = function() {
  this.archer = new Sprite(fromImage("./assets/archer.png"));
  this.archer.position.set(150, 150);
  this.archer.width = 70;
  this.archer.height = 90;
  this.archer.vy = 4;
  this.archer.anchor.set(0.5);

  let up = keyboard("ArrowUp"),
      down = keyboard("ArrowDown");
      space = keyboard("Alt")

  up.press = function () {
    this.archer.vy -= 5
  }.bind(this);
  up.release = function () {
    this.archer.vy = 0
  }.bind(this);

  down.press = function () {
    this.archer.vy += 5
  }.bind(this);
  down.release = function () {
    this.archer.vy = 0
  }.bind(this);

  space.release = function() {
    this.shoot(this.archer.rotation, {
      x: this.archer.position.x + Math.cos(this.archer.rotation) * 20,
      y: this.archer.position.y + Math.sin(this.archer.rotation) * 20
    })
  }.bind(this);
  
  this.background = new Sprite(fromImage("./assets/dungeon.png"));
  this.background.width = 550;
  this.background.height = 550;


  this.gameScene = new Container();
  this.gameScene.interactive = true;
  this.gameScene.width = 400;
  this.gameScene.height = 400;

  this.hitCounter = new Text(
    this.hits,
     {
    fontFamily : 'Arial', fontSize: 50, fill : 0xff1010, 
  });


  this.gameScene.addChild(this.background, this.archer, this.hitCounter);
  this.hitCounter.position.set(
    this.gameScene.width / 2 - this.hitCounter.width / 2,
    30
    )

  this.targets = new Targets().setupTargets();
  for (let i = 0; i < this.targets.length; i++) {
    this.gameScene.addChild(this.targets[i]);
  }
  
  for(let y = 0; y < this.arrowsQuantity; y++) {
    let oneArrow = new Sprite(fromImage("./assets/arrow.png"));
    oneArrow.width = 30;
    oneArrow.height = 40;
    oneArrow.position.x =  y * oneArrow.width + 20
    oneArrow.position.y = 15;
    oneArrow.anchor.set(0.5);
    oneArrow.rotation = 180
   
    
    this.gameScene.addChild(oneArrow);
    this.arrowsLeft.push(oneArrow)
  }

  this.animate();
};

ArcherShoot.prototype.shoot = function(rotation, startPosition) {
  this.arrow = new Sprite(fromImage("./assets/arrow.png"));
  this.arrow.position.set(startPosition.x, startPosition.y);
  this.arrow.anchor.set(0.5);
  this.arrow.width = 30;
  this.arrow.height = 40;
  this.arrow.rotation = rotation;
  this.arrowsQuantity --;

  this.gameScene.addChild(this.arrow);
  this.arrows.push(this.arrow);
};

ArcherShoot.prototype.rotateToPoint = function(mx, my, px, py) {
  let dist_Y = my - py;
  let dist_X = mx - px;
  let angle = Math.atan2(dist_Y, dist_X);
  return angle;
};

ArcherShoot.prototype.animate = function() {
  requestAnimationFrame(this.animate.bind(this));
  let archerHitsWall = contain(this.archer, {x: 28, y: 10, width: 550, height: 550});

  if(archerHitsWall == 'top' || archerHitsWall == 'bottom') this.archer.vy *= -1
  this.archer.y += this.archer.vy;

  this.archer.rotation = this.rotateToPoint(
    this.app.plugins.interaction.mouse.global.x,
    this.app.plugins.interaction.mouse.global.y,
    this.archer.position.x,
    this.archer.position.y
  );

  if (this.arrows.length > 0) {
    for (let b = this.arrows.length - 1; b >= 0; b--) {
      this.arrows[b].position.x +=
        Math.cos(this.arrows[b].rotation) * this.arrowSpeed;
      this.arrows[b].position.y +=
        Math.sin(this.arrows[b].rotation) * this.arrowSpeed;        
    }
  }
  this.arrows.forEach(function(arrow) {
    for(let i = 0; i < this.targets.length; i++) {
    if(checkForCollision(arrow, this.targets[i]) && arrow.hit != true ) {
      this.hits ++;
      arrow.alpha=0;
      arrow.hit = true
      this.hitCounter.text = this.hits
    } 
  }
  }.bind(this));

  this.app.render(this.gameScene);
};

function checkForCollision(r1, r2) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  hit = false;

  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

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

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}

function contain(sprite, container) {

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

function init() {
  main = new ArcherShoot();
}

init();

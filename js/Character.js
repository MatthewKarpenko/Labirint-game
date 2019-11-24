function Character(func, coordinates) {
  PIXI.Graphics.call(this);
  this.beginFill(0x0000);
  this.drawCircle(0, 0, 5);
  this.endFill();
  this.x = 15;
  this.y = 340;
  this.vy = 0;
  this.vx = 0;
  this.accesMovement();
}

Character.prototype = Object.create(PIXI.Graphics.prototype);

Character.prototype.keyboard = function (value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
};

Character.prototype.accesMovement = function() {
  let left = this.keyboard("ArrowLeft"),
      up = this.keyboard("ArrowUp"),
      right = this.keyboard("ArrowRight"),
      down = this.keyboard("ArrowDown");

      left.press = () => {
        this.vx = -2;
        this.vy = 0;
      };
      
      left.release = () => {
        if (!right.isDown && this.vy === 0) {
          this.vx = 0;
        }
      };
    
      up.press = () => {
        this.vy = -2;
        this.vx = 0;
      };
      up.release = () => {
        if (!down.isDown && this.vx === 0) {
          this.vy = 0;
        }
      };
    
      right.press = () => {
        this.vx = 2;
        this.vy = 0;
      };
      right.release = () => {
        if (!left.isDown && this.vy === 0) {
          this.vx = 0;
        }
      };
    
      down.press = () => {
        this.vy = 2;
        this.vx = 0;
      };

      down.release = () => {
        if (!up.isDown && this.vx === 0) {
          this.vy = 0;
        }
      };
    
};

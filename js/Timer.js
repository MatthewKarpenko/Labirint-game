function Timer() {
  this.seconds = 0;
  this.minutes = 0;
  this.hours = 0;
  this.finalTime;
  this.t;
}

Timer.prototype.startTimer = function() {
  this.seconds++;
  if (this.seconds >= 60) {
    this.seconds = 0;
    this.minutes++;
    if (this.minutes >= 60) {
      this.minutes = 0;
      this.hours++;
    }
  }

  this.finalTime =
    (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") +
    ":" +
    (this.minutes
      ? this.minutes > 9
        ? this.minutes
        : "0" + this.minutes
      : "00") +
    ":" +
    (this.seconds > 9 ? this.seconds : "0" + this.seconds);
  this.timer();
};

Timer.prototype.timer = function() {
  this.t = setTimeout(this.startTimer.bind(this), 1000);
};

Timer.prototype.stopTimer = function() {
  clearTimeout(this.t);
};

Timer.prototype.clearTimer = function() {
  this.finalTime = "00:00:00";
  this.seconds = 0;
  this.minutes = 0;
  this.hours = 0;
};

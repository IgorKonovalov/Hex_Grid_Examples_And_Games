function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.end = a.plus(v);

  this.show = function() {
    cx.beginPath();
    cx.moveTo(this.a.x, this.a.y);
    cx.lineTo(this.end.x, this.end.y);
    cx.stroke();
  }
}

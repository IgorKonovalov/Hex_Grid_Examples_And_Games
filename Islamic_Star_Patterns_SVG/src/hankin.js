function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.end = a.plus(v);

  this.show = function() {
    cx.beginPath();
    cx.moveTo(this.a.x, this.end.y);
    cx.lineTo(this.v.x, this.end.y);
    cx.stroke();
  }
}

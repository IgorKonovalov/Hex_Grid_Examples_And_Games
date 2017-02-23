function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.end = a.plus(v);
  this.coord = [this.a, this.end];


  this.show = function() {
    cx.beginPath();
    cx.lineWidth = 1.5;
    cx.strokeStyle = "magenta";
    cx.moveTo(this.a.x, this.a.y);
    cx.lineTo(this.end.x, this.end.y);
    cx.stroke();
  }

}

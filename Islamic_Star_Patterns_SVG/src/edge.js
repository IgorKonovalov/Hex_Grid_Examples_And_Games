function Edge(a, b) { // side of the polygon
  this.a = a;
  this.b = b;
  this.h1; // hankins objects - vectors for middle points
  this.h2;

  this.show = function() {
    // canvas ver
    cx.strokeStyle = 'black';
    cx.beginPath();
    cx.moveTo(this.a.x, this.a.y);
    cx.lineTo(this.b.x, this.b.y);
    cx.stroke();
    cx.closePath();

    // this.h1.show();
    // this.h2.show();
  }

  // TODO: hankin object function

}

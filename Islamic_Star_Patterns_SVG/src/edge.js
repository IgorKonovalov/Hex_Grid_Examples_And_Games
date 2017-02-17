function Edge(a, b) { // side of the polygon
  this.a = a;
  this.b = b;
  this.h1; // hankins objects - vectors for middle points
  this.h2;

  this.show = function() {
    // canvas ver
    cx.beginPath();
    cx.moveTo(this.a.x, this.a.y);
    cx.lineTo(this.b.x, this.b.y);
    cx.stroke();

    // this.h1.show();
    // this.h2.show();
  }

  this.hankin = function() {
    let mid = this.a.plus(b); // vector functions is in functions.js
    mid.multiply(.5);

    let v1 = this.a.subtract(mid);
    let v2 = this.b.subtract(mid);

  }

}

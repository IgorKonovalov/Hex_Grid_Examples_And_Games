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

    this.h1.show();
    this.h2.show();
  }

  this.hankin = function(alpha) {
    let mid = this.a.plus(b); // vector functions is in functions.js
    mid.multiply(.5);

    let v1 = this.a.subtract(mid); // this.a - mid is a vector from second point to first
    let v2 = this.b.subtract(mid);

    let offset1 = mid;
    let offset2 = mid;

    let angle = Math.PI / 3;
    v1.rotate(-angle);
    v2.rotate(angle);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);

  }

}

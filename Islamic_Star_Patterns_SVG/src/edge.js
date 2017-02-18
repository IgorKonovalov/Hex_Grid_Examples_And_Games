function Edge(a, b) { // side of the polygon
  this.a = a;
  this.b = b;
  this.h1; // hankins objects - vectors for middle points
  this.h2;
  this.points = this.a;
  this.hankins = [];

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
    let mid = this.a.plus(this.b).multiply(.5); // middle between vertices

    let v1 = this.a.subtract(mid); // (this.a - mid) is a vector from second point to first
    let v2 = this.b.subtract(mid);

    let halfLength = v1.length;

    let offset1 = mid;
    let offset2 = mid;

    let delta = 10;

    if (delta > 0) { // TODO смещение векторов hankin
      v1Delta = v1.setMagnitude(delta);
      v2Delta = v2.setMagnitude(delta);
      offset1 = mid.plus(v1Delta);
      offset2 = mid.plus(v2Delta);
    }

    v1 = v1.setMagnitude(1); // normalize vectors
    v2 = v2.setMagnitude(1);

    let angle = Math.PI / 3;
    v1 = v1.rotate(-angle);
    v2 = v2.rotate(angle);

    alpha = alpha / 2;
    let beta = Math.PI - alpha - angle;
    let len = Math.sin(alpha) * ((halfLength + delta) / Math.sin(beta));

    v1 = v1.setMagnitude(len);
    v2 = v2.setMagnitude(len);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);

    this.hankins.push(this.h1.coord);
    this.hankins.push(this.h2.coord);

  }

}

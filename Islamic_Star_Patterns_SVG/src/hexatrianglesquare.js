function build_poly(x,y,r,sides,init_angle) {
    p = new Polygon(sides);
    if(!init_angle)init_angle = 0;
    // rotate 360 degrees around the clock in 60 degree increments
    var inc = 2 * Math.PI / sides;
    for (var index = 0; index < sides; index++) {
      // angular to cartesian
      var θ = (index * inc) - inc / 2+init_angle;
      var vX = x + r * Math.cos(θ);
      var vY = y + r * Math.sin(θ);
      p.addVertex(vX, vY);
    }
    p.close();
    return p;
}

function HexaTriangleSquareTiling(r) {
  this.r = r;
  this.polys = [];
  this.sides = 6;
  this.beta = Math.PI/this.sides;
  this.side = this.r* Math.sin(this.beta);
  this.h6 = this.r* Math.cos(this.beta);
  this.r3 = this.side/Math.sin(Math.PI/3);
  this.r4 = this.side/Math.sin(Math.PI/4);
  this.h3 = this.r3*Math.cos(Math.PI/3);
  this.h4 = this.r4*Math.cos(Math.PI/4);


  this.buildCell = function(x, y) {
    var sides = this.sides;
    console.log("sides : ",sides);
    var p;
    p = build_poly(x,y,this.r,this.sides,Math.PI/6);
    this.polys.push(p);
    var d4 = this.h6+this.h4;
    var d3 = this.r3+this.r;
    const vector = new Vector(1,1);
    var D4A = vector.rotate(Math.PI/6);
    var D4B = vector.rotate(Math.PI/2);
    var D4C = vector.rotate(-Math.PI/6);
    D4A = D4A.setMagnitude(d4);
    D4B = D4B.setMagnitude(d4);
    D4C = D4C.setMagnitude(d4);
    var D3A = vector.rotate(0);
    var D3B = vector.rotate(Math.PI/3);
    D3A = D3A.setMagnitude(d3);
    D3B = D3B.setMagnitude(d3);
    // p = build_poly(x-d3,y,this.r3,3);
    // this.polys.push(p);
    p = build_poly(x+D3A.x,y+D3A.y,this.r3,3);
    this.polys.push(p);
    p = build_poly(x+D3B.x,y+D3B.y,this.r3,3,2*Math.PI/6);
    this.polys.push(p);
    p = build_poly(x+D4A.x,y+D4A.y,this.r4,4,Math.PI/6);
    this.polys.push(p);
    p = build_poly(x+D4B.x,y+D4B.y,this.r4,4);
    this.polys.push(p);
    p = build_poly(x+D4C.x,y+D4C.y,this.r4,4,-Math.PI/6);
    this.polys.push(p);
  }

  this.buildGrid = function() {

    var h = this.h6+this.h4;
    var w =  2*(this.r +this.r3+this.h3+this.h4);
    var inc = h;
    var row = 0;
    for (var y = -h / 2; y < 400 + h/2; y += inc) {
      var startX = ((row % 2) == 0) ? -w : -w / 2;
      for (var x = startX; x < 400; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }

  }

}

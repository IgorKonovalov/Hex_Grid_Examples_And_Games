width = '740';
height = '500';

function HexagonalTiling(r) {
  this.polys = [];

  this.buildCell = function(x, y) {
    let sides = 6;
    let p = new Polygon(sides);
    // rotate 360 degrees around the clock in 60 degree increments
    let inc = (2 * Math.PI) / sides;
    for (let index = 0; index < sides; index++){
      // angular to cartesian
      let θ = (index * inc) - inc / 2;
      let vX = x + r * Math.cos(θ);
      let vY = y + r * Math.sin(θ);
      p.addVertex(vX, vY);
    }
    p.close();
    this.polys.push(p);
  }

  this.buildGrid = function() {
    let h = r * 2;
    let w = (Math.sqrt(3) / 2) * h;
    let inc = 3 * (h / 4);
    let row = 0;
    for (let y = -h / 2; y < 500 + h/2; y += inc) {
      let startX = ((row % 2) == 0) ? -w : -w / 2;
      for (let x = startX; x < 740; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }
  }
}

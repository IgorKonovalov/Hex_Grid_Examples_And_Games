function Polygon(sides) {
  this.interiorAngle = ((sides - 2) * Math.PI) / sides;
  this.vertices = [];
  this.edges = [];

  this.addVertex = function(x, y) { // adding vertices
    let a = new Vector(x, y);
    let total = this.vertices.length;
    if (total > 0) {
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  this.close = function() { // closing figure
    let total = this.vertices.length;
    let last = this.vertices[total - 1];
    let first = this.vertices[0];
    let edge = new Edge(last, first);
    this.edges.push(edge);
  }

  this.hankin = function() {
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this.interiorAngle);
    }
  }

  this.polygonPoints = function() {
    let points = [];
    for (let i = 0; i < this.edges.length; i++) {
      points.push(this.edges[i].points);
    }
    return arrayToPoints(points);
  }

  this.show = function() {
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }
}

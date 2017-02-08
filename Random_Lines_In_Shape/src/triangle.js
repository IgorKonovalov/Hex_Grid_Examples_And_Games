function TriangleObject(center, size) {
  this.center = center;
  this.size = size;
  this.edgePoints = [];
}

TriangleObject.prototype.triangleCornersFlat = function() {
  let corners = [];
  for (let i = 0; i <= 2; i++) {
    let point = {};
    let angle_deg = 120 * i + 30;
    let angle_rad = Math.PI / 180 * angle_deg;
    point.x = this.center.x + this.size * Math.cos(angle_rad);
    point.y = this.center.y + this.size * Math.sin(angle_rad);
    corners.push(point);
  }
  this.corners = corners;
};

TriangleObject.prototype.getPointOnEdge = function(method, i) {
  this.i = i;
  let edgePoints = [];
  let corners = this.corners;
  for (let i = 0; i < 3; i++) {
    edgePoints.push(method(corners[i], corners[i+1] || corners[0]));
  }
  this.edgePoints[i] = edgePoints;
};

let triangleTest = new TriangleObject({x: 490, y: 125}, 90);
triangleTest.triangleCornersFlat();
for (let i = 0; i < 3; i++) {
  triangleTest.getPointOnEdge(randomPointsOnLine, i);
}

// canvas test

cx.lineWidth = 1;
cx.beginPath();
cx.moveTo(triangleTest.corners[0].x, triangleTest.corners[0].y);
for (let i = 1; i <= 2; i++){
  cx.lineTo(triangleTest.corners[i].x, triangleTest.corners[i].y);
}
cx.closePath();
cx.stroke();

cx.beginPath();
cx.moveTo(triangleTest.edgePoints[0][0].x, triangleTest.edgePoints[0][0].y);
triangleTest.edgePoints.forEach((triangle) => {
  for (let i = 0; i <= 2; i++) {
    let random = randomInteger(0,2);
    cx.lineTo(triangle[random].x, triangle[random].y);
  }
});
cx.stroke();

function SquareObject(center, size) {
  this.center = center;
  this.size = size;
  this.edgePoints = [];
}

SquareObject.prototype.squareCornersTop = function() {
  let corners = [];
  for (let i = 0; i <= 3; i++) {
    let point = {};
    let angle_deg = 90 * i;
    let angle_rad = Math.PI / 180 * angle_deg;
    point.x = this.center.x + this.size * Math.cos(angle_rad);
    point.y = this.center.y + this.size * Math.sin(angle_rad);
    corners.push(point);
  }
  this.corners = corners; // записываем в свойство
};

SquareObject.prototype.squareCornersFlat = function() {
  let corners = [];
  for (let i = 0; i <= 3; i++) {
    let point = {};
    let angle_deg = 90 * i + 45;
    let angle_rad = Math.PI / 180 * angle_deg;
    point.x = this.center.x + this.size * Math.cos(angle_rad);
    point.y = this.center.y + this.size * Math.sin(angle_rad);
    corners.push(point);
  }
  this.corners = corners; // записываем в свойство
};



SquareObject.prototype.getPointOnEdge = function(method, i) {
  this.i = i;
  let edgePoints = [];
  let corners = this.corners;
  for (let i = 0; i < 4; i++) {
    edgePoints.push(method(corners[i], corners[i+1] || corners[0]));
  }
  this.edgePoints[i] = edgePoints;
};


let squareTest = new SquareObject({x: 100, y: 100}, 100);
// squareTest.squareCornersTop();
squareTest.squareCornersFlat();
for (var i = 0; i < 3; i++) {
  squareTest.getPointOnEdge(randomPointsOnLine, i);
}

// canvas test

cx.lineWidth = 1;
cx.beginPath();
cx.moveTo(squareTest.corners[0].x, squareTest.corners[0].y);
for (let i = 1; i <= 3; i++){
  cx.lineTo(squareTest.corners[i].x, squareTest.corners[i].y);
}
cx.closePath();
cx.stroke();

cx.beginPath();
cx.moveTo(squareTest.edgePoints[0][0].x, squareTest.edgePoints[0][0].y);
squareTest.edgePoints.forEach((square) => {
  console.log(square);
  for (let i = 0; i <= 3; i++) {
    let random = randomInteger(0,3);
    cx.lineTo(square[random].x, square[random].y);
  }
});
cx.stroke();

/*
███████ ██    ██  ██████
██      ██    ██ ██
███████ ██    ██ ██   ███
     ██  ██  ██  ██    ██
███████   ████    ██████
*/

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
  this.corners = corners;
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
for (let i = 0; i < 3; i++) {
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

const sqDiv = document.getElementById('square');
const svgSq = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgSq.setAttributeNS(null, "width", "800px");
svgSq.setAttributeNS(null, "height", "400px");

// preparations

let squareSVG = new SquareObject({x: 20, y: 20}, 80);
squareSVG.squareCornersFlat();

for (let i = 0; i < 3; i++) {
  squareSVG.getPointOnEdge(randomPointsOnLine, i);
}
const offsetSq = 10;
let pointsSq = arrayToPoints(squareSVG.corners);
let sizeSq = squareSVG.size;
let coordXSq = squareSVG.center.x;
let coordYSq = squareSVG.center.y;
let widthSq = (sizeSq / Math.sqrt(2)) * 2;
let heightSq = widthSq;

// drawing flat

for (let x = widthSq / 2; x < 700; x += (widthSq + offsetSq)) {
  for (let y = heightSq / 2; y < 340; y += (heightSq + offsetSq)) {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'tile');
    g.setAttribute('transform', 'translate('+ x + ',' + y + ')');
    const square = document.createElementNS(svgNS,'polygon')
    square.setAttribute('points', pointsSq);
    svgSq.appendChild(g);
    g.appendChild(square);
    squareSVG.edgePoints.forEach((square) => {
      for (let i = 0; i <= 1; i++) {
        let random = randomInteger(0,3);
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', square[i].x);
        line.setAttribute('y1', square[i].y);
        line.setAttribute('x2', square[random].x);
        line.setAttribute('y2', square[random].y);
        g.appendChild(line)
      }
    });
  }
}

sqDiv.appendChild(svgSq);

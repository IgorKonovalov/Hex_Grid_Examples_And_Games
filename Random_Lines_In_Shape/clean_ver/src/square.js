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

/*
███████ ██    ██  ██████
██      ██    ██ ██
███████ ██    ██ ██   ███
     ██  ██  ██  ██    ██
███████   ████    ██████
*/
function drawSquareSVG(sizeValue, offsetValue, svgWidth, svgHeight, lines, bg, color) {
  const sqDiv = document.getElementById('Figure');
  const svgSq = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgSq.setAttributeNS(null, "width", svgWidth + "px");
  svgSq.setAttributeNS(null, "height", svgHeight + "px");
  svgSq.setAttributeNS(null, "id", "svg_figure");

  // preparations

  let squareSVG = new SquareObject({x: 20, y: 20}, sizeValue);
  squareSVG.squareCornersFlat();

  for (let i = 0; i < lines; i++) {
    squareSVG.getPointOnEdge(randomPointsOnLine, i);
  }
  let offsetSq = Number(offsetValue);
  let pointsSq = arrayToPoints(squareSVG.corners);
  let sizeSq = squareSVG.size;
  let coordXSq = squareSVG.center.x;
  let coordYSq = squareSVG.center.y;
  let widthSq = (sizeSq / Math.sqrt(2)) * 2;
  let heightSq = widthSq;

  // drawing flat

  for (let x = widthSq / 2; x < (svgWidth - widthSq/2); x += (widthSq + offsetSq)) {
    for (let y = heightSq / 2; y < (svgHeight -widthSq/2 ); y += (heightSq + offsetSq)) {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'tile');
      g.setAttribute('transform', 'translate('+ x + ',' + y + ')');
      const square = document.createElementNS(svgNS,'polygon')
      square.setAttribute('points', pointsSq);
      square.setAttribute('fill', bg);
      square.setAttribute('stroke', color);

      svgSq.appendChild(g);
      g.appendChild(square);
      squareSVG.edgePoints.forEach((square) => {
        for (let i = 0; i <= 3; i++) {
          let random = randomInteger(0,3);
          const line = document.createElementNS(svgNS, 'line');
          line.setAttribute('x1', square[i].x);
          line.setAttribute('y1', square[i].y);
          line.setAttribute('x2', square[random].x);
          line.setAttribute('y2', square[random].y);
          line.setAttribute('stroke', color);
          g.appendChild(line)
        }
      });
    }
  }
  sqDiv.appendChild(svgSq);
}

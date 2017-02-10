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
for (let i = 0; i < 2; i++) {
  triangleTest.getPointOnEdge(randomPointsOnLine, i);
}

/*
███████ ██    ██  ██████
██      ██    ██ ██
███████ ██    ██ ██   ███
     ██  ██  ██  ██    ██
███████   ████    ██████
*/
function drawTriangleSVG(sizeValue, offsetValue, svgWidth, svgHeight, lines, bg, color) {
  const triangleDiv = document.getElementById('Figure');
  const svgTr = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgTr.setAttributeNS(null, "width", svgWidth + "px");
  svgTr.setAttributeNS(null, "height", svgHeight + "px");
  svgTr.setAttributeNS(null, "id", "svg_figure");


  let triangleSVG = new TriangleObject({x: 20, y: 20}, sizeValue);
  triangleSVG.triangleCornersFlat();

  for (let i = 0; i < lines; i++) {
    triangleSVG.getPointOnEdge(randomPointsOnLine, i);
  }
  let offsetTr = Number(offsetValue);
  let pointsTr = arrayToPoints(triangleSVG.corners);
  let sizeTr = triangleSVG.size;
  let coordXTr = triangleSVG.center.x;
  let coordYTr = triangleSVG.center.y;
  let widthTr = Math.cos(Math.PI / 6) * sizeTr * 2;
  let heightTr = Math.sin(Math.PI / 6) * sizeTr + sizeTr;

  for (let x = widthTr / 2; x < (svgWidth - widthTr); x += (widthTr + offsetTr)) {
    for (let y = heightTr * 2; y < (svgHeight - heightTr / 2); y += (widthTr + offsetTr)) {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'tile');
      g.setAttribute('transform', 'translate('+ x + ',' + y + ')');
      const triangle = document.createElementNS(svgNS,'polygon')
      triangle.setAttribute('points', pointsTr);
      triangle.setAttribute('fill', bg);
      triangle.setAttribute('stroke', color);

      svgTr.appendChild(g);
      g.appendChild(triangle);
      triangleSVG.edgePoints.forEach((triangle) => {
        for (let i = 0; i <= 2; i++) {
          let random = randomInteger(0,2);
          const line = document.createElementNS(svgNS, 'line');
          line.setAttribute('x1', triangle[i].x);
          line.setAttribute('y1', triangle[i].y);
          line.setAttribute('x2', triangle[random].x);
          line.setAttribute('y2', triangle[random].y);
          line.setAttribute('stroke', color);
          g.appendChild(line)
        }
      });
    }
  }

  triangleDiv.appendChild(svgTr);

}

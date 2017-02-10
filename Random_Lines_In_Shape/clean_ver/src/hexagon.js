
// шестиугольник

function HexObject(center, size) {
  this.center = center;
  this.size = size;
  this.edgePoints = [];
}

HexObject.prototype.hexCornersFlat = function() {
  let corners = [];
  for (let i = 0; i <= 5; i++) {
    let point = {};
    let angle_deg = 60 * i;
    let angle_rad = Math.PI / 180 * angle_deg;
    point.x = this.center.x + this.size * Math.cos(angle_rad);
    point.y = this.center.y + this.size * Math.sin(angle_rad);
    corners.push(point);
  }
  this.corners = corners;
};

HexObject.prototype.getPointOnEdge = function(method, i) {
  this.i = i;
  let edgePoints = [];
  let corners = this.corners;
  for (let i = 0; i < 6; i++) {
    edgePoints.push(method(corners[i], corners[i+1] || corners[0]));
  }
  this.edgePoints[i] = edgePoints;
};


let centerHex = {x: 300, y: 100};
const sizeHex = 80; // радиус от центра к углу
let hex = new HexObject(centerHex, sizeHex);

hex.hexCornersFlat(); // рассчитываем точки - углы шестиугольника

for (let i = 0; i < 3; i++) { // рассчитываем случайную точку на сторонах шестиугольника
  hex.getPointOnEdge(randomPointsOnLine, i);
}

function drawHexSVG(sizeValue, offsetValue, svgWidth, svgHeight, lines) {
  const hexDiv = document.getElementById('Figure');
  const svgHex = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgHex.setAttributeNS(null, "width", svgWidth + "px");
  svgHex.setAttributeNS(null, "height", svgHeight + "px");
  svgHex.setAttributeNS(null, "id", "svg_figure");

  // preparations

  let hexSVG = new HexObject({x: 20, y: 20}, sizeValue);
  hexSVG.hexCornersFlat();
  for (let i = 0; i < (lines); i++) {
    hexSVG.getPointOnEdge(randomPointsOnLine, i);
  }
  let offsetHex = Number(offsetValue);
  let points = arrayToPoints(hexSVG.corners);
  let size = hexSVG.size;
  let coordX = hexSVG.center.x;
  let coordY = hexSVG.center.y;
  let width = size * 2;
  let height = (Math.sqrt(3) / 2) * width + offsetHex;
  let widthInc = 3 * (width / 4) + offsetHex;

  // drawing

  let columnHex = 0;
  for (let x = width / 2; x < (svgWidth - width / 2); x += widthInc) {
    let startY = ((columnHex % 2) == 0) ? height : height / 2;
    for (let y = startY; y < (svgHeight - height); y += height) {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'tile');
      g.setAttribute('transform', 'translate('+ x + ',' + y + ')');
      const hex = document.createElementNS(svgNS,'polygon')
      hex.setAttribute('points', points);
      svgHex.appendChild(g);
      g.appendChild(hex);
      hexSVG.edgePoints.forEach((hex) => {
        for (let i = 0; i <= 5; i++) {
          let random = randomInteger(0,5);
          const line = document.createElementNS(svgNS, 'line');
          line.setAttribute('x1', hex[i].x);
          line.setAttribute('y1', hex[i].y);
          line.setAttribute('x2', hex[random].x);
          line.setAttribute('y2', hex[random].y);
          g.appendChild(line)
        }
      });
    }
    columnHex++;
  }

  hexDiv.appendChild(svgHex);
}

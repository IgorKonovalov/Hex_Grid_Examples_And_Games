const canvas = document.getElementById('test');
// const cx = canvas.getContext("2d");

const container = document.getElementById('svgContainer');
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');

const width = '740';
const height = '500';
const deltaR = document.getElementById('delta');
const angleR = document.getElementById('angle');

svg.setAttributeNS(null, "width", width + "px");
svg.setAttributeNS(null, "height", height + "px");
svg.setAttributeNS(null, "id", "starPattern");


// задание начальных состояний

let polygons = [];

function squareTiling() {
  let inc = 100;
  for (let x = 0; x < width - inc / 2; x += inc) {
    for (let y = 0; y < height; y += inc) {
      let poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polygons.push(poly);
    }
  }
}

// squareTiling();

function hexTiling() {
  var hexTiles = new HexagonalTiling(60);
  hexTiles.buildGrid();
  polygons = hexTiles.polys;
}

hexTiling();

function hexTriangleSquareTiling() {
  var tiles = new HexaTriangleSquareTiling(50);
  tiles.buildGrid();
  polys = tiles.polys;
}

// hexTriangleSquareTiling();

deltaR.addEventListener('mousemove', function () {
  drawSVGhankins();
})
angleR.addEventListener('mousemove', function () {
  drawSVGhankins();
})



function drawSVGGrid() { // creating grid with polygons and lines
  polygons.forEach((poly) => {
    const g = document.createElementNS(svgNS, 'g'); // container for SVG polygon and line
    g.setAttribute('class', 'tile');
    const cell = document.createElementNS(svgNS, 'polygon');
    cell.setAttribute('points', poly.getPolygonPoints());
    g.appendChild(cell);
    for (let i = 0; i < poly.edges.length * 2 ; i ++) {
      const line = document.createElementNS(svgNS, 'line');
      g.appendChild(line)
    }
    svg.appendChild(g);
  });
  container.appendChild(svg);
}


drawSVGGrid();

function drawSVGhankins() {
  polygons.forEach((poly, i) => {
    delta = Number(deltaR.value);
    angle = Math.PI / angleR.value;
    const g = document.getElementsByTagName('g')[i];
    const lines = Array.prototype.slice.call(g.childNodes).slice(1);
    let hankinsCoord = poly.getHankins();
    let count = 4;
    for (let i = 0; i < lines.length ; i++) {
      lines[i].setAttribute('x1', hankinsCoord[count-4]);
      lines[i].setAttribute('y1', hankinsCoord[count-3]);
      lines[i].setAttribute('x2', hankinsCoord[count-2]);
      lines[i].setAttribute('y2', hankinsCoord[count-1]);
      count +=4
    }
  });
}

drawSVGhankins();

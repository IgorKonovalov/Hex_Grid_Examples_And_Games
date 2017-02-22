const canvas = document.getElementById('test');
const cx = canvas.getContext("2d");

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

squareTiling();

// попробуем отрисовку на канвасе
function drawCanvas() {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  polygons.forEach((poly)=> {
    delta = Number(deltaR.value);
    angle = Math.PI / angleR.value;
    poly.hankin();
    poly.show();
  })
}

deltaR.addEventListener('mousemove', function () {
  drawCanvas();
})
angleR.addEventListener('mousemove', function () {
  drawCanvas();
})

drawCanvas();

 // TODO: теперь, когда есть базовый вывод - нужно разделить создание объекта, отрисовку объекта и отрисовку отдельных линий внутри, то есть, сначала создаем объекты и выводим их, затем уже отдельно рисуем ханкины, отдельно для каждого объекта, либо перерисовываем при изменении range

 // то есть, создаем мы сетку не трансформом, а отдельными координатами для каждого объекта!

let polyTest = new Polygon(4);
polyTest.addVertex(0, 0);
polyTest.addVertex(100, 0);
polyTest.addVertex(100, 100);
polyTest.addVertex(0, 100);
polyTest.close();
polyTest.hankin();


let cellCoord = polyTest.getPolygonPoints();
let hankinsCoord = polyTest.getHankins();


function drawSVG() { // квадраты
  for (let x = 0; x < 600; x += 100) {
    for (let y = 0; y < 400; y += 100) {
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'tile');
      g.setAttribute('transform', 'translate('+ x + ',' + y + ')');
      const cell = document.createElementNS(svgNS, 'polygon');
      cell.setAttribute('points', polyTest.getPolygonPoints());
      const hankins = document.createElementNS(svgNS, 'polygon');
      g.appendChild(cell);
      for (let i = 4; i < hankinsCoord.length ; i += 4) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', hankinsCoord[i-4]);
        line.setAttribute('y1', hankinsCoord[i-3]);
        line.setAttribute('x2', hankinsCoord[i-2]);
        line.setAttribute('y2', hankinsCoord[i-1]);
        // line.setAttribute('stroke-linecap', 'round');
        g.appendChild(line)
      }
      g.appendChild(hankins);
      svg.appendChild(g);
    }
  }
}


drawSVG();
container.appendChild(svg);

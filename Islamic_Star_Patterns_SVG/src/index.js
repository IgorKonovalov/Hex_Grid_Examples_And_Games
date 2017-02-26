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

 // let hankinsCoord = polygons[0].getHankins(); TODO - заготовка для hankins

 // const hankins = document.createElementNS(svgNS, 'polygon');
 //
 // for (let i = 4; i < hankinsCoord.length ; i += 4) {
 //   const line = document.createElementNS(svgNS, 'line');
 //   line.setAttribute('x1', hankinsCoord[i-4]);
 //   line.setAttribute('y1', hankinsCoord[i-3]);
 //   line.setAttribute('x2', hankinsCoord[i-2]);
 //   line.setAttribute('y2', hankinsCoord[i-1]);
 //   g.appendChild(line)
 // }
 // g.appendChild(hankins);

function drawSVGGrid() { // функция рисует SVG сетку
  polygons.forEach((poly) => {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'tile');
    const cell = document.createElementNS(svgNS, 'polygon');
    cell.setAttribute('points', poly.getPolygonPoints());
    g.appendChild(cell);
    for (let i = 0; i < poly.edges.length ; i ++) {
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
    const g = document.getElementsByClassName('g')[i];

  });
}

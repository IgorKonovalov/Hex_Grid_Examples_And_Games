console.log('hello');
const cx = document.querySelector("canvas").getContext("2d");

function hexCornerFlat(center, size, i) {
  let point = {};
  let angle_deg = 60 * i;
  let angle_rad = Math.PI / 180 * angle_deg;
  point.x = center.x + size * Math.cos(angle_rad);
  point.y = center.y + size * Math.sin(angle_rad);
  return point;
}

// получение точек - углов шестиугольника

let center = {x: 20, y: 20};
let corners = [];

for (let i = 0; i <= 5; i++) {
  corners.push(hexCornerFlat(center, 20, i));
}

let points = []; // массив где будут храниться точки
for (let name in corners) {
  points.push(corners[name].x);
  points.push(',');
  points.push(corners[name].y);
  points.push(' ');
}
let pointsToString = points.join(''); // преобразованный в строку массив точек

// canvas drawing:


cx.beginPath();
cx.moveTo(corners[0].x, corners[0].y);
for (let i = 1; i <= 5; i++){
  cx.lineTo(corners[i].x, corners[i].y);
}
cx.fillStyle = "blue";
cx.fill();
cx.closePath();

const testDiv = document.getElementsByClassName('test')[0];
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const svgNS = svg.namespaceURI;
svg.setAttributeNS(null, "width", "800px");
svg.setAttributeNS(null, "height", "200px");


// svg drawing
let coordX = 10;
let coordY = 10;
for (let i = 0; i <= 10; i++) {
  coordX = coordX + 60;
  const g = document.createElementNS(svgNS, 'g');
  g.setAttribute('class', 'tile');
  g.setAttribute('transform', 'translate('+ coordX + ',' + coordY + ')');
  const hex = document.createElementNS(svgNS,'polygon')
  hex.setAttribute('points', pointsToString);
  svg.appendChild(g);
  g.appendChild(hex);
}

testDiv.appendChild(svg);

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

let center = {x: 100, y: 100};
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


// svg drawing

const svgDiv = document.getElementsByClassName('svg_container')[0];
let svg = document.createElement('svg');
svg.setAttribute('width', '300');
svg.setAttribute('height', '300');

svgDiv.appendChild(svg);

for (let i = 0; i < 1; i++) {
  let g = document.createElement('g');
  g.className = 'tile';
  let hex = document.createElement('polygon')
  hex.setAttribute('points', pointsToString);
  g.appendChild(hex);
  svg.appendChild(g);
}

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

// getting points of hex

let center = {x: 100, y: 100};
let corners = [];

for (let i = 0; i <= 5; i++) {
  corners.push(hexCornerFlat(center, 20, i));
}

let points = []; // массив где будут храниться точки
// console.log(corners);
for (let name in corners) {
  points.push(corners[name].x);
  points.push(',');
  points.push(corners[name].y);
  points.push(' ');
}
// console.log(points);
let pointsToString = points.join(''); // преобразованный в строку массив точек
// console.log(pointsToString);

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

let hex = document.createElement('polygon')
hex.setAttribute('points', corners);
svgDiv.appendChild(svg);
let g;
for (let i = 0; i < 50; i++) {
  g = document.createElement('g');
  g.className = 'tile';
  svg.appendChild(g);
}

g.appendChild(hex);

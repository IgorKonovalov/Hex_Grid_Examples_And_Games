console.log('hello there');
const sizeHex = 80; // радиус от центра к углу

// вспомогательные функции

function arrayToPoints(array) {
  let points = [];
  for (let name in array) {
    points.push(array[name].x);
    points.push(',');
    points.push(array[name].y);
    points.push(' ');
  }
  return points.join('');
}

function randomPointsOnLine(start, end) { // случайная точка на линии
  let line = Math.sqrt(Math.pow((start.x - end.x), 2) + Math.pow((start.y - end.y),2));
  let randomLength = Math.random() * line;
  let point = {};
  point.x = start.x - (randomLength * (start.x - end.x)) / line;
  point.y = start.y - (randomLength * (start.y - end.y)) / line;
  return point;
}

function middlePointOnLine(start, end) {
  let line = Math.sqrt(Math.pow((start.x - end.x), 2) + Math.pow((start.y - end.y),2));
  let middleLength = line / 2;
  let point = {};
  point.x = start.x - (middleLength * (start.x - end.x)) / line;
  point.y = start.y - (middleLength * (start.y - end.y)) / line;
  return point;
}

// let start = {x: 10, y: 10};
// let end = {x: 13, y: 8};
// console.log(middlePointOnLine(start, end));


// обьекты

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
  this.corners = corners; // записываем в свойство
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

HexObject.prototype.draw = function () {

};


let centerHex = {x: 100, y: 100};
let hex = new HexObject(centerHex, sizeHex);

hex.hexCornersFlat(); // рассчитываем точки - углы шестиугольника

for (let i = 0; i < 2; i++) { // рассчитываем случайную точку на сторонах шестиугольника
  hex.getPointOnEdge(randomPointsOnLine, i);
}

// TEST

const canvas = document.getElementById('test')
const cx = canvas.getContext('2d');

// рисуем шустиугольник
cx.lineWidth = 5;
cx.beginPath();
cx.moveTo(hex.corners[0].x, hex.corners[0].y);
for (let i = 1; i <= 5; i++){
  cx.lineTo(hex.corners[i].x, hex.corners[i].y);
}
cx.closePath();
cx.stroke();

// strokefun
//
// let gradient=cx.createLinearGradient(0,0,170,0);
// gradient.addColorStop("0","magenta");
// gradient.addColorStop("0.5","blue");
// gradient.addColorStop("1.0","red");
//
// // Fill with gradient
// cx.strokeStyle=gradient;
// cx.lineWidth=5;

// рисуем линии по сторонам шестиугольника
cx.beginPath();
cx.moveTo(hex.edgePoints[0][0].x, hex.edgePoints[0][0].y);
hex.edgePoints.forEach(function(hex, i) {
  for (let i = 1; i <= 5; i++){
    cx.lineTo(hex[i].x, hex[i].y);
  }
  cx.closePath();
})
cx.strokeStyle
cx.stroke();

console.log('hello there');
const sizeHex = 40; // радиус от центра к углу

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
  let length = 
}

// обьекты

// шестиугольник

function HexObject(center, size) {
  this.center = center;
  this.size = size;
  let corners = [];
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


let centerHex = {x: 100, y: 100};
let hex = new HexObject(centerHex, sizeHex);

hex.hexCornersFlat(); // рассчитываем точки - углы шестиугольника
// console.log(arrayToPoints(hex.corners)); // простая проверка, получены ли точки
function randomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

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

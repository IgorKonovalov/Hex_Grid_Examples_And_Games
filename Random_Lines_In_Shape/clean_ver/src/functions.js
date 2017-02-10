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

// BUTTONS

// options
const select_figure = document.getElementById('figure_select'),
      svgNS = "http://www.w3.org/2000/svg",
      sizeValue = document.getElementById('sizeValue'),
      offsetValue = document.getElementById('offsetValue'),
      svgWidth = document.getElementById('svgWidth'),
      svgHeight = document.getElementById('svgHeight'),
      svgLines = document.getElementById('lines'),
      bgColor = document.getElementById('bgColor'),
      lineColor = document.getElementById('lineColor');



// draw
const buttonDraw = document.getElementById('generate');
buttonDraw.addEventListener('click', () => {
  let svg = document.getElementById('svg_figure');
  if (svg) {
    svg.remove();
  }
  switch (select_figure.value) {
    case 'HEX':
      drawHexSVG(sizeValue.value, offsetValue.value, svgWidth.value, svgHeight.value, svgLines.value, bgColor.value, lineColor.value);
      break;
    case 'Triangle':
      drawTriangleSVG(sizeValue.value, offsetValue.value, svgWidth.value, svgHeight.value, svgLines.value, bgColor.value, lineColor.value);
      break;
    case 'Square':
      drawSquareSVG(sizeValue.value, offsetValue.value, svgWidth.value, svgHeight.value, svgLines.value, bgColor.value, lineColor.value);
      break;
  }
})

// Download
const buttonDownload = document.getElementById('download')
buttonDownload.addEventListener('click', () => {
  initiateDownload();
  download(SVGSources[1]);
})

// colors
// get polygons color

console.log('hello');
const cx = document.querySelector("canvas").getContext("2d");

function hexCorner(center, size, i) {
  let point = {};
  let angle_deg = 60 * i;
  let angle_rad = Math.PI / 180 * angle_deg;
  point.x = center.x + size * Math.cos(angle_rad);
  point.y = center.y + size * Math.sin(angle_rad);
  return point;
}

// canvas drawing:

let center = {x: 100, y: 100};
let corners = [];

for (let i = 0; i <= 5; i++) {
  corners.push(hexCorner(center, 30, i));
}

cx.beginPath();
cx.moveTo(corners[0].x, corners[0].y);
for (let i = 1; i <= 5; i++){
  cx.lineTo(corners[i].x, corners[i].y);
}
cx.fillStyle = "blue";
cx.fill();
cx.closePath();

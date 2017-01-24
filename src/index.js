console.log('hello');
const cx = document.querySelector("canvas").getContext("2d");

function hexCorner(center, size, i) { // in progress
  var angle_deg = 60 * i;
  var angle_rad = PI / 180 * angle_deg;
}

cx.beginPath();
cx.rect(20, 20, 150, 150);
cx.fillStyle = "red";
cx.fill();
cx.closePath();

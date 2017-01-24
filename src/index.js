console.log('hello');
const cx = document.querySelector("canvas").getContext("2d");

cx.beginPath();
cx.rect(20, 20, 150, 150);
cx.fillStyle = "red";
cx.fill();
cx.closePath();

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  x = this.x + other.x;
  y = this.y + other.y;
  return new Vector(x, y);
}

Vector.prototype.multiply = function(factor) {
  x = this.x * factor;
  y = this.y * factor;
  return new Vector(x, y)
}

Vector.prototype.subtract = function(other) {
	x = this.x - other.x;
	y = this.y - other.y;
	return new Vector(x, y);
}

Vector.prototype.rotate = function(angle) {
	let nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	let ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));
  x = nx;
	y = ny;
	return new Vector(x, y);
}

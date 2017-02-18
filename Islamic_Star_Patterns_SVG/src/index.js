const canvas = document.getElementById('test');
const cx = canvas.getContext("2d");

let polyTest = new Polygon(4);
polyTest.addVertex(50,50);
polyTest.addVertex(150,50);
polyTest.addVertex(150,150);
polyTest.addVertex(50,150);
polyTest.close();
polyTest.hankin();
polyTest.show();

let vector1 = new Vector(10,20);
let vector3 = vector1.rotate(Math.PI / 2).setMagnitude(1);

console.log(vector3);

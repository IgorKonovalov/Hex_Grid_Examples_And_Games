const canvas = document.getElementById('test');
const cx = canvas.getContext("2d");

let polyTest = new Polygon(4);
polyTest.addVertex(100,100);
polyTest.addVertex(200,100);
polyTest.addVertex(200,200);
polyTest.addVertex(100,200);
polyTest.close();
polyTest.hankin();
polyTest.show();

console.log(polyTest);

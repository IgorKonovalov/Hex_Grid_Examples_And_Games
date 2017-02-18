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

console.log(polyTest.getHankins());

const container = document.getElementById('svgContainer');
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');

svg.setAttributeNS(null, "width", "740px");
svg.setAttributeNS(null, "height", "500px");
svg.setAttributeNS(null, "id", "starPattern");

for (let x = 0; x < 600; x += 100) {
  for (let y = 0; y < 400; y += 100) {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'tile');
    g.setAttribute('transform', 'translate('+ x + ',' + y + ')');
    const cell = document.createElementNS(svgNS, 'polygon');
    cell.setAttribute('points', polyTest.polygonPoints());
    g.appendChild(cell);
    svg.appendChild(g);
  }
}

container.appendChild(svg);

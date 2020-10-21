let img,view,xml,selecting,down,mouse;
let inp;
let table;
// let mode;

let areas = [];
let area; //current area
let tables = [];
let rulers = new Rulers();
let toolbar;
let menu;
let cellSelect;

const META = 91;
const SHIFT = 16;
const ALT = 18;

function preload() {
  xml = loadXML('data/02_alto.xml');
  img = loadImage("data/02.jpg");
}

function setup() {
  frameRate(40)
  createCanvas(windowWidth, windowHeight); //todo: clipping in WEBGL drawingContext = canvas.getContext('webgl');

  view = new Viewport(0, 0, width, height, img.width, img.height);

  p = new Page();
  p.parseAltoXML(xml);

  toolbar = new Toolbar();

  mouse = createVector();

  cellSelect = new CellSelect();

  loadSettings();
  // toolbar.setTool(toolbar.VRuler);
}

function draw() {
  // if (keyIsDown(32)) cursor(HAND);
  if (toolbar.tool==toolbar.Hand) cursor("all-scroll");
  else if (toolbar.tool==toolbar.Move) cursor("move");
  else if (toolbar.tool==toolbar.CellSelect) cursor("cell");
  else if (toolbar.tool==toolbar.AreaSelect) cursor(CROSS);
  else if (toolbar.tool==toolbar.HRuler) cursor("row-resize");
  else if (toolbar.tool==toolbar.VRuler) cursor("col-resize");

  // else cursor(CROSS);
  // print(toolbar.tool);

  background(0);
  view.begin();
  image(img,0,0);
  // ellipse(40,40,100,100);

  noFill();
  stroke(0);
  strokeWeight(1);
  for (let w of p.words) {
    let r = w.poly.getBounds();
    rect(r.x, r.y, r.width, r.height);
  }

  if (selecting) {
    noFill();
    fill(0,255,0,50);
    stroke(0,255,0);
    strokeWeight(2);
    rect(area.x, area.y, area.width, area.height);
  }

  for (let a of areas) {
    fill(0,255,0,50);
    stroke(0,255,0);
    strokeWeight(2);
    rect(a.x, a.y, a.width, a.height);
  }

  for (let t of tables) {
    t.draw();
  }

  rulers.draw();

  if (toolbar.tool==toolbar.CellSelect) cellSelect.draw();

  view.end();
}

function saveSettings() {
  print("saveSettings");
  storeItem('hRulers', rulers.hRulers);
  storeItem('vRulers', rulers.vRulers);
}

function loadSettings() {
  rulers.hRulers = getItem('hRulers') || [];
  rulers.vRulers = getItem('vRulers') || [];
  rulers.updateCells();
}

function onToolSelected(tool) {
  print("sketch.onToolSelected",tool);
  if (tool==toolbar.HRuler || tool==toolbar.VRuler) {
    rulers.show();
  }
  
}

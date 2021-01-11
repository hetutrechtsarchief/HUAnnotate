let img,view,xml,selecting,down,mouse;
let inp;
let table;
// let mode;

let thumbnails = [];
let areas = [];
let area; //current area
let tables = [];
let rulers = new Rulers();
let toolbar;
let exportMenu;
let pageSlider;
let menu;
let cellSelect;
let wordSelect;
let clipboard;
let page;
let lastToolChange = 0;
// let groups = [];
let entities = [];
let highliteWords = [];
let lastSearchQuery = ".*,";
let lastUsedType = "";
let mainSettings;
let docSettings;

const META_L = 91;
const META_R = 93;
const SHIFT = 16;
const ALT = 18;

let vid;
let collection;
let doc;


function preload() {
  mainSettings = loadJSON("data/settings.json", (e)=>{
    print(e.collection);
    print(e.document);
    docSettings = loadJSON("data/"+mainSettings.collection+"/"+mainSettings.document+"/info.json", (e)=>{
      docSettings.path = mainSettings.iiifserver+mainSettings.collection+"%2f"+mainSettings.document;
      print(docSettings)
    });
  });

  // xml = loadXML('data/adresboeken/1931/BIBLIO_STIJD_58-16104_Het-adresboek_1931_00041_alto.xml');
  // img = loadImage("data/adresboeken/1931/BIBLIO_STIJD_58-16104_Het-adresboek_1931_00041.jpg");

  xml = loadXML('data/adresboeken/1860/alto/MMUTRA01_001427001_00020_master.xml');
  img = loadImage("http://iiif2.hualab.nl/iiif/2/adresboeken%2f1860%2fMMUTRA01_001427001_00001_master.jpg/full/800,/0/default.jpg");
}

// img = loadImage("data/Saftleven-1669-27570.jpg");

function setup() {
  frameRate(40)
  createCanvas(windowWidth, windowHeight); //todo: clipping in WEBGL drawingContext = canvas.getContext('webgl');

  view = new Viewport(0, 0, width, height, img.width, img.height);

  // --- FIXME
  // collection = new Collection();
  // collection.currentDocument = new Document();
  // collection.currentDocument.currentPage = new Page();

  // collection = loadCollection(mainSettings.collection);
  // collection.loadDocument(mainSettings.document);

  page = new Page();
  page.parseAltoXML(xml);

  toolbar = new Toolbar();
  pageSlider = new PageSlider();
  exportMenu = new ExportMenu();

  mouse = createVector();

  cellSelect = new CellSelect();
  wordSelect = new WordSelect();

  loadSettings();

  toolbar.setTool(toolbar.WordSelect);

  clipboard = new Clipboard();


  // vid = createVideo(
  //   ['data/collections/adresboeken/1860/1860-thumb.mov'],
  //   vidLoad
  // );
  // vid.hide(); 
  //   vid.loop();

  for (let i=0; i<docSettings.filenames.length; i++) {
    let filename = docSettings.path + "%2f" + docSettings.filenames[i] + "/full/400,/0/default.jpg";
    thumbnails.push(loadImage(filename));
    //print(filename)
  }

  //   00001.jpg
  //   00002.jpg
  //   00010.jpg
  //   00100.jpg


  // }
  // 



}

// This function is called when the video loads
// function vidLoad() {
//   print("test")
//   vid.loop();
//   vid.volume(0);
// }

function draw() {

  // if (keyIsDown(32)) cursor(HAND);
  if (toolbar.tool==toolbar.Hand) cursor("all-scroll");
  else if (toolbar.tool==toolbar.Move) cursor("move");
  else if (toolbar.tool==toolbar.CellSelect) cursor("cell");
  else if (toolbar.tool==toolbar.AreaSelect) cursor(CROSS);
  else if (toolbar.tool==toolbar.Ruler) if (keyIsDown(ALT)) cursor("col-resize"); else cursor("row-resize");

  // else cursor(CROSS);
  // print(toolbar.tool);

  background(0);
  view.begin();
  image(img,0,0);
  // ellipse(40,40,100,100);

  for (let w of page.words) {
    w.draw();
  }

  for (let e of entities) {
    e.draw();
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

  for (let w of highliteWords) {
    fill(255,255,0,150);
    noStroke()
    let r = w.getBounds();
    rect(r.x, r.y, r.width, r.height);
  }

  rulers.draw();

  // if (toolbar.tool==toolbar.CellSelect) 
  cellSelect.draw();
// else if (toolbar.tool==toolbar.WordSelect) 
  wordSelect.draw();

  view.end();

  pageSlider.draw();
  
  // if (!focused) {
  //   fill(255,0,0);
  // } else {
  //   fill(0,255,0);
  // }
  // rect(0,0,100,100)

  
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
  lastToolChange = millis();

  if (tool==toolbar.Ruler) {
    rulers.show();
  } else if (tool==toolbar.CellSelect) {
    wordSelect.deselectAll();
  } else if (tool==toolbar.WordSelect) {
    cellSelect.deselectAll();
  }

}

function keyIsDownMeta() {
  return keyIsDown(META_L) || keyIsDown(META_R);
}

function printInfo() {
  for (let a of areas) {
    print("area",a);
  }
}

// function printCellInfo(cell) {
//   for (let w of page.words) {
//     let r = w.poly.getBounds();
//     if (r.intersects(cell)) {
//       if (cell.getIntersection(r).getArea() / r.getArea() > .5) {
//         print("Word:",w.txt); //, cell.getIntersection(r).getArea() / r.getArea());
//       }
//     }
//   }  
// }


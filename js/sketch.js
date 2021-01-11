let view,selecting,down,mouse;
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
let lastToolChange = 0;
// let groups = [];
let entities = [];
let highliteWords = [];
let lastSearchQuery = ".*,";
let lastUsedType = "";
let mainSettings;
let docSettings;
let loaded = false;

//state
let collection; //current collection
let doc; //current document
let page; //current page
let currentPageIndex = 14; //zero based

const META_L = 91;
const META_R = 93;
const SHIFT = 16;
const ALT = 18;


function setup() {
  frameRate(40)
  createCanvas(windowWidth, windowHeight);

  loadSettings((mainSettings, docSettings)=>{
    loaded = false;
    collection = new Collection();
    collection.currentDocument = doc = new Document();
    collection.currentDocument.currentPage = page = new Page();

    loadXML(docSettings.dataPath + "/" + docSettings.xmlFilenames[currentPageIndex], (xml)=>{

      print(docSettings.dataPath + "/" + docSettings.xmlFilenames[currentPageIndex])
      
      page.parseXML(xml); //automatically detects the type PageXML/AltoXML

      page.currentImageFilename = docSettings.imageFilenames[currentPageIndex]; //FIXME! now always 0

      img = loadImage(docSettings.imagePath + "%2f" + page.currentImageFilename + "/full/full/0/default.jpg", ()=>{

        for (let i=0; i<docSettings.imageFilenames.length; i++) {
          let filename = docSettings.imagePath + "%2f" + docSettings.imageFilenames[i] + "/full/400,/0/default.jpg";
          thumbnails.push(loadImage(filename));
        }
        setupInterfaceComponents();

        loaded = true;
      });

    });

  });
}

function setupInterfaceComponents() {
  toolbar = new Toolbar();
  pageSlider = new PageSlider();
  exportMenu = new ExportMenu();
  mouse = createVector();
  cellSelect = new CellSelect();
  wordSelect = new WordSelect();
  clipboard = new Clipboard();
  view = new Viewport(0, 0, width, height, img.width, img.height);
  toolbar.setTool(toolbar.WordSelect);
  pageSlider.setPage(currentPageIndex);

  rulers.hRulers = getItem('hRulers') || []; //read from localStorage
  rulers.vRulers = getItem('vRulers') || [];
  rulers.updateCells();
}

function loadSettings(cb) {
  print("loadSettings")
  mainSettings = loadJSON("data/settings.json", (e)=>{
    print(e.collection);
    print(e.document);
    docSettings = loadJSON("data/"+mainSettings.collection+"/"+mainSettings.document+"/info.json", (e)=>{
      docSettings.imagePath = mainSettings.iiifserver+mainSettings.collection+"%2f"+mainSettings.document;
      docSettings.dataPath = "data/"+mainSettings.collection+"/"+mainSettings.document;
      cb(mainSettings, docSettings);
    });
  });
}

function draw() {
  if (!loaded) return;
  if (!toolbar) return; // loading XML and Image might not be finished

  // if (keyIsDown(32)) cursor(HAND);
  if (toolbar.tool==toolbar.Hand) cursor("all-scroll");
  else if (toolbar.tool==toolbar.Move) cursor("move");
  else if (toolbar.tool==toolbar.CellSelect) cursor("cell");
  else if (toolbar.tool==toolbar.AreaSelect) cursor(CROSS);
  else if (toolbar.tool==toolbar.Ruler) if (keyIsDown(ALT)) cursor("col-resize"); else cursor("row-resize");

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

  cellSelect.draw();
  wordSelect.draw();

  view.end();

  pageSlider.draw();
}

function saveSettings() {
  print("saveSettings");
  storeItem('hRulers', rulers.hRulers);
  storeItem('vRulers', rulers.vRulers);
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


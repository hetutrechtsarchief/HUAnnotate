class CellSelect {
  
  constructor() {
    this.selectedCells = [];
    this.newlySelectedCells = [];
    this.area = new Rectangle();
    //elke Cell zou ook refs moeten hebben naar de Words die er in staan. Dus Cell zou een eigen class moeten krijgen.
    //misschien is Cell wel een Subclass van zoiets als (Text)Region/Group
  }

  mousePressed() {
    print("mousePressed in CellSelect")
    this.selecting = true;
    this.area = new Rectangle(down.x, down.y);

    let cell = this.getCellAtMouse();
    if (!cell) return;

    if (!keyIsDown(SHIFT) && !keyIsDown(ALT) && !keyIsDownMeta()) { // no ALT or SHIFT
      //single select
      this.selectedCells = [ cell ];

      wordSelect.selectedWords = [];

      printCellInfo(cell); //tmp

    } else if (keyIsDownMeta()) { 
      //toggle
      this.toggleCellSelection(cell);
    } else if (keyIsDown(ALT)) {
      //deselect
      this.deselectCell(cell);
    }
  }

  deselectCell(cell) {
    if (!cell) return;
    let i = this.selectedCells.indexOf(cell);
    if (i>-1) this.selectedCells.splice(i,1);
  }

  selectSingleCell(cell) {
    if (!cell) return;
    this.deselectAll();
    this.selectedCells.push(cell);
  }

  toggleCellSelection(cell) {
    if (!cell) return;
    let i = this.selectedCells.indexOf(cell);
    if (i>-1) this.selectedCells.splice(i,1);
    else this.selectedCells.push(cell);
  }

  getCellAtMouse() {
    for (let c of rulers.cells) {
      if (c.containsPoint(mouse.x,mouse.y)) {
        return c;
      }
    }
  }

  mouseDragged() {
    this.isDragging = true;
    let x1 = min(down.x, mouse.x);
    let y1 = min(down.y, mouse.y);
    let x2 = max(down.x, mouse.x);
    let y2 = max(down.y, mouse.y);
    this.area.setBounds(x1, y1, x2-x1, y2-y1);

    print(rulers.cells.length);

    this.newlySelectedCells = []; //tmp

    wordSelect.newlySelectedWords = [];  //?? tmp ?

    for (let c of rulers.cells) {
      if (this.area.intersects(c)) {
        this.newlySelectedCells.push(c);

        //select words in cell
        for (let w of this.getWordsAtCell(c)) {
          wordSelect.newlySelectedWords.push(w);
        }

      }
    }

    // print("this.newlySelectedCells",this.newlySelectedCells.length);
  }

  mouseClicked() {
    print("CellSelect click",this.isDragging); //hmm... niet echt nuttig.
  }

  mouseMoved() {
    let x1 = rulers.findLeft(mouse.x);
    let y1 = rulers.findUp(mouse.y);
    let x2 = rulers.findRight(mouse.x);
    let y2 = rulers.findDown(mouse.y);
    // this.selectedCells = [ new Rectangle(x1,y1,x2-x1,y2-y1) ];
  }

  mouseReleased() {
    print("mouseReleased")
    this.selecting = false;
    this.isDragging = false;

    if (keyIsDown(ALT)) { //ALT -> remove newlySelectedCells from selectedCells
      this.selectedCells = this.selectedCells.filter(item => !this.newlySelectedCells.includes(item));
    } else { // add newlySelectedCells to selectedCells
      this.selectedCells = this.selectedCells.concat(this.newlySelectedCells);
    }

    this.selectedCells = this.selectedCells.filter((v, i, a) => a.indexOf(v) === i); //unique
    this.newlySelectedCells = [];

    //words
    wordSelect.selectedWords = [];
    for (let c of this.selectedCells) {
      for (let w of this.getWordsAtCell(c)) {
        wordSelect.selectedWords.push(w);
      }
    }
    wordSelect.selectedWords = wordSelect.selectedWords.filter((v, i, a) => a.indexOf(v) === i); //unique
    wordSelect.newlySelectedWords = [];
  }

  deselectAll() {
    this.selectedCells = [];
  }

  selectAll() {
    this.deselectAll();
    this.selectedCells = this.selectedCells.concat(rulers.cells);
  }

  invertSelection() {
    print("invert");
    this.selectedCells = rulers.cells.filter(item => !this.selectedCells.includes(item));
  }

  createEntitiesFromCells(cells) {
    let cellEntities = [];
    for (let c of cells) {
      let e = new Entity();
      e.type = "cell";
      e.label = "cell";
      e.bounds = c.copy();
      cellEntities.push(e);
    }
    return cellEntities;
  }

  createTableFromSelectedCells() {
    let cellEntities = this.createEntitiesFromCells(this.selectedCells);

    let e = new Entity();
    e.type = "table";
    e.label = "table";
    e.addChildren(cellEntities);
    e.calculateBoundsFromChildren();

    entities.push(e)
  }

  showTypeDialog() {
    let type = prompt("Stel type in voor elke geselecteerde 'cell' (creëert nieuwe entities):", lastUsedType);
    if (!type) return;

    lastUsedType = type;

    if (type=="table") {
      this.createTableFromSelectedCells();
    }

    print("entities",entities);
  }

  keyPressed() {
    if (keyIsDownMeta() && key=='d') { this.deselectAll(); return true; } //return true used for 'reacted to event'
    else if (keyIsDownMeta() && key=='a') { this.selectAll(); return true; }
    else if (keyIsDownMeta() && key=='i') { this.invertSelection(); return true; }
    else if (keyCode==LEFT_ARROW) print("LEFT");
    else if (keyIsDownMeta() && key=='c') { this.copyData(); return true; }
    else if (key=='t') this.showTypeDialog();
  }

  isTableSelected() {
    return true;
  }

  getTextAtCell(cell) {
    let words = getWordsAtCell(cell);
    return words.map(o=>o.txt).join(" ");
  }

  getWordsAtCell(cell) {
    let words = [];
    for (let w of page.words) {
      let r = w.getBounds();
      if (r.intersects(cell)) {
        if (cell.getIntersection(r).getArea() / r.getArea() > .5) {
          words.push(w);
        }
      }
    }
    return words;
  }

  copyData() {
    let table = "<table><tr>";
    for (let c of this.selectedCells) {
      let s = getTextAtCell(c);
      table += "<td>"+s+"</td>"
    }
    table += "</tr></table>";

    print("copy")
    clipboard.copyHTML(table);
  }

  draw() {

    //draw this.area
    if (this.selecting) {
      noFill();
      stroke(0,0,255,200);
      strokeWeight(2);
      rect(this.area.x, this.area.y, this.area.width, this.area.height);
    }

    //draw selectedCells
    fill(0,128,255,50)
    noStroke();
    for (let r of this.selectedCells) {
      if (this.newlySelectedCells.indexOf(r)==-1) {
        rect(r.x,r.y,r.width,r.height); //draw only when not exists in newlySelectedCells
      }
    }

    // fill(128,128,255,50)
    if (!keyIsDown(18)) {
      fill(0,128,255,50);
      for (let r of this.newlySelectedCells) {
        rect(r.x,r.y,r.width,r.height);
      }
    }

    //draw allCells (tmp)
    // fill(255,0,0,50)
    // noStroke();
    // // let cells = this.getAllCells()
    // // print(cells.length)
    // for (let r of rulers.cells) {
    //   rect(r.x,r.y,r.width,r.height);
    // }

  }
}
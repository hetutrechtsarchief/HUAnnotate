class CellSelect {
  
  constructor() {
    this.selectedCells = [];
    this.newlySelectedCells = [];
    this.area = new Rectangle();
  }

  mousePressed() {
    print("mousePressed in CellSelect")
    this.selecting = true;
    this.area = new Rectangle(down.x, down.y);

    if (!keyIsDown(SHIFT) && !keyIsDown(ALT) && !keyIsDown(META)) { // no ALT or SHIFT
      this.selectedCells = [];
    } else if (keyIsDown(META)) {
      // toggleSelection()
      print("getCellAtMouse",this.getCellAtMouse())
    }
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
    for (let c of rulers.cells) {
      if (this.area.intersects(c)) {
        this.newlySelectedCells.push(c);
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

  keyPressed() {
    if (keyIsDown(META) && key=='d') { this.deselectAll(); return true; } //return true used for 'reacted to event'
    else if (keyIsDown(META) && key=='a') { this.selectAll(); return true; }
    else if (keyIsDown(META) && key=='i') { this.invertSelection(); return true; }
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
class WordSelect {

  constructor() {
    this.selectedWords = [];
    this.newlySelectedWords = [];
    this.area = new Rectangle();
  }

  mousePressed() {
    print("mousePressed in WordSelect")
    this.selecting = true;
    this.area = new Rectangle(down.x, down.y);

    let word = this.getWordAtMouse();
    // if (!word) return;

    if (!keyIsDown(SHIFT) && !keyIsDown(ALT) && !keyIsDownMeta()) { // no ALT or SHIFT
      //single select
      if (word) this.selectedWords = [ word ];
      else this.deselectAll();
      print("single select selectedWords",this.selectedWords);
    } else if (word && keyIsDownMeta()) { 
      //toggle
      this.toggleWordSelection(word);
    } else if (word && keyIsDown(ALT)) {
      //deselect
      this.deselectWord(word);
    }
  }

  deselectWord(word) {
    if (!word) return;
    let i = this.selectedWords.indexOf(word);
    if (i>-1) this.selectedWords.splice(i,1);
  }

  selectSingleWord(word) {
    if (!word) return;
    this.deselectAll();
    this.selectedWords.push(word);
  }

  toggleWordSelection(word) {
    if (!word) return;
    let i = this.selectedWords.indexOf(word);
    if (i>-1) this.selectedWords.splice(i,1);
    else this.selectedWords.push(word);
  }

  getWordAtMouse() {
    print("getWordAtMouse")
    for (let w of page.words) {
      let r = w.poly.getBounds();
      if (r.containsPoint(mouse.x,mouse.y)) {
        print(w.txt);
        return w;
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

    // print(rulers.words.length);

    this.newlySelectedWords = []; //tmp
    for (let w of page.words) {
      let r = w.poly.getBounds();
      if (this.area.intersects(r)) {
        this.newlySelectedWords.push(w);
      }
    }
    
    // print("this.newlySelectedWords",this.newlySelectedWords.length);
  }

  mouseClicked() {
    print("WordSelect click",this.isDragging); //hmm... niet echt nuttig.
  }

  mouseMoved() {
    // let x1 = rulers.findLeft(mouse.x);
    // let y1 = rulers.findUp(mouse.y);
    // let x2 = rulers.findRight(mouse.x);
    // let y2 = rulers.findDown(mouse.y);
    // this.selectedWords = [ new Rectangle(x1,y1,x2-x1,y2-y1) ];
  }

  mouseReleased() {
    print("mouseReleased")
    this.selecting = false;
    this.isDragging = false;

    if (keyIsDown(ALT)) { //ALT -> remove newlySelectedWords from selectedWords

      this.selectedWords = this.selectedWords.filter(item => !this.newlySelectedWords.includes(item));

    } else { // add newlySelectedWords to selectedWords
      this.selectedWords = this.selectedWords.concat(this.newlySelectedWords);
    }

    this.selectedWords = this.selectedWords.filter((v, i, a) => a.indexOf(v) === i); //unique
    this.newlySelectedWords = [];
  }

  deselectAll() {
    this.selectedWords = [];
  }

  selectAll() {
    this.deselectAll();
    this.selectedWords = this.selectedWords.concat(page.words);
  }

  invertSelection() {
    print("invert before:",this.selectedWords);
    this.selectedWords = page.words.filter(item => !this.selectedWords.includes(item));
  }

  groupSelection() { //into an entity
    let type = prompt("Wat is het 'type' van deze groep van " + this.selectedWords.length + " items?", lastUsedType);
    if (!type) return;
    lastUsedType = type;

    let e = new Entity();
    e.addChildren(this.selectedWords); //copy of the array, containing the original references to the children
    e.calculateBoundsFromChildren();
    e.type = type;
    let label = this.selectedWords.map(o=>o.txt).join(" ");
    e.label = prompt("Wat is het 'label' van deze groep?", label)
    entities.push(e);
  }

  showTypeDialog() {
    let type = prompt("Stel type in voor elk geselecteerde woord (creëert nieuwe entities):", lastUsedType);
    if (!type) return;
    lastUsedType = type;

    for (let w of this.selectedWords) {
      let e = new Entity();
      e.label = w.txt;
      e.type = type
      e.addChild(w);
      e.calculateBoundsFromChildren();
      entities.push(e);
    }
    this.deselectAll();
  }

  keyPressed() {
    if (keyIsDownMeta() && key=='d') { this.deselectAll(); return true; } //return true used for 'reacted to event'
    else if (keyIsDownMeta() && key=='a') { this.selectAll(); return true; }
    else if (keyIsDownMeta() && key=='i') { this.invertSelection(); return true; }
    // else if (keyIsDownMeta() && 
    else if (key=='f') { this.find(); return true; }
    else if (keyCode==LEFT_ARROW) print("LEFT");
    else if (keyIsDownMeta() && key=='c') { this.copyData(); return true; }
    else if (key=='t') this.showTypeDialog();
    else if (key=='g') this.groupSelection();
  }

  isTableSelected() {
    return true;
  }

  find() {
    let q = prompt("Zoekactie met Regular Expressions (bijv .*, of \\d+ of \\w{5,}\\. of ^\\w\\.)", lastSearchQuery);
    if (!q) return;
    
    lastSearchQuery = q;

    var re = new RegExp(q, "i");

    highliteWords = [];
    for (let w of page.words) {
      if (re.test(w.txt)) { ///let op w.txt (of later: .label)
        highliteWords.push(w);
        print("highlite",w);
      }
    }

    //add found words to selection
    this.selectedWords = highliteWords.slice(); ///this.selectedWords.concat(highliteWords);

    highliteWords = [];
  }

  copyData() {
    print("fixme");
    // let table = "<table><tr>";
    // for (let c of this.selectedWords) {
    //   let s = getTextAtWord(c);
    //   table += "<td>"+s+"</td>"
    // }
    // table += "</tr></table>";

    // print("copy")
    // clipboard.copyHTML(table);
  }

  draw() {

    //draw this.area
    if (this.selecting) {
      noFill();
      stroke(0,0,255,150);
      strokeWeight(1);
      rect(this.area.x, this.area.y, this.area.width, this.area.height);
    }

    //draw selectedWords
    fill(0,128,255,50)
    noStroke();
    for (let w of this.selectedWords) {
      if (this.newlySelectedWords.indexOf(w)==-1) {
        if (!w.poly) continue;
        let r = w.poly.getBounds();
        rect(r.x,r.y,r.width,r.height); //draw only when not exists in newlySelectedWords
      }
    }

    // fill(128,128,255,50)
    if (!keyIsDown(18)) {
      fill(0,128,255,50);
      for (let w of this.newlySelectedWords) {
        let r = w.poly.getBounds();
        rect(r.x,r.y,r.width,r.height);
      }
    }

    //draw allWords (tmp)
    // fill(255,0,0,50)
    // noStroke();
    // // let words = this.getAllWords()
    // // print(words.length)
    // for (let r of rulers.words) {
    //   rect(r.x,r.y,r.width,r.height);
    // }

  }

}
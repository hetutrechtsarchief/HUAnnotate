class Word {
  
  constructor(id, txt) {
    this.id = id;
    this.txt = txt;
    // this.selected = false;   
    this.hover = false;
    this.poly = new Polygon();
  }

  getBounds() {
    return this.poly.getBounds()
  }

  draw() {
    noFill();
    stroke(0);
    strokeWeight(1);

    let r = this.getBounds();
    stroke(0,50);
    rect(r.x, r.y, r.width, r.height);
  }
  
}
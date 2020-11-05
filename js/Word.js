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
    // if (this.selected) {
    //   fill(0,255,255,50);
    // } else {
    //   noFill();
    // }
    // stroke(0);
    noStroke();
    // noStroke();
    rect(r.x, r.y, r.width, r.height);
  }
  
}
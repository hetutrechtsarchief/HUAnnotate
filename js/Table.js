class Table {
  
  constructor() {
    this.bounds = new Rectangle();
    this.rowHeights = [];
    this.colWidths = [];
  }

  setBounds(r) {
    this.bounds = r.copy();
  }

  splitHorizontal(y) {
    this.rowHeights.push(y);
  }

  splitVertical(x) {
    this.colWidths.push(x);
  }

  draw() {
    noFill(0,0,255);
    fill(0,0,255,100);
    rect(this.bounds.x,this.bounds.y,this.bounds.width,this.bounds.height);

    stroke(255);
    strokeWeight(3);

    for (let r of this.rowHeights) {
      line(this.bounds.x,r,this.bounds.x+this.bounds.width,r);
    }

    for (let c of this.colWidths) {
      line(c,this.bounds.y,c,this.bounds.y+this.bounds.height);
    }

    // let x=this.bounds.x;
    // let y=this.bounds.y;
    // for (let yi=0; yi<this.rowYs.length; yi++) {
    //   for (let xi=0; xi<this.colXs.length; xi++) { 
    //     rect(x,y,this.colXs[xi]-x,this.rowYs[yi]-y);
    //   }
    // }
  }

}
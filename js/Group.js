class Group {
  
// een groep kan meerdere Words bevatten.
// Ook meerdere Cells?
// Moet een Cell niet ook Words bevatten?? Ja denk 't

  constructor(w) {
    this.words = w ? w : [];
    this.updateBounds();
  }

  updateBounds() {
    this.bounds = undefined; 
    for (let w of this.words) {
      if (!this.bounds) this.bounds = w.getBounds();
      else this.bounds.grow(w.getBounds());
    }
  }

  draw() {
    let r = this.bounds;
    stroke(255,0,0);
    rect(r.x, r.y, r.width, r.height);
  }

}
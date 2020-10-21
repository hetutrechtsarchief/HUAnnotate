class Word {
  
  constructor(id, txt) {
    this.id = id;
    this.txt = txt;
    this.selected = false;   
    this.hover = false;
    this.poly = new Polygon();
  }
  
}
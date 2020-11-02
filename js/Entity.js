class Entity { //=obj    ->   een visueel identificeerbare entiteit (bijv: een voorletter of een volledige naam die weer bestaan uit 3 kleine entiteiten)
  
  constructor() {
    this.id = ""; //GUID ?
    this.type = ""; //rdf:type
    this.label = ""; //rdfs:label
    // this.primaryRelation = ""; 
    this.children = []; //list of 'sub'entities


    this.relations = []; //pred + sub
    this.bounds = undefined; // boundingbox van de visuele verschijningsvorm binnen de context van de pagina/scan

  }

  // constructor(w) {
  //   this.words = w ? w : [];
  //   this.updateBounds();
  // }

  // makeLabelFromChildren() {
    
  // }

  addChildren(c) {
    if (!this.children) this.children = [];
    
    this.children = this.children.concat(c);
    print("addChildren",this.children)
    this.updateBounds();
  }

  getBounds() {
    return bounds.copy();
  }

  updateBounds() {
    this.bounds = undefined; 
    for (let child of this.children) {
      if (!this.bounds) this.bounds = child.getBounds();
      else this.bounds.grow(child.getBounds());
    }
  }

  draw() {
    if (!this.children || this.children.length==0) return;

    let r = this.bounds;
    stroke(255,0,0);
    rect(r.x, r.y, r.width, r.height);
    for (let child of this.children) {
      stroke(255,255,0);
      r = child.getBounds();
      rect(r.x, r.y, r.width, r.height);
    }
  }

}
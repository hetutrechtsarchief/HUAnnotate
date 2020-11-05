class Entity { //=obj    ->   een visueel identificeerbare entiteit (bijv: een voorletter of een volledige naam die weer bestaan uit 3 kleine entiteiten)
  
  constructor() {
    this.id = ""; //GUID ?
    this.type = ""; //rdf:type
    this.label = ""; //rdfs:label
    // this.primaryRelation = ""; 
    this.children = []; //list of 'sub'entities
    // this.relations = []; //pred + sub
    this.bounds = undefined; // boundingbox van de visuele verschijningsvorm binnen de context van de pagina/scan

  }

  addChildren(c) {
    if (!this.children) this.children = [];
    this.children = this.children.concat(c);
    // this.updateBounds();
  }

  addChild(c) {
    if (!this.children) this.children = [];
    this.children.push(c);
    // this.updateBounds();
  }

  getBounds() {
    if (this.bounds) return this.bounds.copy();
    else return;
  }

  calculateBoundsFromChildren() {
    ///het is niet altijd wenselijk om automatisch de bounds uit te rekenen...
    //bijvoorbeeld bij cellen als je de bounds van de cell wil bewaren en niet
    //de union van de children.

    this.bounds = undefined; 
    for (let child of this.children) {
      if (!this.bounds) this.bounds = child.getBounds();
      else this.bounds.grow(child.getBounds());
    }
  }

  draw() {
    // if (!this.children || this.children.length==0) return;
    let r = this.bounds;
    if (!r) return; //

    // stroke(255,0,0);

    if (this.type) {
      switch(this.type) {
        case 'voorletters': 
        case 'voornaam':
          fill(255,255,0,100); break;
        case 'achternaam': fill(0,255,255,100); break;
        case 'huisnummer': fill(255,0,255,100); break;
        case 'straat': fill(255,0,128,100); break;
        case 'beroep': fill(128,255,128,100); break;
        default: fill(255,0,0,50); break;
      }
    }
    rect(r.x, r.y, r.width, r.height);
    noStroke();

    // noFill();
    stroke(0,50);
    for (let child of this.children) {
      // stroke(255,255,0);
      r = child.getBounds();
      rect(r.x, r.y, r.width, r.height);
    }

    if (this.label) {
      fill(255);
      text(this.label, r.x,r.y);
    }

  }

}
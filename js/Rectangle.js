class Rectangle {

  constructor(x,y,w,h) {
    this.setBounds(x,y,w,h);
  }

  setBounds(x,y,w,h) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 0;
    this.height = h || 0;
  }

  copy() {
    return new Rectangle(this.x,this.y,this.width,this.height);
  }

  intersects(other) {
    return !(
    (other.x                > this.x + this.width)  || 
    (other.x + other.width  < this.x         )      ||
    (other.y                > this.y + this.height) ||
    (other.y + other.height < this.y         ));
  }

  containsPoint(x,y) {
    return x>=this.x && 
           y>=this.y && 
           x<=this.x+this.width && 
           y<=this.y+this.height;
  }

  getArea() {
    return this.width * this.height;
  }

  amountOfOverlap(other) { 
    //als ze precies gelijk zijn en overlappen dan 100% 
    //maar wat als de ene kleiner is dan de ander... dan gaat dit niet werken
    //ik wil eigenlijk weten voor hoeveel procent de een 'binnen' de ander valt.
    let a = this.copy();
    let b = other.copy();
    let xa1 = a.x;
    let xa2 = a.x + a.width;
    let xb1 = b.x;
    let xb2 = b.x + b.width;
    let ya1 = a.y;
    let ya2 = a.y + a.height;
    let yb1 = b.y;
    let yb2 = b.y + b.height;
    let sa = a.getArea();
    let sb = b.getArea();
    let si = max(0, min(xa2, xb2) - max(xa1, xb1)) * max(0, min(ya2, yb2) - max(ya1, yb1)); //surface area of intersection
    let su = sa + sb - si; //surface area of union
    return si / su;
  }
}
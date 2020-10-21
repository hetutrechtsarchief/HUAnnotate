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
    return p.x>=this.x && p.y>=this.y && 
           p.x<=this.x+this.width && p.y<=this.y+this.height;
  }
}
class PageSlider {
  
  constructor() {
    this.dragging = false;
    this.bounds = new Rectangle(0,0,100,100)
    this.slider = createSlider(0,docSettings.imageFilenames.length, 0, 1); //min, max, [value], [step]
    this.slider.position(50,height-50);
    this.slider.size(250,50);
  }

  setPage(pageNumber) {
    this.slider.value(pageNumber);
  }

  draw() {
    fill(255,255,0);
    let index = this.slider.value();
    if (index>=thumbnails.length) return;
    let img = thumbnails[index];
    let pos = this.slider.position();
    let aspectRatio = img.width/img.height
    image(img,pos.x,pos.y-400,400*aspectRatio,400);
    fill(255);
    rect(pos.x+100,pos.y,40,20);
    fill(0);
    textAlign(CENTER);
    text(index,pos.x+115,pos.y+15);
  }

  mousePressed() {
    print("mousePressed")
    if (this.bounds.containsPoint(mouseX,mouseY)) {
      this.down = createVector(mouseX, mouseY);
      this.dragging = true;
    }
  }

  mouseReleased() {
    this.dragging = false;
  }

  mouseDragged() {
    if (this.dragging) {
      this.bounds.x += (mouseX-this.down.x);
      this.bounds.y += (mouseY-this.down.y);
    }
  }

}
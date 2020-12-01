class PageSlider {
  
  constructor() {
    this.dragging = false;
    this.bounds = new Rectangle(0,0,100,100)

    // this.buttons = createDiv("");
    // this.buttons.class("toolbar");
    // this.buttons.position(20,height-100);

    this.slider = createSlider(0,193, 4, 1); //min, max, [value], [step]
    // this.slider.style('width', '200px');

    // this.slider = createSlider(5, "range");
    this.slider.position(width/2-270,height-50);
    this.slider.size(540,50)
    // slider.
    // slider.parent(this.buttons)
    
  }

  draw() {
    fill(255,255,0);

    // this.bounds.width = slider.value();
    //print(img);

    let val = this.slider.value();
    if (val!=this.prevValue) {
      let index = int(map(val,0,193,0,docSettings.filenames.length));
      let filename = docSettings.path + "/" + docSettings.thumbsFolder + "/" + docSettings.filenames[index];

      let self = this;
      self.preloadImg = loadImage(filename,(e)=>{
        // print(e)
        print(self.preloadImg, "XXX", self.img)
        self.img = self.preloadImg;
        // this.img = ;
      });
    }

    this.prevValue = val;
    this.bounds.x = val;
    // print(val)
    // background(val, 100, 100, 1);

    if (mouseIsPressed && this.img) {
      image(this.img,this.slider.position().x,this.slider.position().y-400,540,400);
    }

   // rect(this.bounds.x,this.bounds.y,this.bounds.width,this.bounds.height);
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
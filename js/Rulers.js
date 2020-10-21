class Rulers {
  
  constructor() {
    this.hRulers = [];
    this.vRulers = [];
    this.snap = 5;
    this.cells = [];
    this.visible = true;
  }

  toggle() {
    this.visible = !this.visible;
  }

  show() {
    this.visible = true;
  }

  updateCells() { //make sure rulers are sorted
    this.sortRulers(); //class method: numeric sort
    this.cells = [];

    for (let vi=-1, vn=this.vRulers.length; vi<vn; vi++) {
      for (let hi=-1, hn=this.hRulers.length; hi<hn; hi++) {
      
        let v = vi==-1 ? 0 : this.vRulers[vi];
        let h = hi==-1 ? 0 : this.hRulers[hi];
        let v2 = vi==-1 ? this.vRulers[0] : (vi<vn-1) ? this.vRulers[vi+1] : view.contentWidth;
        let h2 = hi==-1 ? this.hRulers[0] : (hi<hn-1) ? this.hRulers[hi+1] : view.contentHeight;

        this.cells.push(new Rectangle(v,h,v2-v,h2-h));
      }
    }
  }

  findLeft(x) {
    let maxX = 0;
    for (let v of this.vRulers) {
      if (v<=x) maxX = max(maxX, v);
    }
    return maxX;
  }

  findUp(y) {
    let maxY = 0;
    for (let v of this.hRulers) {
      if (v<=y) maxY = max(maxY, v);
    }
    return maxY;
  }

  findRight(x) {
    let minX = view.contentWidth;
    for (let v of this.vRulers) {
      if (v>=x) minX = min(minX, v);
    }
    return minX;
  }

  findDown(y) {
    let minY = view.contentHeight;
    for (let v of this.hRulers) {
      if (v>=y) minY = min(minY, v);
    }
    return minY;
  }

  addVRuler(x) {
    this.removeVRuler(x); //remove
    this.vRulers.push(x);
    this.updateCells();
  }

  addHRuler(y) {
    this.removeHRuler(y); //remove
    this.hRulers.push(y);
    this.updateCells();
  }

  removeVRuler(x) { //'snap' 3px
    for (let i=0; i<this.vRulers.length; i++) {
      if (abs(x-this.vRulers[i])<this.snap) {
        this.vRulers.splice(i,1);
        return;
      }
    }
  }

  removeHRuler(y) { //'snap' 3px
    for (let i=0; i<this.hRulers.length; i++) {
      if (abs(y-this.hRulers[i])<this.snap) {
        this.hRulers.splice(i,1);
        return;
      }
    }
  }

  sortRulers() {
    this.hRulers.sort((a,b)=>a<b?-1:a>b?1:0);
    this.vRulers.sort((a,b)=>a<b?-1:a>b?1:0);
  }

  clear() {
    this.vRulers = [];
    this.hRulers = [];
  }

  draw() {
    if (!this.visible) return;

    let hSnap = false;
    let vSnap = false;

    strokeWeight(1.5/view.getScale());
    
    //h-rulers
    for (let y of this.hRulers) {
      if (abs(y-mouse.y)<this.snap && toolbar.tool==toolbar.HRuler) {
        hSnap = true;
        stroke(255,255,0); 
      } else stroke(0,255,255);
      line(0,y,view.contentWidth,y);
    }

    //v-rulers
    for (let x of this.vRulers) {
      if (abs(x-mouse.x)<this.snap && toolbar.tool==toolbar.VRuler) {
        vSnap = true;
        stroke(255,255,0); 
      } else stroke(0,255,255);
      line(x,0,x,view.contentHeight);
    }
  
    //potentional new ruler (under mouse cursor)
    stroke(0,255,255);
    if (toolbar.tool==toolbar.HRuler && !hSnap) {
      line(0,mouse.y,view.contentWidth,mouse.y);
    } else if (toolbar.tool==toolbar.VRuler && !vSnap) {
      line(mouse.x,0,mouse.x,view.contentHeight);
    }
  }


}
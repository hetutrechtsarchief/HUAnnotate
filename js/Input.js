function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  view.zoomBy(-event.delta * .01)
}

function updateMouse() {
  if (view) {
    mouse = view.fromScreenToView(mouseX, mouseY);
  }
}

function mousePressed() {
  updateMouse();
  down = view.fromScreenToView(mouseX, mouseY); //in Viewport coordiates

  // if (toolbar.tool=="splitVertical") {
  //   table.splitVertical(down.x);
  // } else if (toolbar.tool=="splitHorizontal") {
  //   table.splitHorizontal(down.y);
  // } else 
  if (toolbar.tool==toolbar.AreaSelect) {
    area = new Area(down.x, down.y, 0, 0);
  }
  else if (toolbar.tool==toolbar.CellSelect) {
    cellSelect.mousePressed();
  }


  // if (keyIsDown(16) || keyIsDown(18)) { //SHIFT or ALT
  //   // box = new Rectangle(mouseX, mouseY, 0, 0);
  // }
}

function mouseMoved() {
  if (frameCount==0) return;
  updateMouse();

  if (toolbar.tool==toolbar.CellSelect) {
    cellSelect.mouseMoved();
  }
}

function mouseDragged() {
  updateMouse();

  if (toolbar.tool==toolbar.CellSelect) {
    cellSelect.mouseDragged();
  } else if (toolbar.tool==toolbar.AreaSelect) { //keyIsDown(16) || keyIsDown(18)) { //SHIFT or ALT
    selecting = true;
    let x1 = min(down.x, mouse.x);
    let y1 = min(down.y, mouse.y);
    let x2 = max(down.x, mouse.x);
    let y2 = max(down.y, mouse.y);
    area.setBounds(x1, y1, x2-x1, y2-y1);
  }

  //if dragging an existing ruler just remove it
  if (toolbar.tool==toolbar.HRuler) rulers.removeHRuler(down.y); ///not mouse, but down
  else if (toolbar.tool==toolbar.VRuler) rulers.removeVRuler(down.x);


  // if (keyIsDown(16)) { //SHIFT
  //   // print("SHIFT")
  // }
  // else if (keyIsDown(18)) { //ALT
  //   // print("ALT")
  // } else {

  if (keyIsDown(32)) {
    view.moveBy(movedX, movedY);
  }
}

function mouseClicked() {
  if (toolbar.tool==toolbar.HRuler) rulers.addHRuler(mouse.y);
  else if (toolbar.tool==toolbar.VRuler) rulers.addVRuler(mouse.x);
  else if (toolbar.tool==toolbar.CellSelect) cellSelect.mouseClicked();
}

function mouseReleased() {
  updateMouse();
  selecting = false;
  print("area",area)

  if (toolbar.tool==toolbar.AreaSelect) {
    if (area && area.width>0 && area.height>0) {
      areas.push(area);
    }
  } 

  else if (toolbar.tool==toolbar.CellSelect) {
    cellSelect.mouseReleased();
  }
}

function keyPressed() {

  if (toolbar.tool==toolbar.CellSelect) {
    if (cellSelect.keyPressed()) {
      return false; //preventDefault when tool already reacted to event
    }
  }

  toolbar.keyPressed();

  if (key=='c') {
    areas = [];
    tables = [];
    rulers.clear();
    cellSelect.deselectAll();
  } else if (keyCode==BACKSPACE) {
    if (toolbar.tool==toolbar.HRuler) rulers.removeHRuler(mouse.y);
    else if (toolbar.tool==toolbar.VRuler) rulers.removeVRuler(mouse.x);
  } else if (key=='l') {
    loadSettings();
  } else if (key=='\'') {
    rulers.toggle();
  } else if (keyIsDownMeta() && key=='s') {
    saveSettings();
    return false; //preventDefault
  } else if (keyCode==27) {
    toolbar.setTool(toolbar.CellSelect);
  }
}

function keyReleased() {
  if (key==' ' && toolbar.tool==toolbar.Hand) {
    toolbar.setTool(toolbar.prevTool);
  }
}



class Toolbar {

  constructor() {
    this.buttons = createDiv("");
    this.buttons.class("toolbar");
    this.buttons.position(20,20);

    // this.Move = this.makeButton("move tool (m)","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAAHlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3KG9qAAAACnRSTlMA/u4sDXdPocXZFvB9nQAABIlJREFUeJztmrtP3EAQh60cGCj3IsJdxyMioYM7FInOIgXQ5aSAUpogoZSgJKI9pDw7LiQS/Lc5v3Z27Zl9TpEiU529u5/HuzO/WfucJP/tv/0j9oYbuMYNFFfcwEHGDBRfuIHDXWaguOcG9lldnAPFNjewnzMDxTNuoGBMwAq4yg1kTMAayKcRNZAvARsgm0Y0QLYElEAujRDcLgKQSSMAyKQRClDk3ECWBFSBLBqhATkSUANyaIQOZEhAHcigES3gIDq6W8D4BGwDozWiDRRb3MDYIt0BxhbpLjAyARFgnEYgwLgExIBRGoEBoxIQBcZoBAqMcREHRiQgDozQCAIYXqQJYHiRpoDBRZoEhiYgCQzVCBoYmIA0MFAjDMC1jBkYloAmYJBGmIBBCWgEhmiEERhSpM3AgCJtBgYUaQvQPwFtQG+NsAG9E9AK9NUIK9DXRTvQMwHtQE+NcAD6JaAD0E8jXIBeRdoF6FWknYA+RdoN6JGAbkAPjXAEurvoCHRPQFegs0a4Ap0T0BnoqhHOwHYCHhPp4w7UNWLhliix7kC9SJ9QGe4BVIt0b0ZluCPr4fvN6aXi0oGgdgEW0s6Pm9Ozi/32qMJBYhdAgR5uPp9djjP0rioHBS5CBNAsBpWDuIsE8LkROGq6IS4SQKO69DYM3Qjg0MlBbGoIoEn0wUHMRQo4pYHv1X4dFyngU9rBn4+/NqtOmzuP38zA7dvml01Qiz5kg7T+7rn8nXEA75MVenICgHPFW5QH6wzAedlYMMWsL7CsGtfS3XhgWXr35GEeC6wCZVkeT2OB1bKm8pgObTdgswgz3WPNegRQOQ/AvD4xkWeyDvADAVy80hsKkyXssDUHqoMvKeCq3iDUbfSSBK63gaOhPg6AysXrwbDP6HVmVbZsUMAlpbpUY9VthhScdmiPBA2EqK3Gqns1EJw8UW0u1H0auKU26Fs1EJypBpzXYgq4rCxCOVLb74LgaKFd1GIKuKKsQjeEQXC08wcaogts7hIJuOsG2M90B0ngE2UdkPDYw0L7RNhsTQLzFhAE5w7mYWYF1iuB7BtBcCBcj+28+k6xna30ZiBP3RpA+j1jT9cT2UfOxojmSJuWPbHnfxAcGaDqfoawYVb2xB6QQHAgtO0u1smXIUAQHAjt1OpijpAak0ughHapGdBFOyoC21jHQXAgtFMDsEg94/MvCA6EdnEVgzgMEpOB4Cj7/NQoX7+NQBAc9cLnBsW2vdq5li4qHVMD0PZqdU8C1bmeuFQ93EBwVNVeJIHWNxIgOFp4vaOAUxsQBEdV7SQlgD21E24TJLQ108PcbiA4d3gHXyAIDhEQvkAQHCKnfIGK5tMvP7yAIDi4jHgDQXDwvbY3EAQHV05vIAiOFtrhQEVwWqHduxyP97OiYeH1+NWFM1AKzov2MkMWCZ/3+o3g/MnaLanC8/h3shrW/4g0KTXa57+R2bz/8C3W0pNR7/UH0wSZvtqOiPUy26H4mhku5u1gsoRNX231BOdeQKOV6xL7NZJqxbrwfnd9xP3ZdTLh/nY9/dQ59RekakVzGMynzAAAAABJRU5ErkJggg==")
    // this.AreaSelect = this.makeButton("select text (t)","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgAQMAAACxAfVuAAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlMA/iyWEiMAAAA9SURBVHicY2AYBVQF/0EASsO5g1EQi9NHBckXHAUjEwzCpDgqSAfBUTAywSBMiqOC9BAchE04bIKjgKoAACuiXrD5nX1PAAAAAElFTkSuQmCC");
    this.CellSelect = this.makeButton("select cells (s)","img/select-cells.png");
    this.WordSelect = this.makeButton("word cells (w)","img/select-text.png");
    this.CellSelect = this.makeButton("select cells (s)","icons/select-cells.png");
    this.WordSelect = this.makeButton("word cells (w)","icons/select-text.png");
    // this.HRuler = this.makeButton("horizontal ruler","icons/h-ruler.png");
    this.Ruler = this.makeButton("ruler","img/h-ruler.png");

    this.Hand = this.makeButton("hand tool (space)", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAAHlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3KG9qAAAACnRSTlMA/w/xgcApBeBI4LcAVQAAAyNJREFUeJzt2s+P0kAUB/CGIITjpMMGb03cgx5rUK8lstG9UQN6hQhmj3tw945u1CN78cd/K+30xwyF+fW+MRo7p5ahn7z2zaNlOkFg0/oX8d3O6puWbcMYG0Y4r7Pdg+wNDuxmHhviwEc5yBIYOBHgU7F3+4EMpgLk+c55zMZLIrgV4Cjb7mc6vyZ5feGxMNsRCXpLAjsyuBLBLmFgkaB3MFBJEAIsEsQ8nN7FfNcEmT84KX8QZLDjD3arHwQQeF9dewzYF1d/BwNFRbAZDHwgjjuDgat6AGPAosSGMDBtIjQwBoPHkH8TvP0VQcFNzIZLIJiX0xgIisFq9RhlBRb1/hUGSuWJAVOxafUUZQWqGW/BFmzBFmzBFmzBFmzBFvzLwOxxf0AFM6Rbbs+q/+UE8HkQvC+3eTG1QQJHu145mcTCZBCTQTaqPGXbHzzR/kPwGg3u6rlZDDiTBjwE5NVcEQgMX22qbQgoNxuwb2bcwMDM/FlwvZhGSDAbUc+WQDAfUXwJA3tx/vkYBpY3igQFFjNEyhQRCayKMgGBadnDQWB960kwYFx1cQwo9SUQULrzcgiYHgmRBE6kTo4AV3JvAgC7ci8HgMpFLEKkgTfNEGlgbyv3J3SwfkitQiSCSlryEImgMhTzEKlgI0QqmL96l0OkgsHVQYhksLjzVSGSwfovjQiRDqpp4XRQHTlO7QR4Yz7SDexszYc6gWpBI8CB+VA30DstJ8Gu+Vg3UC1oABg8RoNqQQPAg4IGgH5p0YB+I0cH+hT0SAf6FLT+7a1HQevfL3sU9EMt6JGWF3rQfeTM9KB7QSd60Lmgw8gAuha0eRHBvRt4ZgQd02LISdbcRo7Fyg6nEK2WTbiEaL6EjiEmNmDw0tobRVZgPb1saoZfhqpdmSmXM96XS2rnDa1XxH60Az/ZepZ5cVkPa3XSX+w9q5N2XLD70wg6LinumCrQeZn7QH+TDhNHb38ZY+AJ522t8cZeq7w3Jz0e+XinRf917euj1/HOM76snacNLrz054JsYfaBN/9B8vbtyWspuvl3KpeT08VnFn5bTC8j/Rd/A77Qy3Uri4NyAAAAAElFTkSuQmCC");

  }

  makeButton(alt,imageData) {
    let button = createButton("");
    button.attribute("title",alt);
    button.parent(this.buttons);
    button.mousePressed(this.onToolSelect);
    let img = createImg(imageData,alt);
    img.parent(button);
    return button;
  }

  onToolSelect() { //scope = button
    toolbar.setTool(this);
  }

  setTool(tool) {
    print("toolbar.setTool",tool);
    this.prevTool = this.tool;

    for (let b of selectAll('.toolbar button')) {
      b.removeClass("selected");
    }

    tool.class("selected");
    this.tool = tool;

    onToolSelected(tool); //in main/root sketch
  }

  keyPressed() {
    if (key=='r') this.setTool(this.Ruler);
    // else if (key=='h') this.setTool(this.HRuler);
    // else if (key=='a') this.setTool(this.AreaSelect);
    // else if (key=='m') this.setTool(this.Move);
    else if (key=='s') this.setTool(this.CellSelect);
    else if (key=='w') this.setTool(this.WordSelect);
    else if (key==' ' || key=='h') this.setTool(this.Hand);
  }


}



class Page {
  
  constructor() {
    this.words = [];
  }

  parsePageXML(xml) {
    print("fixme");
    // return;

    // for (let page of xml.getChildren("Page")) {
    //   let w = page.getString("imageWidth");
    //   let h = page.getString("imageHeight");
    //   for (let textRegion of page.getChildren("TextRegion")) {
    //     let textRegionId = textRegion.getString("id");
    //     for (let textLine of textRegion.getChildren("TextLine")) {
    //       let textLineId = textLine.getString("id");
    //       for (let wordXML of textLine.getChildren("Word")) {
    //         print(wordXML)
    //         // Word word = new Word(wordXML.getString("id"), "");
    //         // words.add(word);
    //         // for (let coordXML of wordXML.getChildren("Coords")) {
    //         //   let coords[] = coordXML.getString("points").split(" ");

    //         //   for (let c of coords) {
    //         //     let xy[] = c.split(",");
    //         //     word.poly.addPoint(int(xy[0]), int(xy[1]));
    //         //   }
    //         //   for (let textEquiv of wordXML.getChildren("TextEquiv")) {
    //         //     word.txt = textEquiv.getContent("Unicode");
    //         //   }
    //         // }
    //       }
    //     }
    //   }
    // }
  }

  parseAltoXML(xml) {
    this.words = [];

    for (let layout of xml.getChildren("Layout")) {
      for (let page of layout.getChildren("Page")) {
        for (let printspace of page.getChildren("PrintSpace")) {
          for (let textblock of printspace.getChildren("TextBlock")) {
            for (let textline of textblock.getChildren("TextLine")) {
              let strings = textline.getChildren("String");
              for (let i=0; i<strings.length; i++) {
                let id = strings[i].getString("ID");
                let txt = strings[i].getString("CONTENT");
                let x = int(strings[i].getString("HPOS"));
                let y = int(strings[i].getString("VPOS"));
                let w = int(strings[i].getString("WIDTH"));
                let h = int(strings[i].getString("HEIGHT"));
                
                let word = new Word(id, txt);
                word.poly.addPoint(x,y);
                word.poly.addPoint(x+w,y+h);
                this.words.push(word);                
              }
            }
          }
        }
      }
    }

  }


}
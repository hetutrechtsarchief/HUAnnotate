class Clipboard {

  copyHTML(message) {
  //     message = "<table><tr><td>a</td><td>b</td></tr></table>";
    navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
      if (result.state === 'granted') {
        const type = 'text/html';
        const blob = new Blob([message], { type });
        let data = [new ClipboardItem({ [type]: blob })];
        navigator.clipboard.write(data).then(function() {
          print("copy ok");
            // $.growl.notice({ message: ResourceService.getKey("CopyToClipboardSuccess"), location: "tc", title: "" });
        }, function() {
          print("copy not ok");
            // $.growl.error({ message: ResourceService.getKey("CopyToClipboardError"), location: "tc", title: "" });
        });
      }
    });
  }

}
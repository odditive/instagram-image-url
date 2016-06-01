//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) {
        clickedEl = event.target.parentElement.childNodes[0].childNodes[0];
    }
}, true);

function copyToClipboard(text) {
  var input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};

function openInNewTab(url) {
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function download(url) {
    var a = document.createElement("a");
    a.download = true;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(clickedEl){
    if(clickedEl.src){
      url = clickedEl.src;
      if(request.text == 'copy') {
        copyToClipboard(url);
      }
      if(request.text == 'new') {
        openInNewTab(url);
      }
      if(request.text == 'get') {
        download(url);
      }
    }
  }
});

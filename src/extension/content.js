//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) {
        clickedEl = event.target;
    }
}, true);

function copyToClipboard(text) {
  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(clickedEl.dataset){
    if(clickedEl.dataset.reactid){
      var start = clickedEl.dataset.reactid.search("https=2");
      var end = clickedEl.dataset.reactid.search("=1jpg") + 5;
      var url = clickedEl.dataset.reactid.substr(start, end - start);
      url = url.replace(/=2/g, ":");
      url = url.replace(/=1/g, ".");
      if(request.text == 'copy') {
        copyToClipboard(url);
      }
    }
  }
});

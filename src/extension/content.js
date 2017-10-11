//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) {
        clickedEl = event.target.parentElement.childNodes[0].childNodes[0];
    }
}, true);

function copyToClipboard(text) {
   var oncopy = function (event) {
     event.clipboardData.setData("text", text);
     event.preventDefault();
   };
   document.addEventListener('copy', oncopy, false);
   document.execCommand("Copy", false, null);
   document.removeEventListener('copy', oncopy, false);
};

function openInNewTab(url) {
  chrome.runtime.sendMessage({ greeting: "instagram_image_new_tab", url: url }, function (response) {});
}

function download(url) {
  chrome.runtime.sendMessage({ greeting: "instagram_image_download", url: url }, function (response) { });
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
  return;
});

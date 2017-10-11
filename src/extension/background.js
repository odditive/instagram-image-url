'use strict';

function genericOnClick(text) {
  chrome.tabs.query({
    'active': true,
    'currentWindow': true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      'text': text
    });
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "instagram_image_new_tab"){
    chrome.tabs.create({ url: request.url });
  }
  if (request.greeting == "instagram_image_download") {
    chrome.downloads.download({ url: request.url });
  }  
});

// Create context menu item
chrome.contextMenus.create({
  type: 'normal', // the default textual option
  title: 'Copy Instagram Image URL', // the text that is displayed
  contexts: ['page'], // only display on selected text
  onclick: function() {
    genericOnClick('copy');
  },
  documentUrlPatterns: ["http://www.instagram.com/*",
            "https://www.instagram.com/*"] // show on all addresses
});
chrome.contextMenus.create({
  type: 'normal', // the default textual option
  title: 'Open Instagram Image in New Tab', // the text that is displayed
  contexts: ['page'], // only display on selected text
  onclick: function(obj) {
    genericOnClick('new');
  },
  documentUrlPatterns: ["http://www.instagram.com/*",
            "https://www.instagram.com/*"] // show on all addresses
});
chrome.contextMenus.create({
  type: 'normal', // the default textual option
  title: 'Download Instagram Image', // the text that is displayed
  contexts: ['page'], // only display on selected text
  onclick: function(obj) {
    genericOnClick('get');
  },
  documentUrlPatterns: ["http://www.instagram.com/*",
            "https://www.instagram.com/*"] // show on all addresses
});

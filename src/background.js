chrome.extension.onMessage.addListener(
  function (message, sender, sendResponse) {
    if (message.name == "getNextWords") {
      if (localStorage["nextwords"] == null || localStorage["nextwords"].length == 0) {
        loadDefaultNextWords();
      }
      
      sendResponse({ nextwords: localStorage["nextwords"] });
      return;
    }
    
    if (message.name == "getExcludedUrls") {
      if (localStorage["excludedUrls"] == null || localStorage["excludedUrls"].length == 0) {
        loadDefaultExcludedUrls();
      }
      
      sendResponse({ excludedUrls: localStorage["nextwords"] });
      return;
    }
    
    if (message.name == "isDebugEnabled") {
      sendResponse({ isDebugEnabled: localStorage["isDebugEnabled"] });
      return;
    }
    
    if (message.name == "debugLog") {
      console.log(message.log);
      return;
    }
  }
);
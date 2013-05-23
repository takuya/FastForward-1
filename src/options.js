function saveAll() {
  saveElements("nextwords");
  saveElements("excludedUrls");
  
  history.go(0);
}

function saveElements(elementType) {
  var fields = document.getElementById(elementType).children;
  var str = "";
  
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].firstChild.value != "") {
      str += fields[i].firstChild.value + "\n";
    }
  }
  
  localStorage[elementType] = str;
}

function saveDebug() {
  if (document.getElementById("debug").checked) {
    localStorage["isDebugEnabled"] = "true";
  } else {
    localStorage["isDebugEnabled"] = "false";
  }
}

function resetAll() {
  if(confirm("Reset all optoins?")) {
    loadDefaultNextWords();
    loadDefaultExcludedUrls();
    localStorage["isDebugEnabled"] = "false";
    
    history.go(0);
  }
}

function restoreAll() {
  if (localStorage["isDebugEnabled"] != null && localStorage["isDebugEnabled"] == "true") {
    document.getElementById("debug").checked = true;
  }
  
  restore("nextwords", "nextword");
  restore("excludedUrls", "excludedUrl");
}
  
function restore(elementType, elementInstance) {
  if (localStorage[elementType]) {
    var keywords = localStorage[elementType].trim().split("\n");
  
    for (var i = 0; i < keywords.length; i++) {
      if (keywords[i] != null && keywords[i] != "") {
        addElement(elementType, elementInstance, keywords[i]);
      }
    }
  }
  
  addElement(elementType, elementInstance, "");
}

function addWord() {
  addElement("nextwords", "nextword", "");
}

function addExcludedUrl() {
  addElement("excludedUrls", "excludedUrl", "");
}

function addElement(elementType, elementInstance, elementValue) {
  var elements = document.getElementById(elementType);
  var element = document.createElement("div");
  
  element.class = elementInstance;
  //element.setAttribute("class", elementInstance);
  
  var elementText = document.createElement("input");
  
  elementText.class = elementInstance;
  if(isString(elementValue)) {
    elementText.value = elementValue;
  }
  element.appendChild(elementText);
  elements.appendChild(element);
}

function isString(o) {
  return typeof o == "string" || (typeof o == "object" && o.constructor === String);
}

document.addEventListener('DOMContentLoaded', restoreAll);

document.querySelector('#addword').addEventListener('click', addWord);
document.querySelector('#save').addEventListener('click', saveAll);

document.querySelector('#addExcludedUrl').addEventListener('click', addExcludedUrl);
document.querySelector('#save').addEventListener('click', saveAll);

document.querySelector('#debug').addEventListener('click', saveDebug);
document.querySelector('#reset').addEventListener('click', resetAll);
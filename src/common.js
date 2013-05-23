function loadDefaultNextWords() {
  localStorage["nextwords"] = DefaultNextWords.join("\n");
}

function loadDefaultExcludedUrls() {
  localStorage["excludedUrls"] = DefaultExcludedUrls.join("\n");
}
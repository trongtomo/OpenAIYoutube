require("dotenv").config();
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "modifyQuery") {
    const modifiedResult = fetchModifiedSearchResults(request.query);
    sendResponse({ modifiedResult });
  }
});


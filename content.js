// content.js

// Extract the search query from the current page's URL
const currentUrl = window.location.href;
const searchQuery = extractSearchQuery(currentUrl);

// Send a message to the background script to initiate API request
chrome.runtime.sendMessage({
  action: "generateModifiedSearchTerms",
  searchQuery: searchQuery
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.modifiedSearchTerms) {
    // Use the modified search terms to construct the modified URL
    const modifiedSearchTerms = message.modifiedSearchTerms;
    const modifiedUrl = constructModifiedUrl(currentUrl, modifiedSearchTerms);

    // Open a new tab with the modified URL
    chrome.tabs.create({ url: modifiedUrl });
  }
});

// Function to extract the search query from the URL
function extractSearchQuery(url) {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  const searchQuery = searchParams.get("q");
  return searchQuery;
}

// Function to construct the modified URL
function constructModifiedUrl(originalUrl, modifiedSearchTerms) {
  const encodedSearchTerms = encodeURIComponent(modifiedSearchTerms);
  return originalUrl + "?q=" + encodedSearchTerms;
}

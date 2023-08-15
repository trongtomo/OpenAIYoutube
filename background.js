chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getKeyword") {
    // Retrieve the keyword from storage and send it as a response
    chrome.storage.local.get("keyword", ({ keyword }) => {
      console.log(`${keyword}`); // Log the retrieved keyword
      sendResponse({ keyword });
    });
    return true; // To indicate that the response will be sent asynchronously
  } else if (message.action === "searchSubmitted") {
    const userInput = message.keyword;
    // Store the user input keyword in storage
    chrome.storage.local.set({ keyword: userInput }, () => {
      console.log(`${userInput}`); // Log the stored keyword
    });
  }
});
chrome.storage.local.get("keyword", ({ keyword }) => {
  console.log("Retrieved keyword from storage:", keyword);
});
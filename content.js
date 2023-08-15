console.log("Sending searchSubmitted message");
chrome.runtime.sendMessage({
  action: "searchSubmitted",
  keyword: userInput
});
const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener("search", () => {
  const userInput = searchInput.value;
  chrome.runtime.sendMessage({
    action: "searchSubmitted",
    keyword: userInput,
  });
});

console.log("Sending getKeyword message");
chrome.runtime.sendMessage({ action: "getKeyword" }, (response) => {
  console.log("Received response:", response);
  // ...
});
document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({ action: "getKeyword" }, (response) => {
    const keyword = response.keyword;
    const popupDiv = document.getElementById("popup");
    popupDiv.textContent = `You searched for: ${keyword || "No search yet"}`;
  });
});
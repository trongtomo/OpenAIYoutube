require("dotenv").config();

chrome.action.onClicked.addListener(async (tab) => {
  const currentUrl = tab.url;

  // Extract the search query from the URL
  const searchQuery = extractSearchQuery(currentUrl);

  // Call the OpenAI API to generate modified search terms
  const modifiedSearchTerms = await generateModifiedSearchTerms(searchQuery);

  // Construct the modified search URL
  const modifiedUrl = constructModifiedUrl(currentUrl, modifiedSearchTerms);

  // Open a new tab with the modified URL
  chrome.tabs.create({ url: modifiedUrl });
});

async function generateModifiedSearchTerms(searchQuery) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/engines/davinci/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // Customize the input prompt based on the user's search query
  const inputPrompt = `Enhance search results for YouTube query: ${searchQuery}`;

  // Customize the options based on your requirements
  const data = {
    prompt: inputPrompt,
    max_tokens: 50, // Adjust this value as needed
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result.choices[0].text;
}

function constructModifiedUrl(originalUrl, modifiedSearchTerms) {
  // Modify the URL using the generated search terms
  // For example, you can replace spaces with plus signs for URL encoding
  // Modify this logic based on your requirements
  const encodedSearchTerms = encodeURIComponent(modifiedSearchTerms);

  // Construct the new URL with the modified search terms
  return originalUrl + "?q=" + encodedSearchTerms;
}

function extractSearchQuery(url) {
  // Extract the search query from the URL
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  const searchQuery = searchParams.get("q");
  return searchQuery;
}

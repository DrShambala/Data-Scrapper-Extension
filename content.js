// Function to get text from elements with specified selectors and font size greater than 15px
function scrapeTextAndNumbers() {
  const selectors = 'h1, h2, h3, h4, h5, h6, div';
  const elements = document.querySelectorAll(selectors);
  const scrapedText = [];
  const phoneNumbers = [];
  const phonePattern = /\b0\d{4}\s\d{5}|\b0\d{5}\s\d{4}\b/g;

  elements.forEach(element => {
    const fontSize = window.getComputedStyle(element).fontSize;
    if (parseFloat(fontSize) > 15 ) {
      const text = element.innerText.trim();
      scrapedText.push(text);

      const foundNumbers = text.match(phonePattern);
      if (foundNumbers) {
        phoneNumbers.push(...foundNumbers);
      }
    }
  });
 
  return {
    text: scrapedText.filter(text => text.length > 0),
    numbers: phoneNumbers
  };
}

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeTextAndNumbers") {
    const result = scrapeTextAndNumbers();
    sendResponse(result);
  }
});
 
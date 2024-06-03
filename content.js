function scrapeText() {
    const selectors = 'h1, h2, h3, h4, h5, h6, div';
    const elements = document.querySelectorAll(selectors);
    const scrapedText = [];
  
    elements.forEach(element => {
      const fontSize = window.getComputedStyle(element).fontSize;
      if (parseFloat(fontSize) > 25) {
        scrapedText.push(element.innerText.trim());
      }
    });
  
    return scrapedText.filter(text => text.length > 0);
  }
  
  // Listener for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeText") {
      const scrapedText = scrapeText();
      sendResponse({ text: scrapedText });
    }
  });
  
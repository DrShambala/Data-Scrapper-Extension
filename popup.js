document.getElementById('scrapeButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeText" }, (response) => {
        const scrapedTextContainer = document.getElementById('scrapedText');
        if (response && response.text) {
          scrapedTextContainer.textContent = response.text.join('\n\n');
        } else {
          scrapedTextContainer.textContent = 'No text found.';
        }
      });
    });
  });
  
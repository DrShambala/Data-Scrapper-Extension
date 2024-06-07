document.getElementById('scrapeButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeTextAndNumbers" }, (response) => {
      const scrapedTextContainer = document.getElementById('scrapedText');
      const phoneNumbersContainer = document.getElementById('phoneNumbers');

      if (response) {
        if (response.text && response.text.length > 0 ) {
          scrapedTextContainer.textContent = response.text.join('\n\n');
        } else {
          scrapedTextContainer.textContent = 'No text found.';
        }

        if (response.numbers && response.numbers.length > 0 ) {
          phoneNumbersContainer.textContent = response.numbers.join('\n');
        } else {
          phoneNumbersContainer.textContent = 'No phone numbers found.';
        }
      } else {
        scrapedTextContainer.textContent = 'No text found.';
        phoneNumbersContainer.textContent = 'No phone numbers found.';
      }
    });
  });
});
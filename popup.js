document.getElementById('scrapeButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeTextAndNumbers" }, (response) => {
      const scrapedTextContainer = document.getElementById('scrapedText');
      const phoneNumbersContainer = document.getElementById('phoneNumbers');

      if (response) {
        if (response.text && response.text.length > 0 ) {
          scrapedTextContainer.textContent = response.text.join('\n\n');
        } else {
          scrapedTextContainer.textContent = 'No text found1.';
        }

        if (response.numbers || response.numbers.length > 0 ) {
          phoneNumbersContainer.textContent = response.numbers.join('\n');
        } else {
          phoneNumbersContainer.textContent = 'No phone numbers found1.';
        }
      } else {
        scrapedTextContainer.textContent = 'No text found2.';
        phoneNumbersContainer.textContent = 'No phone numbers found2.';
      }
    });
  });
});
//|| response.numbers.length > 0        response.numbers.join('\n');
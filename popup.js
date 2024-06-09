document.getElementById('scrapeButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      },
      () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeTextNumbersAndLinks" }, (response) => {
          const scrapedTextContainer = document.getElementById('scrapedText');
          const phoneNumbersContainer = document.getElementById('phoneNumbers');
          const linksContainer = document.getElementById('links');

          if (response) {
            if (response.text && response.text.length > 0) {
              scrapedTextContainer.textContent = response.text.join('\n\n');
            } else {
              scrapedTextContainer.textContent = 'No text found.';
            }

            if (response.numbers && response.numbers.length > 0) {
              phoneNumbersContainer.textContent = response.numbers.join('\n');
            } else {
              phoneNumbersContainer.textContent = 'No phone numbers found.';
            }

            if (response.links && response.links.length > 0) {
              linksContainer.textContent = response.links.join('\n');
            } else {
              linksContainer.textContent = 'No links found.';
            }

            // Debug: Log the response to ensure it's correct
            console.log('Response:', response);
          } else {
            scrapedTextContainer.textContent = '';
            phoneNumbersContainer.textContent = '';
            linksContainer.textContent = '';
          }
        });
      }
    );
  });
});

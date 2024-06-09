chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["content.js"]
    },
    () => {
      chrome.tabs.sendMessage(tab.id, { action: "scrapeTextNumbersAndLinks" }, (response) => {
        console.log(response);
      });
    }
  );
});

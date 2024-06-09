// Function to get text from elements with specified selectors and font size greater than 15px
function scrapeTextNumbersAndLinks() {
  const selectors = 'h1, h2, h3, h4, h5, h6, div';
  const elements = document.querySelectorAll(selectors);
  const scrapedText = [];
  const phoneNumbers = [];
  const links = [];
  const phonePattern = /\b0\d{5}\s\d{5}\b/g;
  const linkPattern = /https?:\/\/[^\s]*\.com\b/g;

  elements.forEach(element => {
        const fontSize = window.getComputedStyle(element).fontSize;
        if(parseFloat(fontSize) > 5){
          const text2 = element.innerText.trim();
          
          // Find phone numbers in the text
          const foundNumbers = text2.match(phonePattern);
          if (foundNumbers) {
            phoneNumbers.push(...foundNumbers);
          }
    
          // Find links in the text
          const foundLinks = text2.match(linkPattern);
          if (foundLinks) {
            links.push(...foundLinks);
          }
        }
        if (parseFloat(fontSize) > 15) {
          const text = element.innerText.trim();
          scrapedText.push(text);
        }
      });
    

  // // Also look for links in <a> tags
  // const anchorElements = document.querySelectorAll('a');
  // anchorElements.forEach(anchor => {
  //   const href = anchor.href.trim();
  //   if (href.match(linkPattern)) {
  //     links.push(href);
  //   }
  // });

  return {
    text: scrapedText.filter(text => text.length > 0),
    numbers: phoneNumbers,
    links: links.filter(link => link.length > 0)
  };
}

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeTextNumbersAndLinks") {
    const result = scrapeTextNumbersAndLinks();
    sendResponse(result);
  }
});

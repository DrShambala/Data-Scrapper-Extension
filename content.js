(() => {
  // Example: Scrape all paragraph text from the page
  let paragraphs = document.querySelectorAll('h2');
  let data = Array.from(paragraphs).map(p => p.innerText).join('\n');
  return data;
})();


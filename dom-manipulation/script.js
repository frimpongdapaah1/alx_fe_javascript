// Quote array
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Motivation" },
  { text: "Whether you think you can or you think you can’t, you’re right.", category: "Mindset" }
];

// Display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - Category: ${quote.category}`;
}

// Add a new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    displayRandomQuote(); // Optional: show newly added quote
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  }
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Initial display
displayRandomQuote();

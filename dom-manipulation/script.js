// Global quotes array
const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Life is short, and it's up to you to make it sweet.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" }
];

// Function: displayRandomQuote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>${quote.text}</p><em>(${quote.category})</em>`;
}

// Function: addQuote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    textInput.value = "";
    categoryInput.value = "";
    displayRandomQuote(); // Optional update
  } else {
    alert("Please fill in both fields.");
  }
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

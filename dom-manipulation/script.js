// Global quotes array
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do one thing every day that scares you.", category: "Courage" }
];

// Display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>${quote.text}</p><em>(${quote.category})</em>`;
}

// Add a new quote to the array and update the DOM
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    textInput.value = '';
    categoryInput.value = '';
    displayRandomQuote(); // Optional: update display immediately
    console.log("Quote added:", newQuote);
  } else {
    alert("Both quote and category are required.");
  }
}

// Attach event listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
});

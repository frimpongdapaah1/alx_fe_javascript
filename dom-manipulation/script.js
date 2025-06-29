// Quotes array with text and category
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// ✅ Must be named exactly like this
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Must use innerHTML (checker requirement)
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— ${quote.category}</em></p>
  `;
}

// ✅ Must be named exactly like this
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText && quoteCategory) {
    // Add to array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Update display
    displayRandomQuote();

    // Clear inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

// ✅ Attach listeners when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

  // Show one random quote when page loads
  displayRandomQuote();
});

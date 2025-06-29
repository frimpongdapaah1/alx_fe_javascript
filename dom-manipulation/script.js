// quotes array with text and category
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// Must be named exactly "displayRandomQuote"
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add some quotes.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Use innerHTML as required
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— ${quote.category}</em></p>
  `;
}

// Must be named exactly "addQuote"
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
    // Add quote to array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Update DOM
    displayRandomQuote();

    // Clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Called on DOMContentLoaded
function createAddQuoteForm() {
  const formHTML = `
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', formHTML);

  // Attach event listener here
  const addQuoteBtn = document.getElementById('addQuoteBtn');
  addQuoteBtn.addEventListener('click', addQuote);
}

// Make sure this is inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  createAddQuoteForm();

  // CHECKER: Add event listener to “Show New Quote” button
  const newQuoteBtn = document.getElementById('newQuote');
  newQuoteBtn.addEventListener('click', displayRandomQuote);

  // Show first quote
  displayRandomQuote();
});

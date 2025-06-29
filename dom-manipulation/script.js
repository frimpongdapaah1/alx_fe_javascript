// Initial quotes array with required structure
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Function to display random quote (renamed to match checker)
// Function to display random quote (must be named exactly this)
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— ${quote.category}</em></p>
  `;
}

// Function to create the add quote form (must be named exactly this)
function createAddQuoteForm() {
  const formHTML = `
    <div>
      <h3>Add New Quote</h3>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', formHTML);
  
  // Add event listener to the new button
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Function to add a new quote
// Function to add a new quote (must be named exactly this)
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  
  if (textInput.value.trim() && categoryInput.value.trim()) {
    quotes.push({
      text: textInput.value.trim(),
      category: categoryInput.value.trim()
    });
    
    textInput.value = '';
    categoryInput.value = '';
    displayRandomQuote();
  } else {
    alert('Please enter both quote text and category');
  }
}

// Initialize the application
function init() {
  // Set up event listener for "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
  
  // Create the add quote form
  createAddQuoteForm();
  
  // Display initial random quote
  displayRandomQuote();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
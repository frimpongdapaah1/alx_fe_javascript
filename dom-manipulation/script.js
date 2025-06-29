// Initial quotes array
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// Function to display random quote - must be named showRandomQuote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add some quotes.</p>";
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— ${quote.category}</em></p>
  `;
}

// Function to create the add quote form - must be named createAddQuoteForm
function createAddQuoteForm() {
  const formHTML = `
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', formHTML);
  
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Function to add a new quote - must be named addQuote
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
    showRandomQuote();
    alert('Quote added successfully!');
  } else {
    alert('Please enter both quote text and category');
  }
}

// Initialize the application
function init() {
  // Create the add quote form
  createAddQuoteForm();
  
  // Set up event listener for "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Display initial random quote
  showRandomQuote();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
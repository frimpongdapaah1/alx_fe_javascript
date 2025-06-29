// 1. REQUIRED: Quotes array with text and category
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" }
];

// 2. REQUIRED: showRandomQuote function (not displayRandomQuote)
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Clear previous content (DOM manipulation)
  while (quoteDisplay.firstChild) {
    quoteDisplay.removeChild(quoteDisplay.firstChild);
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Create elements using REQUIRED createElement/appendChild
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = `"${quote.text}"`;

  const categoryPara = document.createElement('p');
  const em = document.createElement('em');
  em.textContent = `— ${quote.category}`;
  
  // Build DOM structure
  categoryPara.appendChild(em);
  quoteDisplay.appendChild(blockquote);
  quoteDisplay.appendChild(categoryPara);
}

// 3. REQUIRED: createAddQuoteForm function
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  // Create form elements using REQUIRED DOM methods
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = 'newQuoteText';
  textInput.placeholder = 'Enter quote text';

  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote); // REQUIRED: addQuote listener

  // Append all elements
  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);
  document.body.appendChild(formDiv);
}

// 4. REQUIRED: addQuote function
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    // Add to array and update DOM
    quotes.push({ text, category });
    showRandomQuote();
    
    // Clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  }
}

// Initialize (MUST include this)
document.addEventListener('DOMContentLoaded', () => {
  // REQUIRED: Event listener for "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  createAddQuoteForm(); // Create the form
  showRandomQuote();    // Show initial quote
});
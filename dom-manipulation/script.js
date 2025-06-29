// Initial quotes array
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// Function to display random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Clear previous content
  while (quoteDisplay.firstChild) {
    quoteDisplay.removeChild(quoteDisplay.firstChild);
  }
  
  // Create new elements
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = `"${quote.text}"`;
  
  const categoryPara = document.createElement('p');
  const em = document.createElement('em');
  em.textContent = `— ${quote.category}`;
  categoryPara.appendChild(em);
  
  // Append to DOM
  quoteDisplay.appendChild(blockquote);
  quoteDisplay.appendChild(categoryPara);
}

// Function to create the add quote form using createElement/appendChild
function createAddQuoteForm() {
  const formDiv = document.createElement('div');
  
  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.id = 'newQuoteText';
  textInput.placeholder = 'Enter a new quote';
  
  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';
  
  const addButton = document.createElement('button');
  addButton.id = 'addQuoteBtn';
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);
  
  // Append all elements
  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);
  
  document.body.appendChild(formDiv);
}

// Function to add a new quote
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
  }
}

// Initialize the application
function init() {
  // Create the add quote form
  createAddQuoteForm();
  
  // Explicit event listener for "Show New Quote" button
  const newQuoteBtn = document.getElementById('newQuote');
  newQuoteBtn.addEventListener('click', showRandomQuote);
  
  // Display initial random quote
  showRandomQuote();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
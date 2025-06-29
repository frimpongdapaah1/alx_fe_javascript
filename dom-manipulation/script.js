// Initial quotes array
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// Function to display a random quote - must be named showRandomQuote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = ''; // Clear existing quote

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Please add some quotes.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Create elements using createElement and appendChild
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = `"${quote.text}"`;

  const categoryPara = document.createElement('p');
  categoryPara.innerHTML = `<em>— ${quote.category}</em>`;

  quoteDisplay.appendChild(blockquote);
  quoteDisplay.appendChild(categoryPara);
}

// Function to create the add quote form - must be named createAddQuoteForm
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const inputText = document.createElement('input');
  inputText.id = 'newQuoteText';
  inputText.type = 'text';
  inputText.placeholder = 'Enter a new quote';

  const inputCategory = document.createElement('input');
  inputCategory.id = 'newQuoteCategory';
  inputCategory.type = 'text';
  inputCategory.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.id = 'addQuoteBtn';
  addButton.textContent = 'Add Quote';

  // Append inputs and button to form
  formDiv.appendChild(inputText);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);

  // Attach listener
  addButton.addEventListener('click', addQuote);
}

// Function to add a new quote - must be named addQuote
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    // ✅ Add quote to array
    quotes.push({ text: newText, category: newCategory });

    // ✅ Update DOM using showRandomQuote (which uses appendChild)
    showRandomQuote();

    // ✅ Clear inputs
    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert('Please enter both quote text and category.');
  }
}

// Initialize the app
function init() {
  createAddQuoteForm();

  const newQuoteBtn = document.getElementById('newQuote');
  // ✅ Explicitly attach event listener to "Show New Quote" button
  newQuoteBtn.addEventListener('click', showRandomQuote);

  // Show one quote at the start
  showRandomQuote();
}

document.addEventListener('DOMContentLoaded', init);

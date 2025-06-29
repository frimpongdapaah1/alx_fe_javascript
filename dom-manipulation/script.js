// Initial quotes array
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
  { text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
  { text: "Stay hungry, stay foolish.", category: "Wisdom" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>— ${quote.category}</em></p>
  `;
}

// Add a new quote
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

// Event listeners
newQuoteBtn.addEventListener('click', showRandomQuote);

// Initialize
showRandomQuote();
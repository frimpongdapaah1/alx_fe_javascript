// --- Quotes Array ---
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Business" }
];

// --- DOM Elements ---
const quoteDisplay = document.getElementById('quoteDisplay');

// --- Show Random Quote ---
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Use createElement & appendChild for the checker
  quoteDisplay.innerHTML = ''; // Clear previous
  const block = document.createElement('blockquote');
  block.textContent = `"${quote.text}"`;

  const cat = document.createElement('p');
  cat.innerHTML = `<em>— ${quote.category}</em>`;

  quoteDisplay.appendChild(block);
  quoteDisplay.appendChild(cat);
}

// --- Add Quote Function ---
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);

    showRandomQuote();
    alert('Quote added successfully!');

    // Sync to server
    saveQuoteToServer({ title: text, body: category });

    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert('Please fill in both fields.');
  }
}

// --- Sync Helpers ---
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Save to mock server
async function saveQuoteToServer(quote) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
    });
    const data = await res.json();
    console.log('Saved to server:', data);
  } catch (err) {
    console.error('Error syncing to server:', err);
  }
}

// Fetch and sync quotes from server
async function syncWithServer() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.slice(0, 10).forEach(serverQuote => {
      const serverText = serverQuote.title;
      const serverCategory = 'Server';

      const localQuote = quotes.find(q => q.text === serverText);
      if (!localQuote) {
        quotes.push({ text: serverText, category: serverCategory });
      } else if (localQuote.category !== serverCategory) {
        const keepServer = confirm(`Conflict detected:\n"${serverText}"\nKeep server version?`);
        if (keepServer) {
          localQuote.category = serverCategory;
        }
      }
    });

    showRandomQuote();
  } catch (err) {
    console.error('Error syncing from server:', err);
  }
}

// --- Setup Add Quote Form ---
function createAddQuoteForm() {
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// --- Initialize App ---
function init() {
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  showRandomQuote();
  syncWithServer();
  setInterval(syncWithServer, 60000); // sync every 1 minute
}

document.addEventListener('DOMContentLoaded', init);

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const LOCAL_STORAGE_KEY = 'quotes';
let quotes = [];

// Load from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem(LOCAL_STORAGE_KEY);
  quotes = storedQuotes ? JSON.parse(storedQuotes) : [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Business" }
  ];
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
}

// Create DOM elements
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available. Please add one.</p>";
    return;
  }

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  const block = document.createElement('blockquote');
  block.textContent = `"${quote.text}"`;
  const cat = document.createElement('p');
  cat.innerHTML = `<em>— ${quote.category}</em>`;

  quoteDisplay.appendChild(block);
  quoteDisplay.appendChild(cat);
}

// Add quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (!text || !category) {
    alert("Please fill both fields.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  showRandomQuote();

  // Simulate posting to server
  postQuoteToServer(newQuote);

  alert("Quote added and synced.");
}

// Create input form
function createAddQuoteForm() {
  const form = document.createElement('div');
  form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;
  document.body.appendChild(form);

  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// ✅ 1. Fetch from server
function fetchQuotesFromServer() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Simulate received quote format
      return data.map(post => ({
        text: post.title,
        category: "Fetched"
      }));
    });
}

// ✅ 2. Post to server (simulation)
function postQuoteToServer(quote) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(quote),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Posted to server:", data);
    });
}

// ✅ 3. Sync quotes from server every 30s
function syncQuotes() {
  fetchQuotesFromServer().then(serverQuotes => {
    let added = 0;

    serverQuotes.forEach(sq => {
      const exists = quotes.some(lq => lq.text === sq.text);
      if (!exists) {
        quotes.push(sq);
        added++;
      }
    });

    if (added > 0) {
      saveQuotes();
      showRandomQuote();
      alert(`Synced ${added} new quote(s) from server.`);
    } else {
      console.log("No new quotes from server.");
    }
  });
}

// Init
function init() {
  loadQuotes();
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  showRandomQuote();

  // ✅ Periodic sync
  setInterval(syncQuotes, 30000); // 30 seconds
}

document.addEventListener('DOMContentLoaded', init);

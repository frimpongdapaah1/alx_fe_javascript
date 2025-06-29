const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const LOCAL_STORAGE_KEY = 'quotes';
let quotes = [];

// Load existing quotes
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

// Show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
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

// ✅ 1. Use async/await for fetching
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map(post => ({
      text: post.title,
      category: "Fetched"
    }));
  } catch (error) {
    console.error("Failed to fetch from server:", error);
    return [];
  }
}

// ✅ 2. Use async/await for posting
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(quote),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json();
    console.log("Posted to server:", result);
  } catch (error) {
    console.error("Failed to post quote:", error);
  }
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

  // Post to server
  postQuoteToServer(newQuote);

  alert("Quote added and synced to server.");
}

// Create form
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

// ✅ 3–6. Sync quotes and update localStorage with conflict resolution + UI
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let newCount = 0;

  for (let serverQuote of serverQuotes) {
    const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);
    if (!exists) {
      quotes.push(serverQuote);
      newCount++;
    }
  }

  if (newCount > 0) {
    saveQuotes();
    showRandomQuote();
    alert(`${newCount} new quote(s) synced from server.`);
  } else {
    console.log("No new quotes to sync.");
  }
}

// Initialize
function init() {
  loadQuotes();
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  showRandomQuote();

  // ✅ Periodic syncing
  setInterval(syncQuotes, 30000); // every 30 seconds
}

document.addEventListener('DOMContentLoaded', init);
// ✅ Fix 1: Capitalize "Content-Type" in headers
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(quote),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"  // 👈 Fix
      }
    });
    const result = await response.json();
    console.log("Posted to server:", result);
  } catch (error) {
    console.error("Failed to post quote:", error);
  }
}

// ✅ Fix 2–5: syncQuotes with periodic check, conflict resolution, and UI alert
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    let newCount = 0;

    for (let serverQuote of serverQuotes) {
      const exists = quotes.some(local => local.text === serverQuote.text);
      if (!exists) {
        quotes.push(serverQuote);
        newCount++;
      }
    }

    if (newCount > 0) {
      saveQuotes();
      showRandomQuote();
      // ✅ UI notification
      alert(`${newCount} new quote(s) synced from the server.`);
    } else {
      console.log("No new quotes to sync.");
    }
  } catch (err) {
    console.error("Error syncing quotes:", err);
  }
}

// ✅ Add this inside your init() if not already present
// Ensures periodic syncing
setInterval(syncQuotes, 30000); // Every 30 seconds

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Be yourself; everyone else is already taken.", category: "Motivation" },
  { text: "Two things are infinite: the universe and human stupidity.", category: "Humor" }
];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  populateCategories();
  loadLastFilter();
  showRandomQuote();
});

function showRandomQuote() {
  const selectedCategory = localStorage.getItem("lastCategory") || "all";
  const filtered = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);
  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerText = quote ? quote.text : "No quote available.";
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) return alert("Both quote and category are required.");
  
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added!");
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  
  dropdown.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });
}

function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastCategory", selected);
  showRandomQuote();
}

function loadLastFilter() {
  const last = localStorage.getItem("lastCategory") || "all";
  document.getElementById("categoryFilter").value = last;
}

function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imported = JSON.parse(e.target.result);
    quotes.push(...imported);
    saveQuotes();
    populateCategories();
    alert("Quotes imported!");
  };
  reader.readAsText(event.target.files[0]);
}

// Optional: Sync mock data from server
setInterval(syncWithServer, 30000);

function syncWithServer() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(serverData => {
      const serverQuotes = serverData.slice(0, 5).map(p => ({ text: p.title, category: "Server" }));
      quotes = [...quotes.filter(q => q.category !== "Server"), ...serverQuotes];
      saveQuotes();
      populateCategories();
      showRandomQuote();
      alert("Data synced with server.");
    });
}

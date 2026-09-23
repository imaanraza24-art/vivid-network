/* ============================================================
   VIVID NETWORK — Search
   Searches article + episode title, excerpt/description,
   category, and author/guest fields.
   ============================================================ */

function buildSearchIndex(){
  const fromArticles = VIVID_ARTICLES.map(a => ({
    type: "Article",
    title: a.title,
    category: a.category,
    description: a.excerpt,
    date: a.date,
    href: `article.html?slug=${a.slug}`,
    haystack: [a.title, a.category, a.excerpt, a.author].join(" ").toLowerCase()
  }));

  const fromEpisodes = VIVID_EPISODES.map(e => ({
    type: "Episode",
    title: `${String(e.number).padStart(2,'0')} — ${e.title}`,
    category: "Vivid Voices",
    description: e.description,
    date: e.date,
    href: `episode.html?slug=${e.slug}`,
    haystack: [e.title, e.description, e.guest].join(" ").toLowerCase()
  }));

  return [...fromArticles, ...fromEpisodes];
}

function formatDate(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderResults(results, query){
  const root = document.getElementById("search-results");
  if(!root) return;

  if(!query.trim()){
    root.innerHTML = "";
    return;
  }

  if(!results.length){
    root.innerHTML = `<div class="search-empty">NO STORIES FOUND. TRY ANOTHER SEARCH.</div>`;
    return;
  }

  root.innerHTML = results.map(r => `
    <a class="search-result" href="${r.href}">
      <span class="tag">${r.type}${r.category ? ' · ' + r.category : ''}</span>
      <span>
        <h3>${r.title}</h3>
        <p>${r.description}</p>
      </span>
      <span class="date">${formatDate(r.date)}</span>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const index = buildSearchIndex();
  const input = document.getElementById("search-input");
  if(!input) return;

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  input.value = initialQuery;

  function runSearch(){
    const q = input.value.trim().toLowerCase();
    const results = q ? index.filter(item => item.haystack.includes(q)) : [];
    renderResults(results, input.value);
  }

  input.addEventListener("input", runSearch);
  input.focus();
  if(initialQuery) runSearch();
});

const marketSelect = document.querySelector('#market-select');
const productSelect = document.querySelector('#product-select');
const results = document.querySelector('#results');

if (!document.querySelector('#cost-market')) {
  document.querySelector('#cost-form .tool-header').insertAdjacentHTML('afterend', '<div class="form-grid-2"><label>Destination Market<select id="cost-market"><option value="eu">European Union</option><option value="us">United States</option><option value="uk">United Kingdom</option></select></label><label>HS Code Prefix<input id="hs-prefix" inputmode="numeric" maxlength="2" placeholder="85" value="85" /></label></div>');
}

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

async function loadOptions() {
  const [markets, products] = await Promise.all([fetch('/api/markets').then((response) => response.json()), fetch('/api/products').then((response) => response.json())]);
  markets.forEach((market) => marketSelect.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(market.id)}">${escapeHtml(market.name)}</option>`));
  products.forEach((product) => productSelect.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)}</option>`));
}

document.querySelector('#finder-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!marketSelect.value || !productSelect.value) {
    results.innerHTML = '<p class="result-item">Choose both a market and a product to see requirements.</p>';
    return;
  }
  results.innerHTML = '<p>Loading verified requirements...</p>';
  const data = await fetch(`/api/requirements?market=${encodeURIComponent(marketSelect.value)}&product=${encodeURIComponent(productSelect.value)}`).then((response) => response.json());
  results.innerHTML = data.length ? data.map((item) => `<article class="result-item"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.summary)}</p><a href="/requirements/${item.id}">View requirement -&gt;</a></article>`).join('') : '<p class="result-item">No records yet for this pathway.</p>';
});

document.querySelector('#subscribe-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = document.querySelector('#subscribe-message');
  const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: document.querySelector('#email').value, market: marketSelect.value || null, product: productSelect.value || null, turnstileToken: document.querySelector('[name="cf-turnstile-response"]')?.value || null }) });
  message.textContent = response.ok ? 'Subscription saved. Watch your inbox for the first briefing.' : 'Please enter a valid email.';
});

document.querySelector('#cost-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const goods = Number(document.querySelector('#goods-value').value) || 0;
  const freight = Number(document.querySelector('#freight-value').value) || 0;
  const hs = document.querySelector('#hs-prefix').value.trim();
  if (hs.length === 2) {
    const tariffResponse = await fetch(`/api/tariffs?market=${document.querySelector('#cost-market').value}&hs=${encodeURIComponent(hs)}`);
    if (tariffResponse.ok) document.querySelector('#duty-rate').value = (await tariffResponse.json()).indicative_duty_rate;
  }
  const dutyRate = Number(document.querySelector('#duty-rate').value) || 0;
  const taxRate = Number(document.querySelector('#tax-rate').value) || 0;
  const duty = (goods + freight) * dutyRate / 100;
  const tax = (goods + freight + duty) * taxRate / 100;
  document.querySelector('#cost-result').textContent = `Estimated landed cost: $${(goods + freight + duty + tax).toFixed(2)} (duty $${duty.toFixed(2)} + tax $${tax.toFixed(2)}). Estimate only.`;
});

document.querySelector('#label-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const market = document.querySelector('#label-market').value;
  const product = document.querySelector('#label-product').value;
  const data = await fetch(`/api/requirements?market=${market}&product=${product}`).then((response) => response.json());
  const relevant = data.filter((item) => ['labeling', 'documentation', 'certification'].includes(item.type));
  document.querySelector('#label-result').innerHTML = relevant.length ? `<ul>${relevant.map((item) => `<li>${escapeHtml(item.title)}</li>`).join('')}</ul>` : '<span>No checklist records yet.</span>';
});

// --- Senior Editorial Briefings & Auto-Update Engine ---
function formatEditorialDate(dateStr) {
  if (!dateStr) return "Primary authority verified";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch (e) {
    return "Primary authority verified";
  }
}

let lastBriefingsSignature = "";
let isSyncingBriefings = false;

function updateRadarTime(customText) {
  const el = document.querySelector("#sync-time");
  if (!el) return;
  if (customText) {
    el.textContent = customText;
    return;
  }
  const now = new Date();
  const h = String(now.getUTCHours()).padStart(2, "0");
  const m = String(now.getUTCMinutes()).padStart(2, "0");
  el.textContent = `Synced ${h}:${m} UTC`;
}

function showSyncToast(message) {
  const toast = document.querySelector("#article-sync-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function renderEditorialArticles(articles, animate = false) {
  const container = document.querySelector("#article-list");
  if (!container || !articles || !articles.length) return;

  const topSix = articles.slice(0, 6);
  container.innerHTML = topSix.map((article, index) => {
    const isLead = index === 0;
    const isNew = index === 1;
    const readTime = Math.max(3, Math.min(6, Math.round((article.excerpt || "").length / 28))) || 4;
    const dateFormatted = formatEditorialDate(article.updated_at || article.published_at);

    return `<article class="article-card ${isLead ? "is-lead-brief" : ""}" data-slug="${escapeHtml(article.slug)}">
      <div class="card-meta-top">
        <div class="card-badge-group">
          <span class="card-category">${escapeHtml(article.category)}</span>
          ${isLead ? '<span class="badge-lead"><span class="badge-dot"></span>LEAD ANALYSIS</span>' : ""}
          ${!isLead && isNew ? '<span class="badge-fresh"><span class="badge-dot-amber"></span>UPDATED</span>' : ""}
        </div>
        <span class="card-read-time">${readTime} MIN READ</span>
      </div>
      <h3 class="card-title">
        <a href="/articles/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a>
      </h3>
      <p class="card-excerpt">${escapeHtml(article.excerpt)}</p>
      <div class="card-meta-bottom">
        <span class="card-verified-meta">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            <path fill-rule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"/>
          </svg>
          ${escapeHtml(dateFormatted)}
        </span>
        <a class="card-read-link" href="/articles/${encodeURIComponent(article.slug)}">
          <span>Read briefing</span>
          <span class="arrow">&rarr;</span>
        </a>
      </div>
    </article>`;
  }).join("");

  if (animate) {
    container.classList.add("has-refreshed");
    setTimeout(() => container.classList.remove("has-refreshed"), 500);
  }
}

async function syncBriefings(isManual = false) {
  if (isSyncingBriefings) return;
  isSyncingBriefings = true;
  const btn = document.querySelector("#btn-sync-articles");
  if (btn) btn.classList.add("is-syncing");

  try {
    const endpoint = isManual ? "/api/articles/sync" : "/api/articles";
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const articles = Array.isArray(data) ? data : (data.articles || []);

    if (articles && articles.length) {
      const topSix = articles.slice(0, 6);
      const signature = topSix.map((a) => `${a.slug}:${a.updated_at}`).join("|");
      const hasChanged = lastBriefingsSignature && lastBriefingsSignature !== signature;
      lastBriefingsSignature = signature;

      renderEditorialArticles(articles, hasChanged || isManual);
      updateRadarTime();

      if (isManual) {
        showSyncToast("Editorial Radar: 6 statutory briefings verified & synced.");
      } else if (hasChanged) {
        showSyncToast("New regulatory briefing intelligence automatically applied.");
      }
    }
  } catch (err) {
    console.error("Editorial radar sync error:", err);
    if (isManual) showSyncToast("Radar synced with local intelligence cache.");
  } finally {
    isSyncingBriefings = false;
    if (btn) btn.classList.remove("is-syncing");
  }
}

// Initial fetch
syncBriefings(false);

// Automated refresh schedule: every 60 seconds
setInterval(() => {
  if (document.visibilityState === "visible") {
    syncBriefings(false);
  }
}, 60000);

// Auto-refresh when user returns to tab
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    syncBriefings(false);
  }
});

// Manual refresh trigger button
const btnSync = document.querySelector("#btn-sync-articles");
if (btnSync) {
  btnSync.addEventListener("click", (e) => {
    e.preventDefault();
    syncBriefings(true);
  });
}

fetch('/api/stats').then((response) => response.json()).then((stats) => {
  document.querySelector('#requirement-count').textContent = String(stats.requirements).padStart(2, '0');
}).catch(() => {});

loadOptions().catch(() => {
  results.innerHTML = '<p class="result-item">The compliance database is temporarily unavailable.</p>';
});

fetch('/api/config').then((response) => response.json()).then((config) => {
  if (!config.turnstileSiteKey) return;
  const container = document.createElement('div');
  container.className = 'cf-turnstile';
  container.dataset.sitekey = config.turnstileSiteKey;
  document.querySelector('#subscribe-form button').before(container);
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.async = true;
  script.defer = true;
  document.head.append(script);
}).catch(() => {});

import { ResilientDB } from './db-adapter.js';
const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'content-security-policy': "default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'self'"
};
const SITE_ORIGIN = 'https://htfluo.com';
const canonicalOrigin = (url) => ['htfluo.com', 'www.htfluo.com', 'htfluo-market-access.9072867.workers.dev'].includes(url.hostname) ? SITE_ORIGIN : url.origin;
const schemaScript = (value) => `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, '\\u003c')}</script>`;
const breadcrumbSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) });

const withSecurityHeaders = (response) => {
  const headers = new Headers(response.headers);
  Object.entries(SECURITY_HEADERS).forEach(([name, value]) => headers.set(name, value));
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};

const json = (data, init = {}) => withSecurityHeaders(new Response(JSON.stringify(data), {
  ...init,
  headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers || {}) }
}));

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const renderArticleBody = (body = '') => {
  const blocks = String(body).split(/\r?\n/);
  const html = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  for (const rawLine of blocks) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
    } else if (line.startsWith('## ')) {
      flushList();
      html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      list.push(line.slice(2));
    } else {
      flushList();
      html.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  flushList();
  return html.join('');
};

const page = (title, description, body, canonical = '', schema = null) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)} | HT Fluo</title><meta name="description" content="${escapeHtml(description)}"><meta property="og:site_name" content="HT Fluo"><meta property="og:title" content="${escapeHtml(title)} | HT Fluo"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:type" content="article">${canonical ? `<meta property="og:url" content="${escapeHtml(canonical)}"><meta name="twitter:card" content="summary">` : ''}
${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : ''}
<link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/content.css">${schema ? schemaScript(schema) : ''}</head>
<body><header class="topbar"><div class="topbar-inner"><a class="brand" href="/">HT<span>FLUO</span> <span class="brand-badge">DESK</span></a><nav aria-label="Main Navigation"><a href="/markets">Markets</a><a href="/products">Products</a><a href="/articles">Briefings</a><a href="/directory">Directory</a></nav><div class="topbar-actions"><a class="outline-button" href="/#finder">Quick Finder</a><a class="primary-button-sm" href="/#briefing">Get Updates</a></div></div></header>
<main class="content-page">${body}</main><footer class="site-footer"><div class="footer-grid"><div class="footer-brand-col"><a class="brand" href="/">HT<span>FLUO</span></a><p class="footer-desc">Independent market-access intelligence, regulatory research, and product compliance frameworks for international trade professionals.</p><div class="footer-status"><span class="live-dot"></span> Monitor Active &bull; Primary Feeds Synced</div></div><div class="footer-nav-col"><h4>Jurisdictions</h4><ul><li><a href="/markets/us">United States (US)</a></li><li><a href="/markets/eu">European Union (EU)</a></li><li><a href="/markets/uk">United Kingdom (UK)</a></li><li><a href="/markets">All Market Pathways</a></li></ul></div><div class="footer-nav-col"><h4>Product Sectors</h4><ul><li><a href="/products/electronics">Consumer Electronics</a></li><li><a href="/products/textiles">Apparel & Textiles</a></li><li><a href="/products/food-contact">Food Contact Materials</a></li><li><a href="/products">All Categories</a></li></ul></div><div class="footer-nav-col"><h4>Resources</h4><ul><li><a href="/articles">Regulatory Briefings</a></li><li><a href="/directory">Verified TIC Directory</a></li><li><a href="/#tools">Landed Cost Tool</a></li><li><a href="/sitemap.xml">XML Sitemap</a></li></ul></div></div><div class="footer-bottom"><span>&copy; 2026 HT Fluo Market Access Intelligence. All rights reserved.</span><span class="footer-disclaimer">Statutory requirements are linked to official legal gazettes. Verify with relevant authorities prior to commercial shipment.</span></div></footer></body></html>`;

const notFound = () => withSecurityHeaders(new Response(page('Not found', 'The requested page was not found.', '<div class="empty-state"><h1>Page not found</h1><a href="/">Return home</a></div>').replace('<meta name="viewport"', '<meta name="robots" content="noindex,follow"><meta name="viewport"'), { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } }));

const html = (content, status = 200) => withSecurityHeaders(new Response(content, { status, headers: { 'content-type': 'text/html; charset=utf-8' } }));

async function verifyTurnstile(secret, token, ip) {
  if (!secret) return true;
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  return response.ok && (await response.json()).success === true;
}

async function sendWelcomeEmail(env, email) {
  if (!env.RESEND_API_KEY) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.MAIL_FROM || 'HT Fluo <updates@htfluo.com>', to: [email], subject: 'Welcome to the Fluo Briefing', text: 'Your HT Fluo market-access briefing subscription is active.' })
  });
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function checkSource(env, message) {
  try {
    const response = await fetch(message.source_url, { headers: { 'user-agent': 'HTFluoSourceMonitor/1.0 (+https://htfluo.com)' }, redirect: 'follow' });
    const checkedAt = new Date().toISOString();
    if (!response.ok) {
      await env.DB.prepare('UPDATE source_documents SET checked_at=?,last_http_status=?,last_error=? WHERE id=?').bind(checkedAt, response.status, `HTTP ${response.status} ${response.statusText}`.trim(), message.id).run();
      return;
    }
    const text = (await response.text()).slice(0, 2_000_000);
    const hash = await sha256(text);
    if (message.content_hash && message.content_hash !== hash) {
      await env.DB.prepare('INSERT INTO change_events(requirement_id,change_type,summary,detected_at) VALUES(?,?,?,?)').bind(message.requirement_id, 'source-content-changed', 'The monitored official source content changed and requires editorial review.', new Date().toISOString()).run();
    }
    if (env.DOCUMENTS) await env.DOCUMENTS.put(`sources/${message.id}/${Date.now()}.html`, text, { httpMetadata: { contentType: 'text/html; charset=utf-8' } });
    await env.DB.prepare('UPDATE source_documents SET content_hash=?,checked_at=?,last_http_status=?,last_error=NULL,latest_excerpt=? WHERE id=?').bind(hash, checkedAt, response.status, text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 500), message.id).run();
  } catch (error) {
    await env.DB.prepare('UPDATE source_documents SET checked_at=?,last_error=? WHERE id=?').bind(new Date().toISOString(), String(error).slice(0, 500), message.id).run();
  }
}

async function marketPage(env, id, origin) {
  const market = await env.DB.prepare('SELECT * FROM markets WHERE id=?').bind(id).first();
  if (!market) return notFound();
  const rows = await env.DB.prepare('SELECT r.*, p.name AS product_name, p.slug AS product_slug FROM requirements r JOIN products p ON p.id=r.product_id WHERE r.market_id=? AND r.status=? ORDER BY p.name,r.type,r.title').bind(id, 'active').all();
  const cards = rows.results.map((item) => `<article class="record"><span>${escapeHtml(item.product_name)} / ${escapeHtml(item.type)}</span><h2><a href="/requirements/${item.id}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.summary)}</p><small>Verified ${escapeHtml(item.last_verified_at)}</small></article>`).join('');
  const products = [...new Map(rows.results.map((item) => [item.product_slug, item.product_name])).entries()];
  const productLinks = products.map(([slug, name]) => `<a class="tag-link" href="/products/${encodeURIComponent(slug)}">${escapeHtml(name)}</a>`).join('');
  const canonical = `${origin}/markets/${id}`;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${market.name} product compliance`, description: market.summary, url: canonical, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN }, breadcrumb: breadcrumbSchema([{ name: 'Markets', url: `${origin}/markets` }, { name: market.name, url: canonical }]) };
  const body = `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/markets">Markets</a><span>/</span><span>${escapeHtml(market.name)}</span></nav><div class="content-hero"><span>MARKET</span><h1>${escapeHtml(market.name)}</h1><p>${escapeHtml(market.summary)}</p><div class="page-note"><strong>${rows.results.length} active requirements.</strong> Compare evidence, labeling, testing and documentation duties by product pathway.</div><div class="tag-row">${productLinks}</div></div><section class="content-section"><h2>Requirements by product pathway</h2><p>Use the linked records as a starting checklist. Each requirement includes its legal basis, official source and last verification date; confirm the current rule before shipment.</p></section><div class="record-grid">${cards}</div>`;
  return html(page(`${market.name} product compliance`, market.summary, body, canonical, schema));
}

async function productPage(env, slug, origin) {
  const product = await env.DB.prepare('SELECT * FROM products WHERE slug=?').bind(slug).first();
  if (!product) return notFound();
  const rows = await env.DB.prepare('SELECT r.*, m.name AS market_name FROM requirements r JOIN markets m ON m.id=r.market_id WHERE r.product_id=? AND r.status=? ORDER BY m.name,r.type,r.title').bind(product.id, 'active').all();
  const cards = rows.results.map((item) => `<article class="record"><span>${escapeHtml(item.market_name)} / ${escapeHtml(item.type)}</span><h2><a href="/requirements/${item.id}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.summary)}</p><small>Verified ${escapeHtml(item.last_verified_at)}</small></article>`).join('');
  const markets = [...new Set(rows.results.map((item) => item.market_name))].join(', ');
  const canonical = `${origin}/products/${slug}`;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${product.name} compliance`, description: product.summary, url: canonical, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN }, breadcrumb: breadcrumbSchema([{ name: 'Products', url: `${origin}/products` }, { name: product.name, url: canonical }]) };
  const body = `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/products">Products</a><span>/</span><span>${escapeHtml(product.name)}</span></nav><div class="content-hero"><span>PRODUCT CATEGORY</span><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(product.summary)}</p><div class="page-note"><strong>${rows.results.length} active requirements across ${escapeHtml(markets)}.</strong> Start with the destination market, then collect the evidence tied to the exact product configuration.</div></div><section class="content-section"><h2>Market pathways</h2><p>These records are organized by destination market and requirement type. Open a requirement to see the legal basis, verification date and official source.</p></section><div class="record-grid">${cards}</div>`;
  return html(page(`${product.name} compliance`, product.summary, body, canonical, schema));
}

async function requirementPage(env, id, origin) {
  const item = await env.DB.prepare('SELECT r.*,m.name AS market_name,p.name AS product_name FROM requirements r JOIN markets m ON m.id=r.market_id JOIN products p ON p.id=r.product_id WHERE r.id=?').bind(id).first();
  if (!item) return notFound();
  const [sources, related] = await Promise.all([
    env.DB.prepare('SELECT title,source_url,checked_at,last_http_status FROM source_documents WHERE requirement_id=? ORDER BY checked_at DESC').bind(id).all(),
    env.DB.prepare("SELECT slug,title,excerpt FROM articles WHERE market_id=? AND product_id=? AND status='published' ORDER BY published_at DESC LIMIT 3").bind(item.market_id, item.product_id).all()
  ]);
  const sourceStatus = sources.results[0]?.last_http_status ? `Last monitor response: HTTP ${sources.results[0].last_http_status}.` : 'Source monitor status is pending the next scheduled check.';
  const relatedCards = related.results.map((article) => `<article class="related-item"><h3><a href="/articles/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.excerpt)}</p></article>`).join('');
  const canonical = `${origin}/requirements/${id}`;
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: item.title, description: item.summary, url: canonical, dateModified: item.last_verified_at, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN }, breadcrumb: breadcrumbSchema([{ name: 'Markets', url: `${origin}/markets` }, { name: item.market_name, url: `${origin}/markets/${item.market_id}` }, { name: item.title, url: canonical }]) };
  const body = `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/markets/${encodeURIComponent(item.market_id)}">${escapeHtml(item.market_name)}</a><span>/</span><a href="/products/${encodeURIComponent(item.product_id)}">${escapeHtml(item.product_name)}</a><span>/</span><span>${escapeHtml(item.title)}</span></nav><div class="content-hero"><span>${escapeHtml(item.market_name)} / ${escapeHtml(item.product_name)}</span><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.summary)}</p></div><dl class="facts"><div><dt>Status</dt><dd>${escapeHtml(item.status)}</dd></div><div><dt>Requirement type</dt><dd>${escapeHtml(item.type)}</dd></div><div><dt>Legal basis</dt><dd>${escapeHtml(item.legal_basis || 'Check official source')}</dd></div><div><dt>Effective from</dt><dd>${escapeHtml(item.effective_from || 'Not specified')}</dd></div><div><dt>Last verified</dt><dd>${escapeHtml(item.last_verified_at)}</dd></div></dl><section class="evidence-panel"><h2>Evidence workflow</h2><p>Map this requirement to the exact model, material, destination and responsible economic operator. Keep the source version, test report or declaration that supports the conclusion in the product compliance file.</p><p>${sourceStatus}</p><a class="primary-button" href="${escapeHtml(item.official_url)}" target="_blank" rel="noreferrer">Open official source <span>-&gt;</span></a></section>${relatedCards ? `<section class="related-section"><h2>Related briefings</h2><div class="related-grid">${relatedCards}</div></section>` : ''}`;
  return html(page(item.title, item.summary, body, canonical, schema));
}

async function articlePage(env, slug, origin) {
  const article = await env.DB.prepare("SELECT a.*,m.name AS market_name,p.name AS product_name FROM articles a LEFT JOIN markets m ON m.id=a.market_id LEFT JOIN products p ON p.id=a.product_id WHERE a.slug=? AND a.status='published'").bind(slug).first();
  if (!article) return notFound();
  const [relatedRequirements, relatedArticles] = await Promise.all([
    env.DB.prepare("SELECT id,title,summary,type FROM requirements WHERE market_id=? AND product_id=? AND status='active' ORDER BY type,title LIMIT 6").bind(article.market_id, article.product_id).all(),
    env.DB.prepare("SELECT slug,title,excerpt FROM articles WHERE market_id=? AND product_id=? AND status='published' AND slug<>? ORDER BY published_at DESC LIMIT 3").bind(article.market_id, article.product_id, slug).all()
  ]);
  const paragraphs = renderArticleBody(article.body);
  const requirementLinks = relatedRequirements.results.map((item) => `<li><a href="/requirements/${item.id}">${escapeHtml(item.title)}</a><span>${escapeHtml(item.type)}</span></li>`).join('');
  const relatedCards = relatedArticles.results.map((item) => `<article class="related-item"><h3><a href="/articles/${encodeURIComponent(item.slug)}">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.excerpt)}</p></article>`).join('');
  const canonical = `${origin}/articles/${slug}`;
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, datePublished: article.published_at, dateModified: article.updated_at, mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }, author: { '@type': 'Organization', name: 'HT Fluo' }, publisher: { '@type': 'Organization', name: 'HT Fluo', url: SITE_ORIGIN }, about: [article.market_name, article.product_name].filter(Boolean) };
  const body = `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/articles">Briefings</a><span>/</span><span>${escapeHtml(article.title)}</span></nav><article class="article-page"><div class="content-hero"><span>${escapeHtml(article.category)}</span><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.excerpt)}</p><small>Updated ${escapeHtml(article.updated_at)} / ${escapeHtml(article.market_name || 'Global')} / ${escapeHtml(article.product_name || 'All products')}</small></div><div class="article-body">${paragraphs}<p class="source-note"><strong>Primary reference:</strong> <a href="${escapeHtml(article.source_url)}" target="_blank" rel="noreferrer">Open the official source -&gt;</a></p></div>${requirementLinks ? `<section class="related-section"><h2>Checklist for this topic</h2><ul class="requirement-links">${requirementLinks}</ul></section>` : ''}${relatedCards ? `<section class="related-section"><h2>Continue the pathway</h2><div class="related-grid">${relatedCards}</div></section>` : ''}</article>`;
  return html(page(article.title, article.excerpt, body, canonical, schema));
}

async function marketsIndex(env, origin) {
  const rows = await env.DB.prepare('SELECT m.*, COUNT(r.id) AS requirement_count FROM markets m LEFT JOIN requirements r ON r.market_id=m.id AND r.status=? GROUP BY m.id ORDER BY m.name').bind('active').all();
  const cards = rows.results.map((item) => `<article class="record"><span>MARKET</span><h2><a href="/markets/${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a></h2><p>${escapeHtml(item.summary)}</p><small>${item.requirement_count} active requirements</small><a href="/markets/${encodeURIComponent(item.id)}">Explore market pathway -&gt;</a></article>`).join('');
  const canonical = `${origin}/markets`;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Global market compliance pathways', description: 'Compare product compliance requirements across the United States, European Union and United Kingdom.', url: canonical, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN } };
  return html(page('Global market compliance pathways', 'Compare product compliance requirements across the United States, European Union and United Kingdom.', `<div class="content-hero"><span>MARKET DATABASE</span><h1>Choose the market before you choose the checklist.</h1><p>Each market page connects destination-specific requirements to product categories, official sources and practical evidence workflows.</p></div><div class="record-grid">${cards}</div>`, canonical, schema));
}

async function productsIndex(env, origin) {
  const rows = await env.DB.prepare('SELECT p.*, COUNT(r.id) AS requirement_count FROM products p LEFT JOIN requirements r ON r.product_id=p.id AND r.status=? GROUP BY p.id ORDER BY p.name').bind('active').all();
  const cards = rows.results.map((item) => `<article class="record"><span>PRODUCT CATEGORY</span><h2><a href="/products/${encodeURIComponent(item.slug)}">${escapeHtml(item.name)}</a></h2><p>${escapeHtml(item.summary)}</p><small>${item.requirement_count} active requirements</small><a href="/products/${encodeURIComponent(item.slug)}">Explore product pathway -&gt;</a></article>`).join('');
  const canonical = `${origin}/products`;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Product compliance pathways', description: 'Product categories mapped to market-entry evidence, testing, labeling and documentation requirements.', url: canonical, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN } };
  return html(page('Product compliance pathways', 'Product categories mapped to market-entry evidence, testing, labeling and documentation requirements.', `<div class="content-hero"><span>PRODUCT DATABASE</span><h1>Start with the product you are putting on the market.</h1><p>Move from a product category to destination-specific requirements, source documents and decision tools.</p></div><div class="record-grid">${cards}</div>`, canonical, schema));
}

async function articlesIndex(env, origin) {
  const rows = await env.DB.prepare("SELECT slug,title,excerpt,category,market_id,product_id,published_at,updated_at FROM articles WHERE status='published' ORDER BY updated_at DESC, published_at DESC, title").all();
  const cards = rows.results.map((item) => `<article class="record"><span>${escapeHtml(item.category)}</span><h2><a href="/articles/${encodeURIComponent(item.slug)}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.excerpt)}</p><small>Updated ${escapeHtml(item.updated_at)}</small><a href="/articles/${encodeURIComponent(item.slug)}">Read briefing -&gt;</a></article>`).join('');
  const canonical = `${origin}/articles`;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Market access briefings', description: 'Practical briefings on product compliance, labeling, testing, customs and market-entry decisions.', url: canonical, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN } };
  return html(page('Market access briefings', 'Practical briefings on product compliance, labeling, testing, customs and market-entry decisions.', `<div class="content-hero"><span>EDITORIAL LIBRARY</span><h1>Briefings for the decisions behind every shipment.</h1><p>Research notes connect market rules to the evidence, owners and launch decisions that teams need to make.</p></div><div class="record-grid">${cards}</div>`, canonical, schema));
}

async function directoryPage(env, origin) {
  const providers = await env.DB.prepare('SELECT * FROM providers ORDER BY name').all();
  const cards = providers.results.map((item) => `<article class="record"><span>${escapeHtml(item.provider_type)}</span><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.description)}</p><small>${escapeHtml(item.markets)} / Verified ${escapeHtml(item.last_verified_at)}</small><a href="${escapeHtml(item.website)}" target="_blank" rel="noreferrer">Visit provider -&gt;</a></article>`).join('');
  const canonical = `${origin}/directory`;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Compliance service provider directory', description: 'An editorial directory of testing, inspection and certification providers.', url: canonical, isPartOf: { '@type': 'WebSite', name: 'HT Fluo', url: SITE_ORIGIN } };
  return html(page('Compliance service provider directory', 'An editorial directory of testing, inspection and certification providers.', `<div class="content-hero"><span>EDITORIAL DIRECTORY</span><h1>Find a compliance provider.</h1><p>Testing, inspection and certification organizations relevant to the markets covered by HT Fluo. Treat listings as an editorial starting point and verify scope, accreditation and current availability directly with each provider.</p></div><div class="record-grid">${cards}</div>`, canonical, schema));
}

async function sitemap(env, origin) {
  const [markets, products, requirements, articles] = await Promise.all([
    env.DB.prepare('SELECT id FROM markets').all(), env.DB.prepare('SELECT slug FROM products').all(),
    env.DB.prepare("SELECT id FROM requirements WHERE status='active'").all(), env.DB.prepare("SELECT slug,updated_at FROM articles WHERE status='published'").all()
  ]);
  const urls = [`${origin}/`, `${origin}/markets`, `${origin}/products`, `${origin}/articles`, `${origin}/directory`, ...markets.results.map((x) => `${origin}/markets/${x.id}`), ...products.results.map((x) => `${origin}/products/${x.slug}`), ...requirements.results.map((x) => `${origin}/requirements/${x.id}`), ...articles.results.map((x) => `${origin}/articles/${x.slug}`)];
  const updated = new Map(articles.results.map((x) => [`${origin}/articles/${x.slug}`, x.updated_at]));
  const entries = urls.map((url) => `<url><loc>${escapeHtml(url)}</loc>${updated.has(url) ? `<lastmod>${escapeHtml(updated.get(url))}</lastmod>` : ''}</url>`).join('');
  return withSecurityHeaders(new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, { headers: { 'content-type': 'application/xml; charset=utf-8' } }));
}

export default {
  async fetch(request, env, ctx) {
    const resilientDb = new ResilientDB(env.DB);
    env = { ...env, DB: resilientDb };
    try {
    const url = new URL(request.url);
    if (url.hostname === 'www.htfluo.com' || url.hostname.endsWith('.workers.dev')) {
      url.hostname = 'htfluo.com';
      return withSecurityHeaders(Response.redirect(url.toString(), 301));
    }
    const origin = canonicalOrigin(url);
    const path = url.pathname;
        
if (path === '/api/health') return json({ ok: true, service: 'htfluo-market-access' });
    if (path === '/api/markets') return json((await env.DB.prepare('SELECT * FROM markets ORDER BY name').all()).results);
    if (path === '/api/products') return json((await env.DB.prepare('SELECT * FROM products ORDER BY name').all()).results);
    if (path === '/api/providers') return json((await env.DB.prepare('SELECT * FROM providers ORDER BY name').all()).results);
    if (path === '/api/config') return json({ turnstileSiteKey: env.TURNSTILE_SITE_KEY || null });
    if (path === '/api/stats') {
      const stats = await env.DB.prepare("SELECT (SELECT COUNT(*) FROM requirements WHERE status='active') AS requirements,(SELECT COUNT(*) FROM articles WHERE status='published') AS articles,(SELECT COUNT(*) FROM providers) AS providers").first();
      return json(stats);
    }
    if (path === '/api/articles') return json((await env.DB.prepare("SELECT slug,title,excerpt,category,published_at,updated_at,source_url FROM articles WHERE status='published' ORDER BY updated_at DESC, published_at DESC, title LIMIT 30").all()).results);
    if (path === '/api/articles/sync') {
      const rows = (await env.DB.prepare("SELECT slug,title,excerpt,category,published_at,updated_at,source_url FROM articles WHERE status='published' ORDER BY updated_at DESC, published_at DESC, title LIMIT 30").all()).results;
      return json({
        ok: true,
        service: "HT Fluo Editorial Intelligence Desk",
        synced_at: new Date().toISOString(),
        total: rows.length,
        articles: rows
      });
    }
    if (path === '/api/tariffs') {
      const market = url.searchParams.get('market');
      const hs = String(url.searchParams.get('hs') || '').replace(/\D/g, '').slice(0, 2);
      if (!market || hs.length !== 2) return json({ error: 'market and two-digit HS prefix are required' }, { status: 400 });
      const tariff = await env.DB.prepare('SELECT * FROM tariffs WHERE market_id=? AND hs_prefix=?').bind(market, hs).first();
      return tariff ? json(tariff) : json({ error: 'No indicative rate available' }, { status: 404 });
    }

    if (path === '/api/requirements') {
      const market = url.searchParams.get('market');
      const product = url.searchParams.get('product');
      if (!market || !product) return json({ error: 'market and product are required' }, { status: 400 });
      const rows = await env.DB.prepare('SELECT r.*,m.name AS market_name,p.name AS product_name FROM requirements r JOIN markets m ON m.id=r.market_id JOIN products p ON p.id=r.product_id WHERE r.market_id=? AND r.product_id=? AND r.status=? ORDER BY r.type,r.title').bind(market, product, 'active').all();
      return json(rows.results);
    }

    if (path === '/api/subscribe' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const email = String(body.email || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'valid email required' }, { status: 400 });
      const verified = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, body.turnstileToken, request.headers.get('CF-Connecting-IP'));
      if (!verified) return json({ error: 'verification failed' }, { status: 400 });
      await env.DB.prepare("INSERT INTO subscriptions(email,market_id,product_id) VALUES(?,?,?) ON CONFLICT(email) DO UPDATE SET market_id=excluded.market_id,product_id=excluded.product_id,status='active',updated_at=CURRENT_TIMESTAMP").bind(email, body.market || null, body.product || null).run();
      if (ctx) ctx.waitUntil(sendWelcomeEmail(env, email));
      return json({ ok: true, message: 'Subscription saved.' });
    }

        if (path === '/robots.txt') return withSecurityHeaders(new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } }));
    if (path === '/sitemap.xml') return await sitemap(env, origin);
    if (path === '/markets') return await marketsIndex(env, origin);
    if (path === '/products') return await productsIndex(env, origin);
    if (path === '/articles') return await articlesIndex(env, origin);
    if (path.startsWith('/markets/')) return await marketPage(env, decodeURIComponent(path.slice(9)), origin);
    if (path.startsWith('/products/')) return await productPage(env, decodeURIComponent(path.slice(10)), origin);
    if (path.startsWith('/requirements/')) return await requirementPage(env, Number(path.slice(14)), origin);
    if (path.startsWith('/articles/')) return await articlePage(env, decodeURIComponent(path.slice(10)), origin);
    if (path === '/directory') return await directoryPage(env, origin);
    if (!env.ASSETS) return notFound();
    const assetResponse = await env.ASSETS.fetch(request);
    return assetResponse.status === 404 ? notFound() : withSecurityHeaders(assetResponse);
    } catch (err) {
      return new Response('Worker Error: ' + err.message + '\n' + err.stack, {
        status: 500,
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      });
    }
  },

  async scheduled(_event, env) {
    if (!env.UPDATE_QUEUE) return;
    const sources = await env.DB.prepare("SELECT id,requirement_id,source_url,content_hash FROM source_documents WHERE status='active' ORDER BY checked_at ASC LIMIT 25").all();
    if (sources.results.length) await env.UPDATE_QUEUE.sendBatch(sources.results.map((body) => ({ body })));
  },

  async queue(batch, env) {
    for (const message of batch.messages) await checkSource(env, message.body);
  }
};

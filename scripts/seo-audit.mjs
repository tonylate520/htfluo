const base = (process.env.BASE_URL || 'https://htfluo.com').replace(/\/$/, '');
const failures = [];
const titles = new Map();
const canonicals = new Map();
const internalLinks = new Map();
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const fetchWithRetry = async (url, options = {}) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.status < 500 || attempt === 3) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(attempt * 500);
  }
  throw lastError;
};
const fetchTextWithRetry = async (url, options = {}) => {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(url, options);
      const text = await response.text();
      if (response.status < 500 || attempt === 5) return { response, text };
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(attempt * 700);
  }
  throw lastError;
};

const decodeEntities = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const content = (html, pattern) => decodeEntities(html.match(pattern)?.[1]?.trim() || '');

const { response: robots, text: robotsText } = await fetchTextWithRetry(`${base}/robots.txt`);
if (!robots.ok || !robotsText.includes(`Sitemap: ${base}/sitemap.xml`)) failures.push('robots.txt does not advertise the canonical sitemap');

const { response: sitemapResponse, text: sitemapText } = await fetchTextWithRetry(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) failures.push(`sitemap.xml returned HTTP ${sitemapResponse.status}`);
const urls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeEntities(match[1]));
if (urls.length < 100) failures.push(`sitemap contains only ${urls.length} URLs`);
if (new Set(urls).size !== urls.length) failures.push('sitemap contains duplicate URLs');
if (urls.some((url) => !url.startsWith(`${base}/`) && url !== `${base}/`)) failures.push('sitemap contains a non-canonical host');

for (let index = 0; index < urls.length; index += 4) {
  const batch = urls.slice(index, index + 4);
  await Promise.all(batch.map(async (url) => {
    try {
      const { response, text: html } = await fetchTextWithRetry(url, { redirect: 'manual' });
      if (response.status !== 200) {
        failures.push(`${url} returned HTTP ${response.status}`);
        return;
      }
      if (!response.headers.get('content-type')?.includes('text/html')) return;
      const title = content(html, /<title>([^<]+)<\/title>/i);
      const description = content(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
      const canonical = content(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
      const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
      const ogTitle = content(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
      const ogDescription = content(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
      if (!title || title.length > 65) failures.push(`${url} has a missing or long title (${title.length})`);
      if (!description || description.length < 50 || description.length > 180) failures.push(`${url} has an invalid meta description length (${description.length})`);
      if (canonical !== url) failures.push(`${url} canonical is ${canonical || 'missing'}`);
      if (h1Count !== 1) failures.push(`${url} has ${h1Count} H1 elements`);
      if (!ogTitle || !ogDescription) failures.push(`${url} is missing Open Graph metadata`);
      if (!/<html\s+lang="en"/i.test(html)) failures.push(`${url} is missing an English language declaration`);
      if (/name="robots"\s+content="[^"]*noindex/i.test(html)) failures.push(`${url} is unexpectedly noindex`);
      if (titles.has(title)) failures.push(`${url} duplicates title with ${titles.get(title)}`);
      else titles.set(title, url);
      if (canonicals.has(canonical)) failures.push(`${url} duplicates canonical with ${canonicals.get(canonical)}`);
      else canonicals.set(canonical, url);
      const schemas = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
      if (!schemas.length) failures.push(`${url} has no JSON-LD`);
      for (const schema of schemas) {
        try { JSON.parse(schema[1]); } catch { failures.push(`${url} has invalid JSON-LD`); }
      }
      for (const match of html.matchAll(/<a\s+[^>]*href="([^"]+)"/gi)) {
        try {
          const target = new URL(decodeEntities(match[1]), url);
          if (target.origin !== new URL(base).origin) continue;
          if (target.pathname.endsWith('.xml') || target.pathname.endsWith('.txt')) continue;
          target.hash = '';
          internalLinks.set(target.toString(), url);
        } catch {
          failures.push(`${url} contains an invalid internal link: ${match[1]}`);
        }
      }
    } catch (error) {
      failures.push(`${url} failed: ${error.message}`);
    }
  }));
}

const indexed = new Set(urls);
for (const [target, source] of internalLinks) {
  if (!indexed.has(target)) failures.push(`${source} links to non-indexed internal URL ${target}`);
}
const articleLastmods = (sitemapText.match(/<lastmod>[^<]+<\/lastmod>/g) || []).length;
if (articleLastmods < 30) failures.push(`sitemap contains only ${articleLastmods} lastmod entries`);

const { response: missing, text: missingHtml } = await fetchTextWithRetry(`${base}/seo-audit-missing`, { redirect: 'manual' });
if (missing.status !== 404 || !missingHtml.includes('noindex,follow')) failures.push('404 page is not a noindex response');

const www = await fetchWithRetry(`https://www.htfluo.com/seo-check?source=audit`, { redirect: 'manual' });
if (www.status !== 301 || www.headers.get('location') !== `${base}/seo-check?source=audit`) failures.push('www canonical redirect is incorrect');

if (failures.length) {
  console.error(`SEO audit failed (${failures.length} findings across ${urls.length} URLs)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed: ${urls.length} canonical URLs, ${titles.size} unique HTML titles, ${internalLinks.size} internal links, valid JSON-LD and redirects.`);
}

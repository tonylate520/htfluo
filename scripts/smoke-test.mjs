const base = (process.env.BASE_URL || 'http://127.0.0.1:8791').replace(/\/$/, '');
const routes = [
  '/', '/api/health', '/api/stats', '/api/markets', '/api/products', '/api/articles',
  '/api/providers', '/api/requirements?market=eu&product=electronics',
  '/api/tariffs?market=eu&hs=85', '/markets/eu', '/products/electronics',
  '/markets', '/products', '/articles', '/requirements/1',
  '/articles/eu-electronics-market-entry', '/directory',
  '/sitemap.xml', '/robots.txt'
];

const failures = [];
for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`);
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    else console.log(`ok ${route}`);
  } catch (error) {
    failures.push(`${route}: ${error.message}`);
  }
}

try {
  const response = await fetch(`${base}/api/stats`);
  const stats = await response.json();
  for (const key of ['requirements', 'articles', 'providers']) {
    if (!Number.isInteger(stats[key]) || stats[key] < 1) failures.push(`/api/stats: invalid ${key}`);
  }
} catch (error) {
  failures.push(`/api/stats JSON: ${error.message}`);
}

if (failures.length) {
  console.error(`Smoke test failed (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Smoke test passed for ${base}`);
}

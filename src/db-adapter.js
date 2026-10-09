import staticData from './static-data.json';

export class ResilientDB {
  constructor(envDb) {
    this.envDb = envDb;
    this.staticData = staticData;
  }

  prepare(query) {
    const rawQuery = query.trim();
    const envDb = this.envDb;
    const self = this;

    return {
      params: [],
      bind(...args) {
        this.params = args;
        return this;
      },
      async first(col) {
        try {
          if (envDb) {
            const stmt = envDb.prepare(rawQuery);
            const res = await (this.params.length ? stmt.bind(...this.params) : stmt).first(col);
            if (res !== null && res !== undefined) return res;
          }
        } catch (err) {
          // Cloudflare D1 limit or failure - fallback cleanly
        }
        return self.fallbackFirst(rawQuery, this.params, col);
      },
      async all() {
        try {
          if (envDb) {
            const stmt = envDb.prepare(rawQuery);
            const res = await (this.params.length ? stmt.bind(...this.params) : stmt).all();
            if (res && res.results && res.results.length > 0) return res;
          }
        } catch (err) {
          // Cloudflare D1 limit or failure - fallback cleanly
        }
        return { results: self.fallbackAll(rawQuery, this.params) };
      },
      async run() {
        try {
          if (envDb) {
            const stmt = envDb.prepare(rawQuery);
            return await (this.params.length ? stmt.bind(...this.params) : stmt).run();
          }
        } catch (err) {
          // Ignore
        }
        return { success: true };
      }
    };
  }

  fallbackAll(query, params) {
    const q = query.toLowerCase();
    
    // 1. Markets
    if (q.includes('from markets')) {
      return [...this.staticData.markets].map(m => {
        const reqCount = this.staticData.requirements.filter(r => r.market_id === m.id && r.status === 'active').length;
        return { ...m, requirement_count: reqCount };
      }).sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // 2. Products
    if (q.includes('from products')) {
      return [...this.staticData.products].map(p => {
        const reqCount = this.staticData.requirements.filter(r => r.product_id === p.id && r.status === 'active').length;
        return { ...p, requirement_count: reqCount };
      }).sort((a, b) => a.name.localeCompare(b.name));
    }

    // 3. Providers
    if (q.includes('from providers')) {
      return [...this.staticData.providers].sort((a, b) => a.name.localeCompare(b.name));
    }

    // 4. Source documents
    if (q.includes('from source_documents')) {
      if (params.length && q.includes('requirement_id=?')) {
        const reqId = params[0];
        return this.staticData.source_documents.filter(s => s.requirement_id == reqId);
      }
      return this.staticData.source_documents;
    }

    // 5. Requirements
    if (q.includes('from requirements')) {
      let list = this.staticData.requirements.map(r => {
        const m = this.staticData.markets.find(m => m.id === r.market_id);
        const p = this.staticData.products.find(p => p.id === r.product_id);
        return {
          ...r,
          market_name: m ? m.name : r.market_id,
          product_name: p ? p.name : r.product_id,
          product_slug: p ? p.slug : r.product_id
        };
      });

      if (q.includes('market_id=?') && q.includes('product_id=?')) {
        const [mId, pId] = params;
        list = list.filter(r => r.market_id === mId && r.product_id === pId && r.status === 'active');
      } else if (q.includes('market_id=?')) {
        const [mId] = params;
        list = list.filter(r => r.market_id === mId && r.status === 'active');
      } else if (q.includes('product_id=?')) {
        const [pId] = params;
        list = list.filter(r => r.product_id === pId && r.status === 'active');
      } else if (q.includes('status=?')) {
        list = list.filter(r => r.status === params[0]);
      }
      return list;
    }

    // 6. Articles
    if (q.includes('from articles')) {
      let list = [...this.staticData.articles].filter(a => a.status === 'published');
      if (q.includes('market_id=?') && q.includes('product_id=?')) {
        const [mId, pId] = params;
        list = list.filter(a => a.market_id === mId && a.product_id === pId);
      }
      if (q.includes('slug<>?')) {
        const excludeSlug = params[2] || params[params.length - 1];
        list = list.filter(a => a.slug !== excludeSlug);
      }
      list.sort((a, b) => (b.updated_at || b.published_at).localeCompare(a.updated_at || a.published_at));
      if (q.includes('limit 3')) return list.slice(0, 3);
      if (q.includes('limit 6')) return list.slice(0, 6);
      if (q.includes('limit 30')) return list.slice(0, 30);
      return list;
    }

    return [];
  }

  fallbackFirst(query, params, col) {
    const q = query.toLowerCase();

    // Stats query
    if (q.includes('count(*) from requirements') && q.includes('count(*) from articles')) {
      return {
        requirements: this.staticData.requirements.filter(r => r.status === 'active').length,
        articles: this.staticData.articles.filter(a => a.status === 'published').length,
        providers: this.staticData.providers.length
      };
    }

    // Single market
    if (q.includes('from markets') && q.includes('id=?')) {
      return this.staticData.markets.find(m => m.id === params[0]) || null;
    }

    // Single product
    if (q.includes('from products') && (q.includes('slug=?') || q.includes('id=?'))) {
      return this.staticData.products.find(p => p.slug === params[0] || p.id === params[0]) || null;
    }

    // Single requirement
    if (q.includes('from requirements') && (q.includes('id=?') || q.includes('r.id=?'))) {
      const r = this.staticData.requirements.find(x => x.id == params[0]);
      if (!r) return null;
      const m = this.staticData.markets.find(m => m.id === r.market_id);
      const p = this.staticData.products.find(p => p.id === r.product_id);
      return {
        ...r,
        market_name: m ? m.name : r.market_id,
        product_name: p ? p.name : r.product_id,
        product_slug: p ? p.slug : r.product_id
      };
    }

    // Single article (e.g. WHERE a.slug=? or WHERE slug=?)
    if (q.includes('from articles') && (q.includes('slug=?') || q.includes('a.slug=?'))) {
      const art = this.staticData.articles.find(a => a.slug === params[0] && a.status === 'published');
      if (!art) return null;
      const m = this.staticData.markets.find(m => m.id === art.market_id);
      const p = this.staticData.products.find(p => p.id === art.product_id);
      return {
        ...art,
        market_name: m ? m.name : art.market_id,
        product_name: p ? p.name : art.product_id
      };
    }

    // Tariff
    if (q.includes('from tariffs') && q.includes('market_id=?') && q.includes('hs_prefix=?')) {
      const [mId, hs] = params;
      return this.staticData.tariffs.find(t => t.market_id === mId && t.hs_prefix === hs) || null;
    }

    return null;
  }
}

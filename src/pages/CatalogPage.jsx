import { useSearchParams } from 'react-router-dom';
import Product from '../components/Product';
import { products } from '../data/products';

export default function CatalogPage() {
  // Read filters from the URL so a refresh preserves the selected filters.
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('category') || 'All';
  const sort = params.get('sort') || 'featured';
  const categories = ['All', ...new Set(products.map((product) => product.category))];

  function updateFilter(key, value) {
    const nextParams = new URLSearchParams(params);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setParams(nextParams, { replace: true });
  }

  // These values are calculated during render. No extra state or effect is needed.
  const filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const searchableText = `${product.name} ${product.description}`.toLowerCase();
    const matchesSearch = searchableText.includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // filter() made a new array, so sorting it does not change the catalog.
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return (
    <section className="section-shell">
      <p className="eyebrow">The collection</p>
      <h1>Good things. Everyday.</h1>
      <p className="intro">
        Discover tech that fits your life, from your morning playlist to your next adventure.
      </p>

      <div className="filters">
        <label>
          Search products
          <input
            type="search"
            value={search}
            onChange={(event) => updateFilter('q', event.target.value)}
            placeholder="Try headphones…"
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => updateFilter('category', event.target.value)}>
            {categories.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(event) => updateFilter('sort', event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      <p className="result-count" role="status">{filtered.length} products</p>
      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((product) => <Product key={product.id} {...product} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <button className="button" onClick={() => setParams({})}>Clear filters</button>
        </div>
      )}
    </section>
  );
}

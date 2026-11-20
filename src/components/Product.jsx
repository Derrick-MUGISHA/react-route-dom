import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useShop } from '../store/ShopContext';
import { money } from '../store/shop';

export default function Product({ id, slug, name, price, description, image, category, stock }) {
  const { dispatch, cart } = useShop();
  const [added, setAdded] = useState(false);
  const cartItem = cart.find((item) => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const stockLimitReached = quantityInCart >= stock;

  function handleAddToCart() {
    // Shared cart state changes through the reducer; feedback stays local.
    dispatch({ type: 'add', id });
    setAdded(true);
  }

  return (
    <article className="product-card">
      <Link to={`/products/${slug}`}>
        <img src={image} alt={name} loading="lazy" />
      </Link>
      <div className="product-content">
        <p className="eyebrow">{category}</p>
        <div className="product-heading">
          <h2><Link to={`/products/id/${id}`}>{name}</Link></h2>
          <strong>{money(price)}</strong>
        </div>
        <p>{description}</p>
        <button className="button" disabled={stockLimitReached} onClick={handleAddToCart}>
          {stockLimitReached ? 'Stock limit reached' : 'Add to bag'}
        </button>
        <span role="status" className="text-sm">{added ? 'Added to your bag' : ''}</span>
      </div>
    </article>
  );
}

export function ProductList({ products }) {
  return (
    <section id="products" className="section-shell">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Thoughtfully selected</p>
          <h2>Everyday favorites</h2>
        </div>
        <Link to="/products">Explore all products</Link>
      </div>
      <div className="product-grid">
        {products.map((product) => <Product key={product.id} {...product} />)}
      </div>
    </section>
  );
}

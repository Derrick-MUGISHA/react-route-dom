import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { useShop } from '../store/ShopContext';
import { findById, findBySlug, money } from '../store/shop';

export default function ProductPage({ lookup }) {
  const { id, slug } = useParams();
  const { dispatch, cart } = useShop();
  const [added, setAdded] = useState(false);

  // The route passes lookup="id" or lookup="slug" to choose the search.
  let product;
  if (lookup === 'id') {
    product = findById(id);
  } else {
    product = findBySlug(slug);
  }

  // All hooks are called above this early return.
  if (!product) {
    return (
      <EmptyState title="Product not found">
        This product does not exist. Explore the rest of the collection.
      </EmptyState>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const stockLimitReached = quantityInCart >= product.stock;

  function handleAddToCart() {
    dispatch({ type: 'add', id: product.id });
    setAdded(true);
  }

  return (
    <section className="section-shell">
      <p className="breadcrumb"><Link to="/products">All products</Link> / {product.name}</p>
      <div className="detail-grid">
        <img className="detail-image" src={product.image} alt={product.name} />
        <div>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{money(product.price)}</p>
          <p className="intro">{product.description}</p>
          <p>{product.stock} available · Maximum {product.stock} per order</p>
          <button className="button" disabled={stockLimitReached} onClick={handleAddToCart}>
            {stockLimitReached ? 'Stock limit reached' : 'Add to bag'}
          </button>
          <p role="status">
            {added && <>Added to your bag. <Link to="/cart">View bag</Link></>}
          </p>
          <div className="delivery-note">
            Free delivery on orders of $200 or more. Standard delivery is $10. Prices are in USD.
          </div>
          <p className="route-links">
            Open this item <Link to={`/products/id/${product.id}`}>by ID</Link>
            {' or '}<Link to={`/products/${product.slug}`}>by slug</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

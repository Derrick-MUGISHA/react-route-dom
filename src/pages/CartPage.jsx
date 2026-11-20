import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import OrderSummary from '../components/OrderSummary';
import { useShop } from '../store/ShopContext';
import { money } from '../store/shop';

export default function CartPage() {
  const { items, dispatch } = useShop();

  function changeQuantity(id, quantity) {
    // select values arrive as strings; the reducer converts them to numbers.
    dispatch({ type: 'quantity', id, quantity });
  }

  if (items.length === 0) {
    return <EmptyState title="Your bag is empty">Find your next everyday essential.</EmptyState>;
  }

  return (
    <section className="section-shell">
      <p className="eyebrow">A few good choices</p>
      <h1>Your shopping bag</h1>
      <div className="checkout-grid">
        <div>
          {items.map((item) => (
            <article key={item.id} className="cart-row">
              <Link to={`/products/${item.slug}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div>
                <h2><Link to={`/products/${item.slug}`}>{item.name}</Link></h2>
                <p>{money(item.price)} each</p>
                <label>
                  Quantity for {item.name}
                  <select
                    value={item.quantity}
                    onChange={(event) => changeQuantity(item.id, event.target.value)}
                  >
                    {Array.from({ length: item.stock }, (_, index) => (
                      <option key={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </label>
                <button className="text-button" onClick={() => changeQuantity(item.id, 0)}>
                  Remove {item.name}
                </button>
              </div>
              <strong>{money(item.price * item.quantity)}</strong>
            </article>
          ))}
          <Link to="/products">Continue shopping</Link>
        </div>
        <aside>
          <OrderSummary items={items} />
          <Link className="button full-width" to="/checkout">Continue to checkout</Link>
          <p className="small-note">Sign in to place a demo order.</p>
        </aside>
      </div>
    </section>
  );
}

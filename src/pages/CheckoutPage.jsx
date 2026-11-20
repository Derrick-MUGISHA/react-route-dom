import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import OrderSummary from '../components/OrderSummary';
import { useShop } from '../store/ShopContext';
import { money } from '../store/shop';

export default function CheckoutPage() {
  const { items, user, dispatch } = useShop();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const fields = new FormData(event.currentTarget);
    const delivery = {
      name: fields.get('name').trim(),
      address: fields.get('address').trim(),
      city: fields.get('city').trim(),
      country: fields.get('country').trim(),
    };
    const id = crypto.randomUUID();

    // Generate changing values in the event handler, keeping the reducer pure.
    dispatch({ type: 'order', id, createdAt: new Date().toISOString(), delivery });
    navigate('/orders', { replace: true, state: { orderId: id } });
  }

  if (items.length === 0) {
    return <EmptyState title="Nothing to check out yet">Add a product before placing an order.</EmptyState>;
  }

  return (
    <section className="section-shell">
      <p className="eyebrow">One last step</p>
      <h1>Checkout</h1>
      <p>Signed in as {user.email}</p>
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Delivery details</h2>
          <label>
            Full name
            <input name="name" defaultValue={user.name} required autoComplete="name" maxLength={80} pattern=".*\S.*" />
          </label>
          <label>
            Street address
            <input name="address" required autoComplete="street-address" maxLength={200} pattern=".*\S.*" />
          </label>
          <div className="form-row">
            <label>
              City
              <input name="city" required autoComplete="address-level2" maxLength={80} pattern=".*\S.*" />
            </label>
            <label>
              Country
              <input name="country" required autoComplete="country-name" maxLength={80} pattern=".*\S.*" />
            </label>
          </div>
          <div className="notice">
            <strong>Demo checkout</strong>
            <p>No payment is collected and no products will be shipped. Use a sample address.</p>
          </div>
          <button className="button" disabled={submitting}>
            {submitting ? 'Placing order…' : 'Place demo order'}
          </button>
        </form>
        <aside>
          <div className="checkout-items">
            {items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
                <strong>{money(item.price * item.quantity)}</strong>
              </p>
            ))}
          </div>
          <OrderSummary items={items} />
        </aside>
      </div>
    </section>
  );
}

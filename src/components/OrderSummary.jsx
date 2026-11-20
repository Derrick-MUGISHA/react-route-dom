import { money, totals } from '../store/shop';

// Both the cart and checkout use the same calculation and summary layout.
export default function OrderSummary({ items }) {
  const { subtotal, shipping, total } = totals(items);

  return (
    <div className="summary">
      <h2>Order summary</h2>
      <dl>
        <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{shipping ? money(shipping) : 'Free'}</dd></div>
        <div className="total"><dt>Total (USD)</dt><dd>{money(total)}</dd></div>
      </dl>
      <p>No additional taxes are calculated in this demo.</p>
    </div>
  );
}

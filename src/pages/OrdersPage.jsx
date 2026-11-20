import { Link, useLocation } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { useShop } from '../store/ShopContext';
import { money } from '../store/shop';

export default function OrdersPage() {
  const { orders, user } = useShop();
  const location = useLocation();

  // This is a demo display filter. A real server must check order ownership.
  const myOrders = orders.filter((order) => order.email === user.email);

  return (
    <section className="section-shell">
      <p className="eyebrow">Your account</p>
      <h1>Hello, {user.name}</h1>
      {location.state?.orderId && (
        <p className="notice" role="status">Your demo order has been placed. Thank you!</p>
      )}
      <h2 className="mb-6">Order history</h2>
      {myOrders.length === 0 ? (
        <EmptyState title="No orders yet">Your demo orders will appear here.</EmptyState>
      ) : (
        myOrders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="section-heading">
              <div>
                <h2>Order {order.id.slice(0, 8)}</h2>
                <p>{new Date(order.createdAt).toLocaleDateString()} · Demo order received</p>
              </div>
              <strong>{money(order.total)}</strong>
            </div>
            {order.items.map((item) => (
              <p key={item.id}>
                <Link to={`/products/${item.slug}`}>{item.name}</Link>
                {' × '}{item.quantity} — {money(item.price * item.quantity)}
              </p>
            ))}
            <p>Delivery: {money(order.shipping)}</p>
            <p>
              Deliver to: {order.delivery?.name}, {order.delivery?.address},
              {' '}{order.delivery?.city}, {order.delivery?.country}
            </p>
          </article>
        ))
      )}
    </section>
  );
}

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="empty-state">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>That page does not exist. Find something you love in the collection.</p>
      <Link to="/products" className="button">Browse products</Link>
    </section>
  );
}

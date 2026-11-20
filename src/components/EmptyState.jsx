import { Link } from 'react-router-dom';

// Reuse the same friendly message layout for an empty cart or missing product.
export default function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <h1>{title}</h1>
      <p>{children}</p>
      <Link className="button" to="/products">Browse products</Link>
    </div>
  );
}

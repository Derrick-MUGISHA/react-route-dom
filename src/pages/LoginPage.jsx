import { Navigate, useLocation } from 'react-router-dom';
import { useShop } from '../store/ShopContext';

export default function LoginPage() {
  const { user, dispatch } = useShop();
  const location = useLocation();
  const requestedPage = location.state?.from;
  let destination = '/orders';

  // Only return to a known protected page, never an arbitrary URL.
  if (typeof requestedPage === 'string') {
    const pathname = requestedPage.split('?')[0];
    if (pathname === '/checkout' || pathname === '/orders') {
      destination = requestedPage;
    }
  }

  function handleSubmit(event) {
    // Keep the browser from reloading the document after submitting the form.
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = {
      name: form.get('name').trim(),
      email: form.get('email').trim().toLowerCase(),
    };
    dispatch({ type: 'login', user });
  }

  // After login updates context, this page renders again and redirects.
  if (user) return <Navigate to={destination} replace />;

  return (
    <section className="form-shell">
      <p className="eyebrow">Welcome to MyStore</p>
      <h1>Make yourself at home.</h1>
      <p>This is a demo sign-in. Use any name and email to try checkout. No password or real account is created.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Your name
          <input name="name" autoComplete="name" required maxLength={80} pattern=".*\S.*" />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <button className="button">Continue with demo sign-in</button>
      </form>
      <p className="small-note">Demo profile and orders are stored in this browser. Use sample details.</p>
    </section>
  );
}

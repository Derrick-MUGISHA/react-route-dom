import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useShop } from '../store/ShopContext';

export default function Nav({ brand, links, cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useShop();

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogout() {
    dispatch({ type: 'logout' });
    closeMenu();
  }

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          {brand}<span> / everyday essentials</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={isOpen ? 'nav-links open' : 'nav-links'}
        >
          {links.map((link) => (
            <NavLink key={link.href} to={link.href} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/orders" onClick={closeMenu}>Orders</NavLink>
          {user ? (
            <button onClick={handleLogout}>Sign out</button>
          ) : (
            <NavLink to="/login" onClick={closeMenu}>Sign in</NavLink>
          )}
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Cart, ${cartCount} items`}>
          Bag <span>{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

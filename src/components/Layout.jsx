import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import { links } from '../data/navigation';
import { siteData } from '../data/site';
import { useShop } from '../store/ShopContext';

export default function Layout() {
  const { cartCount, storageError } = useShop();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav brand={siteData.brand} links={links} cartCount={cartCount} />
      {storageError && <p role="alert" className="notice">{storageError}</p>}
      <main id="main">
        {/* The router inserts the matched page here. */}
        <Outlet />
      </main>
      <Footer brand={siteData.brand} description={siteData.footerDescription} links={links} />
    </>
  );
}

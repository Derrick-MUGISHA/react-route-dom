
import Nav from "./Nav";
import Footer from "./Footer";

import { links } from "../data/navigation";
import { siteData } from "../data/site";

export default function Layout({ children, cartCount }) {
  return (
    <>
      <Nav
        brand={siteData.brand}
        links={links}
        cartCount={cartCount}
      />

      <main>
        {children}
      </main>

      <Footer
        brand={siteData.brand}
        description={siteData.footerDescription}
        links={links}
      />
    </>
  );
}

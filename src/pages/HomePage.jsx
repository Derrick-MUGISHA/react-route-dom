import Hero from '../components/Hero';
import About from '../components/About';
import { ProductList } from '../components/Product';
import { heroData } from '../data/hero';
import { products } from '../data/products';
import { siteData } from '../data/site';

export default function HomePage() {
  // Layout is supplied by the parent route; this component only builds the page.
  return (
    <>
      <Hero {...heroData} featuredProduct={products[0]} />
      <div className="benefits">
        <span>Free delivery on orders $200+</span>
        <span>Carefully selected essentials</span>
        <span>Demo store · no real payments</span>
      </div>
      <ProductList products={products} />
      <About title={siteData.aboutTitle} description={siteData.aboutDescription} />
    </>
  );
}

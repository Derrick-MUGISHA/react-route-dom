
import { useState } from "react";

// Components
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import { ProductList } from "../components/Product";


// Data
import { heroData } from "../data/hero";
import { products } from "../data/products";
import { siteData } from "../data/site";




export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount((prev) => prev + 1);
  }

  return (
    <Layout cartCount={cartCount}>
      {/* Hero Section */}
      <Hero {...heroData} featuredProduct={products[0]} />

      {/* Products Section */}
      <ProductList
        products={products}
        onAddToCart={addToCart}
      />

      {/* About Section */}
      <About
        title={siteData.aboutTitle}
        description={siteData.aboutDescription}
      />

    </Layout>
  );
}

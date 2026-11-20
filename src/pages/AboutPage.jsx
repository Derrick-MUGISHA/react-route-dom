import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <section className="section-shell prose-page">
      <p className="eyebrow">Our story</p>
      <h1>Better essentials. Simpler shopping.</h1>
      <p>
        MyStore brings together useful technology for everyday life. Our collection
        focuses on a few practical essentials: a watch to keep you moving,
        headphones for your favorite music, and a phone to stay connected.
      </p>
      <h2>Built for learning</h2>
      <p>
        This storefront is a React learning project. Explore the collection, add
        products to your bag, and use demo sign-in to try a complete checkout flow.
        Orders stay in your browser and do not create purchases or shipments.
      </p>
      <Link to="/products" className="button">Explore the collection</Link>
    </section>
  );
}

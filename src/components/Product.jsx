
function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

export default function Product({
  name,
  price,
  description,
  image,
  onAddToCart,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      
      <img
        src={image}
        alt={name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">
          {name}
        </h2>

        <p className="text-gray-600 mb-3">
          {description}
        </p>

        <p className="text-orange-600 font-bold text-xl mb-4">
          ${price}
        </p>

        <button
          onClick={onAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
          <CartIcon />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export function ProductList({ products, onAddToCart }) {
  return (
    <section id="products" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((product) => (
            <Product
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

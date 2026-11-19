
import useAutoSlide from "../hook/useAutoSlide";

export default function Hero({ title, description, images, featuredProduct }) {
  const [currentImage, setCurrentImage] = useAutoSlide(images.length, 5000);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gray-950"
    >
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${image}")` }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-10">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
              Curated for your everyday
            </p>
            <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              {title}
            </h1>

            <p className="mb-9 max-w-xl text-lg leading-8 text-gray-200 md:text-xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="rounded-full bg-orange-500 px-8 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-400"
              >
                Shop the collection
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/50 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Our story
              </a>
            </div>
          </div>

          {featuredProduct && (
            <div className="rounded-3xl bg-white/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="h-80 w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  Best seller
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 p-4 pb-2">
                <div>
                  <p className="mb-1 text-sm font-medium text-orange-600">
                    Featured pick
                  </p>
                  <h2 className="text-2xl font-bold text-gray-950">
                    {featuredProduct.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {featuredProduct.description}
                  </p>
                </div>
                <p className="text-2xl font-black text-gray-950">
                  ${featuredProduct.price}
                </p>
              </div>
              <a
                href="#products"
                className="mt-4 block rounded-xl bg-gray-950 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
              >
                View product
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={currentImage === index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full transition-all ${
              currentImage === index
                ? "w-10 bg-orange-400"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

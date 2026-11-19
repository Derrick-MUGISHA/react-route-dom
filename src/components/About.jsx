export default function About({ title, description }) {
  return (
    <section id="about" className="py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </section>
  );
}

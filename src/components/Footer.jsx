
function ContactIcon({ type }) {
  const path =
    type === "mail"
      ? "M3 5h18v14H3z M3 6l9 7 9-7"
      : "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 10a2 2 0 1 0 0 .01";

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default function Footer({ brand, description, links }) {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            {brand}
          </h2>

          <p className="text-gray-400">
            {description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-orange-500 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Contact
          </h3>

          <p className="flex items-center gap-2 mb-3">
            <ContactIcon type="mail" />
            info@example.com
          </p>

          <p className="flex items-center gap-2">
            <ContactIcon type="location" />
            Kigali, Rwanda
          </p>
        </div>
      </div>

      <div className="text-center text-gray-400 border-t border-gray-700 mt-10 pt-5">
        © {new Date().getFullYear()} {brand}. All rights reserved.
      </div>
    </footer>
  );
}

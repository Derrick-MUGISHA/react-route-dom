
// import { Tornado } from "lucide-react";
import { useState } from "react";

function Icon({ children, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MenuIcon({ size }) {
  return (
    <Icon size={size}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Icon>
  );
}

function CloseIcon({ size }) {
  return (
    <Icon size={size}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  );
}

function CartIcon({ size }) {
  return (
    <Icon size={size}>
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </Icon>
  );
}

export default function Nav({ brand, links, cartCount }) {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <a href="#home" className="text-2xl font-bold text-orange-600">
          {brand}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-orange-600 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <CartIcon size={22} />
            <span>{cartCount}</span>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-4 border-t">
          {/* <Tornado /> */}
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

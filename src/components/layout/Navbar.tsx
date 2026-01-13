import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container.tsx";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Over MOZa", href: "/over-MOZa" },
  { label: "Actueel", href: "/actueel" },
  { label: "Onderwerpen", href: "/onderwerpen" },
  { label: "Contact", href: "/contact" },
  { label: "Zoeken", href: "/zoeken" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary flex min-h-[64px] w-full items-center text-white">
      <Container>
        <div className="px-4">
          <div className="flex items-center">
            <span className="mt-4 mb-4 text-xl hover:underline">
              <Link to="/">Home</Link>
            </span>

            {/* Hamburger button - visible on xs and sm screens */}
            <button
              aria-expanded={isMenuOpen}
              className="ml-auto md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop menu - internal left, external right */}
            <div className="hidden md:flex md:flex-1 md:items-center md:pl-6">
              <ul className="flex w-full text-xl">
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item.label}
                    className="mr-6 whitespace-nowrap hover:underline"
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile menu - visible when hamburger is clicked */}
          {isMenuOpen && (
            <div className="pb-4 md:hidden md:border-none">
              <ul className="flex flex-col text-xl">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="block py-2 hover:underline focus:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "This Year", href: "#events-this-year" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { login, clear, identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "events",
      "events-this-year",
      "team",
      "contact",
    ];
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #2a2a1a" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
      data-ocid="nav.panel"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* Logo + Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "2px solid #c9a227",
              background: "#141414",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/sportscom_logo-019d5f20-0759-7368-aba5-2c7ac95bff12.png"
              alt="Sportscom XLRI Delhi Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              color: "#e8c84a",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Sportscom XLRI Delhi
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                data-ocid={`nav.${sectionId}.link`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "#e8c84a" : "#b5b5b5",
                  transition: "color 0.2s",
                  padding: "0.25rem 0",
                  borderBottom: isActive
                    ? "1.5px solid #c9a227"
                    : "1.5px solid transparent",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: Auth only */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          className="hidden md:flex"
        >
          {isAuthenticated ? (
            <button
              type="button"
              onClick={clear}
              data-ocid="nav.logout.button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#888",
                textTransform: "uppercase",
              }}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={login}
              data-ocid="nav.login.button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#888",
                textTransform: "uppercase",
              }}
            >
              Admin Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          data-ocid="nav.hamburger.button"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#e8c84a",
            padding: "0.5rem",
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            background: "#0a0a0a",
            borderTop: "1px solid #2a2a1a",
            padding: "1rem 1.5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#b5b5b5",
                  textAlign: "left",
                  padding: "0.25rem 0",
                }}
              >
                {link.label}
              </button>
            ))}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                paddingTop: "0.5rem",
                borderTop: "1px solid #1a1a1a",
              }}
            >
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={clear}
                  data-ocid="nav.mobile.logout.button"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={login}
                  data-ocid="nav.mobile.login.button"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

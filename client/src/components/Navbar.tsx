// Ecyce Portfolio — Navbar
// Style: Dark Craft — transparent nav with green underline hover, sticky with blur on scroll
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 250ms ease, border-color 250ms ease",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* E lettermark — editorial cut-point motif */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {/* Vertical spine */}
            <rect x="4" y="3" width="3" height="16" fill="#0a0a0a"/>
            {/* Top bar — full width */}
            <rect x="4" y="3" width="14" height="3" fill="#0a0a0a"/>
            {/* Mid bar — shorter (cut point) */}
            <rect x="4" y="9.5" width="9" height="3" fill="#0a0a0a"/>
            {/* Bottom bar — full width */}
            <rect x="4" y="16" width="14" height="3" fill="#0a0a0a"/>
          </svg>
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "0.04em",
            color: "#f0f0f0",
          }}
        >
          ECYCE
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {navLinks.map(({ href, label }) => {
          const isActive = href === "/" ? location === "/" : location.startsWith(href);
          return (
            <Link key={href} href={href}>
              <span
                className={`nav-link${isActive ? " active" : ""}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
        <div
          role="group"
          aria-label="Language selection"
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 999,
            padding: 3,
            marginLeft: "0.25rem",
          }}
        >
          {(["ko", "en"] as const).map((option) => {
            const isSelected = language === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={isSelected}
                style={{
                  border: 0,
                  borderRadius: 999,
                  background: isSelected ? "#22c55e" : "transparent",
                  color: isSelected ? "#0a0a0a" : "rgba(240,240,240,0.55)",
                  cursor: isSelected ? "default" : "pointer",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "0.4rem 0.55rem",
                  transition: "background 150ms, color 150ms",
                }}
              >
                {option === "ko" ? "KOR" : "ENG"}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

// Ecyce Portfolio — Home Page
// Style: Dark Craft — mosaic hero + selected work preview + footer
import { useState } from "react";
import Navbar from "@/components/Navbar";
import MosaicHero from "@/components/MosaicHero";
import { projects } from "@/lib/projects";
import { Link } from "wouter";
import { Play, ArrowRight } from "lucide-react";

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/work/${project.slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        <div style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "#111",
          overflow: "hidden",
        }}>
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 350ms cubic-bezier(0.23,1,0.32,1)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: hovered ? "rgba(10,10,10,0.6)" : "rgba(10,10,10,0)",
            transition: "background 250ms cubic-bezier(0.23,1,0.32,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0.8)",
              transition: "opacity 250ms, transform 250ms cubic-bezier(0.23,1,0.32,1)",
              background: "rgba(34,197,94,0.12)",
              border: "2px solid #22c55e",
              borderRadius: "50%",
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Play size={20} color="#22c55e" fill="#22c55e" style={{ marginLeft: 3 }} />
            </div>
          </div>
        </div>
        <div style={{ padding: "0.7rem 0 0" }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.12em",
            color: "#22c55e",
            textTransform: "uppercase",
            marginBottom: "0.3rem",
          }}>
            {project.category} // {project.year}
          </p>
          <h4 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: hovered ? "#22c55e" : "#f0f0f0",
            margin: 0,
            lineHeight: 1.3,
            transition: "color 200ms",
          }}>
            {project.title.toUpperCase()}
          </h4>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured).slice(0, 3);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <MosaicHero />

      {/* Selected Work section */}
      <section style={{ padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}>
            <div>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "#22c55e",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}>Work</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#f0f0f0",
                margin: 0,
              }}>
                Recent Projects
              </h2>
            </div>
            <Link href="/work">
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#22c55e",
                textDecoration: "none",
                transition: "gap 150ms",
              }}>
                View All <ArrowRight size={14} />
              </span>
            </Link>
          </div>

          {/* Featured 3-col grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}>
            {featured.map(p => <FeaturedCard key={p.slug} project={p} />)}
          </div>

          {/* Secondary row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}>
            {rest.map(p => <FeaturedCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "5rem 2rem",
        background: "#0d0d0d",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: "#22c55e", textTransform: "uppercase", marginBottom: "1rem" }}>About</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "#f0f0f0",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}>
              Every frame is a choice.<br />
              <span style={{ color: "#22c55e" }}>I make them count.</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(240,240,240,0.6)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}>
              I'm Ecyce — a video editor who works in rhythm, pacing, and story. Every cut is deliberate, every transition earned.
            </p>
            <Link href="/about">
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                background: "#22c55e",
                padding: "0.8rem 1.75rem",
                textDecoration: "none",
                transition: "background 150ms",
                cursor: "pointer",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#16a34a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#22c55e")}
              >
                Learn More <ArrowRight size={13} />
              </span>
            </Link>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}>
            {[
              { num: "50+", label: "Projects Completed" },
              { num: "4+", label: "Years Experience" },
              { num: "20+", label: "Happy Clients" },
              { num: "∞", label: "Frames Crafted" },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: "1.5rem",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "#111",
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#22c55e",
                  margin: "0 0 0.25rem",
                  lineHeight: 1,
                }}>{stat.num}</p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(240,240,240,0.45)",
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "rgba(240,240,240,0.3)", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} ECYCE. ALL RIGHTS RESERVED.
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Instagram", "YouTube", "LinkedIn"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(240,240,240,0.35)", textDecoration: "none", textTransform: "uppercase", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.35)")}
            >{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

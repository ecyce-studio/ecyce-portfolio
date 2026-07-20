// Ecyce Portfolio — About Page
// Style: Dark Craft — asymmetric layout, green accent details, geometric band accents
import Navbar from "@/components/Navbar";
import { Link } from "wouter";

const skills = [
  { category: "Editing", items: ["Adobe Premiere Pro", "DaVinci Resolve", "Final Cut Pro"] },
  { category: "Motion", items: ["After Effects", "Cinema 4D", "Motion"] },
  { category: "Color", items: ["DaVinci Resolve", "Lightroom", "Lumetri Color"] },
  { category: "Audio", items: ["Adobe Audition", "Logic Pro", "Fairlight"] },
];

// Small geometric accent SVG for section dividers
function GeoBand() {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: "3rem", overflow: "hidden" }}>
      {["#22c55e","#0d2010","#111","#1a1a1a","#22c55e","#0a0a0a","#0d2010","#1a1a1a"].map((bg, i) => (
        <div key={i} style={{ flex: 1, height: 6, background: bg }} />
      ))}
    </div>
  );
}

export default function About() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Geometric header band */}
      <div style={{ paddingTop: "80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          height: 80,
        }}>
          {[
            { bg: "#0a0a0a" }, { bg: "#111" }, { bg: "#22c55e" }, { bg: "#0d2010" },
            { bg: "#111" }, { bg: "#0a0a0a" }, { bg: "#1a1a1a" }, { bg: "#22c55e" },
          ].map((t, i) => (
            <div key={i} style={{ background: t.bg }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "#22c55e",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            About
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "#f0f0f0",
            lineHeight: 1.05,
            margin: 0,
          }}>
            Every frame<br />
            is a choice.<br />
            <span style={{ color: "#22c55e" }}>I make them count.</span>
          </h1>
        </div>

        <GeoBand />

        {/* Bio + Skills grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Bio */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(240,240,240,0.8)",
              marginBottom: "1.5rem",
            }}>
              I'm Ecyce, a video editor who works in rhythm, pacing, and story. Every cut is deliberate — a decision that shapes how a sequence breathes, where tension builds, and when emotion lands.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(240,240,240,0.8)",
              marginBottom: "1.5rem",
            }}>
              With experience across commercial, documentary, music video, and YouTube content, I bring a precise eye and a deep respect for the edit. Great editing is invisible — it pulls you into the story without you noticing the craft.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(240,240,240,0.8)",
            }}>
              Based in Seoul. Available worldwide.
            </p>

            <div style={{ marginTop: "2.5rem" }}>
              <Link href="/contact">
                <span style={{
                  display: "inline-block",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#0a0a0a",
                  background: "#22c55e",
                  padding: "0.85rem 2rem",
                  textDecoration: "none",
                  transition: "background 150ms",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#16a34a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#22c55e")}
                >
                  Start a Project →
                </span>
              </Link>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "#22c55e",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              Tools & Skills
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {skills.map(group => (
                <div key={group.category}>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(240,240,240,0.35)",
                    marginBottom: "0.75rem",
                  }}>
                    {group.category}
                  </p>
                  {group.items.map(item => (
                    <p key={item} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "#f0f0f0",
                      marginBottom: "0.4rem",
                      paddingLeft: "0.75rem",
                      borderLeft: "2px solid #22c55e",
                    }}>
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


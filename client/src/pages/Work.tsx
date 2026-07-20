// Ecyce Portfolio — Work Page
// Style: Dark Craft — peterapple.com inspired client sections + 3-col thumbnail grid
// Layout: Large italic client name header, 3-column video grid, hover overlay with play icon
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { clientGroups } from "@/lib/projects";
import { Link } from "wouter";
import { Play } from "lucide-react";

function ProjectCard({ project }: { project: { slug: string; title: string; category: string; year: string; thumbnail: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/work/${project.slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "block", cursor: "pointer" }}
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
          {/* Dark overlay */}
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
              background: "rgba(34,197,94,0.15)",
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
        <div style={{ padding: "0.65rem 0 0" }}>
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
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: hovered ? "#22c55e" : "#f0f0f0",
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: "0.02em",
            transition: "color 200ms",
          }}>
            {project.title.toUpperCase()}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Page header */}
      <div style={{
        paddingTop: "120px",
        paddingBottom: "2.5rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        maxWidth: 1200,
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          color: "#22c55e",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          Portfolio
        </p>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#f0f0f0",
          margin: 0,
          lineHeight: 1.1,
        }}>
          Video Editing Work
        </h1>
      </div>

      {/* Thin separator */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", maxWidth: 1200, margin: "0 auto 0", marginLeft: "2rem", marginRight: "2rem" }} />

      {/* Client groups */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 6rem" }}>
        {clientGroups.map((group, gi) => (
          <div key={group.name} style={{ paddingTop: "4rem", paddingBottom: "1rem" }}>
            {/* Separator between groups */}
            {gi > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "4rem" }} />}

            {/* Client name — large italic like peterapple.com */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#f0f0f0",
              marginBottom: "2rem",
              letterSpacing: "0.01em",
            }}>
              {group.name.toUpperCase()}
            </h2>

            {/* 3-column grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
            }}>
              {group.projects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>

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

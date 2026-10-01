// Ecyce Portfolio — Work Page
// Style: Dark Craft — peterapple.com inspired client sections + 3-col thumbnail grid
// Layout: Large italic client name header, 3-column video grid, hover overlay with play icon
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard, { UpcomingCard } from "@/components/ProjectCard";
import { getLocalizedSections, showUpcomingSlots, upcomingSlots } from "@/lib/projects";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Work() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const sections = getLocalizedSections(language);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Page header */}
      <div className="page-pad" style={{
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
          AI Video Ad Work
        </h1>
      </div>

      {/* Thin separator */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", maxWidth: 1200, margin: "0 auto 0", marginLeft: "2rem", marginRight: "2rem" }} />

      {/* Client groups */}
      <div className="page-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 6rem" }}>
        {sections.map((group, gi) => (
          <div key={group.key} style={{ paddingTop: "4rem", paddingBottom: "1rem" }}>
            {/* Separator between groups */}
            {gi > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "4rem" }} />}

            {/* Client name — large italic like peterapple.com */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#f0f0f0",
              marginBottom: group.note ? "0.75rem" : "2rem",
              letterSpacing: "0.01em",
            }}>
              {group.name.toUpperCase()}
            </h2>
            {group.note && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(240,240,240,0.45)",
                marginBottom: "2rem",
              }}>
                {group.note}
              </p>
            )}

            {/* 3-column grid */}
            <div className="grid-3" style={{ gap: "1.25rem" }}>
              {group.projects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
              {showUpcomingSlots && group.key === "commercial" && upcomingSlots.map(slot => (
                <UpcomingCard key={slot.key} slot={slot} language={language} />
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
          {[
            { label: "Instagram", href: "https://www.instagram.com/ecyce.studio/" },
            { label: "YouTube", href: "https://www.youtube.com/@ecyce.studio" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(240,240,240,0.35)", textDecoration: "none", textTransform: "uppercase", transition: "color 150ms" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.35)")}
            >{s.label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
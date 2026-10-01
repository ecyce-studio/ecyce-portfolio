// Ecyce Portfolio — Project Detail Page
// Style: Dark Craft — left video embed, right project info
import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { WorkTypeBadge } from "@/components/ProjectCard";
import { formatDuration, getLocalizedProjectBySlug, getLocalizedProjects } from "@/lib/projects";
import { ArrowLeft, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const project = getLocalizedProjectBySlug(params.slug, language);
  const localizedProjects = getLocalizedProjects(language);
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [params.slug]);

  if (!project) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Navbar />
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#22c55e", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em" }}>404</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0f0f0", fontSize: "2rem", marginTop: "1rem" }}>{language === "en" ? "Project not found" : "프로젝트를 찾을 수 없습니다"}</h1>
          <Link href="/work">
            <span style={{ color: "#22c55e", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Back to Work</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related projects (same section, different slug) — full list, paged
  const related = localizedProjects.filter(p => p.section === project.section && p.slug !== project.slug);
  const isPortrait = project.format === "9:16";
  const metaItems = [
    { label: "Format", value: project.format },
    { label: "Length", value: formatDuration(project.duration) },
    { label: "Platform", value: project.platforms.join(" · ") },
  ];
  const briefItems = project.brief
    ? [
        { label: "Hook", value: project.brief.hook },
        { label: "Target audience", value: project.brief.audience },
        { label: "Goal", value: project.brief.goal },
      ]
    : [];
  const itemsPerPage = 3;
  const totalPages = Math.ceil(related.length / itemsPerPage);
  const paged = related.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  const goPrev = () => setPage(p => Math.max(0, p - 1));
  const goNext = () => setPage(p => Math.min(totalPages - 1, p + 1));

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      <div className="page-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 2rem 6rem" }}>
        {/* Back link */}
        <Link href="/work">
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,240,240,0.5)",
            textDecoration: "none",
            marginBottom: "2.5rem",
            transition: "color 150ms",
            cursor: "pointer",
          }}
                onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,240,240,0.5)")}
          >
            <ArrowLeft size={14} />
            Back to Work
          </span>
        </Link>

        {/* Main content: video + info */}
        <div className="detail-grid" style={{
          gap: "3rem",
          alignItems: "start",
        }}>
          {/* Left: Video embed */}
          <div>
            <div style={{
              position: "relative",
              aspectRatio: isPortrait ? "9/16" : "16/9",
              width: "100%",
              maxWidth: isPortrait ? 400 : undefined,
              margin: isPortrait ? "0 auto" : undefined,
              background: "#111",
              overflow: "hidden",
            }}>
              {project.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    border: "none",
                  }}
                />
              ) : (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#111",
                }}>
                  <img src={project.thumbnail} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play size={60} color="#22c55e" fill="#22c55e" />
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.25rem" }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#22c55e",
                  border: "1px solid rgba(34,197,94,0.35)",
                  padding: "0.3rem 0.7rem",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Blog-style content */}
            {project.content && project.content.length > 0 && (
              <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {project.content.map((block, i) => {
                  if (block.type === "heading") {
                    return (
                      <h3 key={i} style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#f0f0f0",
                        lineHeight: 1.3,
                        margin: 0,
                        textAlign: "center",
                      }}>
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "text") {
                    return (
                      <p key={i} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.95rem",
                        color: "rgba(240,240,240,0.8)",
                        lineHeight: 1.8,
                        textAlign: "center",
                      }}>
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "image") {
                    return (
                      <figure key={i} style={{ margin: 0 }}>
                        <img
                          src={block.src}
                          alt={block.caption ?? ""}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "320px",
                            display: "block",
                            objectFit: "contain",
                          }}
                        />
                        {block.caption && (
                          <figcaption style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "0.65rem",
                            letterSpacing: "0.05em",
                            color: "rgba(240,240,240,0.4)",
                            marginTop: "0.6rem",
                            textAlign: "center",
                          }}>
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>
            )}

          </div>

          {/* Right: Project info */}
          <div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "#22c55e",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              {project.category} // {project.year}
            </p>
            <div style={{ marginBottom: "0.9rem" }}>
              <WorkTypeBadge project={project} />
            </div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 700,
              color: "#f0f0f0",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}>
              {project.title}
            </h1>

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "1.5rem" }} />

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Client</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#f0f0f0" }}>{project.client}</p>
              {project.brandDisclaimer && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(240,240,240,0.5)", lineHeight: 1.6, marginTop: "0.5rem" }}>
                  {language === "en"
                    ? "Independent work made for a public contest — not commissioned by or affiliated with the brand."
                    : "브랜드로부터 의뢰받은 작업이 아닌, 공모전 출품을 위해 제작한 개인 작업입니다."}
                </p>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
              {metaItems.map(item => (
                <div key={item.label}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.label}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#f0f0f0" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Role</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#f0f0f0" }}>{project.role}</p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Tools</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#f0f0f0" }}>{project.tools.join(", ")}</p>
            </div>

            {project.aiTools && project.aiTools.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.4rem" }}>AI Tools</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#f0f0f0" }}>{project.aiTools.join(", ")}</p>
              </div>
            )}


            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "1.5rem" }} />

            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.75rem" }}>About</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(240,240,240,0.8)", lineHeight: 1.7 }}>{project.description}</p>
            </div>

            {briefItems.length > 0 && (
              <div style={{ marginTop: "1.75rem", padding: "1.25rem", border: "1px solid rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.04)" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "#22c55e", textTransform: "uppercase", marginBottom: "1rem" }}>Ad Brief</p>
                {briefItems.map(item => (
                  <div key={item.label} style={{ marginBottom: "0.85rem" }}>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.4)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{item.label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#f0f0f0", lineHeight: 1.55 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div style={{ marginTop: "5rem" }}>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: "3rem" }} />

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(240,240,240,0.5)",
                margin: 0,
              }}>
                More {project.section === "commercial" ? "Commercials" : project.section === "fan" ? "Fan Work" : "Films"}
              </h2>

              {totalPages > 1 && (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={goPrev}
                    disabled={page === 0}
                    style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: page === 0 ? "rgba(240,240,240,0.2)" : "#f0f0f0",
                      cursor: page === 0 ? "default" : "pointer",
                      transition: "border-color 150ms, color 150ms",
                    }}
                    onMouseEnter={e => { if (page !== 0) { e.currentTarget.style.borderColor = "#22c55e"; e.currentTarget.style.color = "#22c55e"; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = page === 0 ? "rgba(240,240,240,0.2)" : "#f0f0f0"; }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={page >= totalPages - 1}
                    style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: page >= totalPages - 1 ? "rgba(240,240,240,0.2)" : "#f0f0f0",
                      cursor: page >= totalPages - 1 ? "default" : "pointer",
                      transition: "border-color 150ms, color 150ms",
                    }}
                    onMouseEnter={e => { if (page < totalPages - 1) { e.currentTarget.style.borderColor = "#22c55e"; e.currentTarget.style.color = "#22c55e"; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = page >= totalPages - 1 ? "rgba(240,240,240,0.2)" : "#f0f0f0"; }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid-3" style={{ gap: "1rem" }}>
              {paged.map(p => (
                <Link key={p.slug} href={`/work/${p.slug}`}>
                  <div>
                    <div className="project-thumb" style={{ aspectRatio: "16/9", background: "#111" }}>
                      <img src={p.thumbnail} alt={p.title} loading="lazy" />
                      <div className="overlay">
                        <div className="overlay-icon"><Play size={28} color="#22c55e" fill="#22c55e" /></div>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#f0f0f0", marginTop: "0.5rem" }}>{p.title.toUpperCase()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
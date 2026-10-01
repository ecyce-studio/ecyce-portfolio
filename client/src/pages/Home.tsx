// Ecyce Portfolio — Home Page
// Style: Dark Craft — mosaic hero + selected work preview + footer
import Navbar from "@/components/Navbar";
import MosaicHero from "@/components/MosaicHero";
import ProjectCard from "@/components/ProjectCard";
import { getLocalizedProjects, type WorkSection } from "@/lib/projects";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 광고 → 필름 순으로 노출, 팬 작업은 홈에서 제외
const homeSectionOrder: WorkSection[] = ["commercial", "film"];

export default function Home() {
  const { language } = useLanguage();
  const localizedProjects = getLocalizedProjects(language);
  const displayed = homeSectionOrder
    .flatMap(section => localizedProjects.filter(p => p.section === section))
    .slice(0, 6);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />
      <MosaicHero />

      {/* Selected Work section */}
      <section className="page-pad" style={{ padding: "5rem 2rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
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

          {/* 단일 그리드로 통합 — 3열 x 2줄 자동 정렬 */}
          <div className="grid-3" style={{ gap: "1.25rem" }}>
            {displayed.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="page-pad" style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "5rem 2rem",
        background: "#0d0d0d",
      }}>
        <div className="grid-2" style={{ maxWidth: 1200, margin: "0 auto", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: "#22c55e", textTransform: "uppercase", marginBottom: "1rem" }}>About</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "#f0f0f0",
              lineHeight: 1.4,
              marginBottom: "1.25rem",
            }}>
              {language === "en" ? (
                <>
                  From boundless imagination <br />
                  <span style={{ color: "#22c55e" }}>to moving images.</span>
                </>
              ) : (
                <>
                  무한한 상상으로부터 <br />
                  <span style={{ color: "#22c55e" }}>영상을 그려냅니다.</span>
                </>
              )}
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(240,240,240,0.6)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}>
              {language === "en"
                ? "I’m Ecyce — a former game developer turned AI video ad creator. I run every project through a structured production pipeline, from planning and character sheets to AI generation and final edit, so brands get consistent, on-brief ads with a playful, trend-aware edge."
                : "저는 Ecyce입니다. — 게임 개발자 출신의 AI 광고 영상 크리에이터입니다. 기획부터 캐릭터 시트, AI 생성, 최종 편집까지 체계적인 제작 프로세스로 진행해, 브리프에 맞는 일관된 광고 영상을 유쾌하고 트렌디한 감각으로 완성합니다."}
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
          {/*<div style={{*/}
          {/*  display: "grid",*/}
          {/*  gridTemplateColumns: "1fr 1fr",*/}
          {/*  gap: "1rem",*/}
          {/*}}>*/}
          {/*  {[*/}
          {/*    { num: "50+", label: "Projects Completed" },*/}
          {/*    { num: "4+", label: "Years Experience" },*/}
          {/*    { num: "20+", label: "Happy Clients" },*/}
          {/*    { num: "∞", label: "Frames Crafted" },*/}
          {/*  ].map(stat => (*/}
          {/*    <div key={stat.label} style={{*/}
          {/*      padding: "1.5rem",*/}
          {/*      border: "1px solid rgba(255,255,255,0.07)",*/}
          {/*      background: "#111",*/}
          {/*    }}>*/}
          {/*      <p style={{*/}
          {/*        fontFamily: "'Space Grotesk', sans-serif",*/}
          {/*        fontSize: "2rem",*/}
          {/*        fontWeight: 700,*/}
          {/*        color: "#22c55e",*/}
          {/*        margin: "0 0 0.25rem",*/}
          {/*        lineHeight: 1,*/}
          {/*      }}>{stat.num}</p>*/}
          {/*      <p style={{*/}
          {/*        fontFamily: "'DM Sans', sans-serif",*/}
          {/*        fontSize: "0.8rem",*/}
          {/*        color: "rgba(240,240,240,0.45)",*/}
          {/*      }}>{stat.label}</p>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
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

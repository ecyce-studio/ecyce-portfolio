// Ecyce Portfolio — About Page
// Style: Dark Craft — asymmetric layout, green accent details, geometric band accents
import Navbar from "@/components/Navbar";
import { Link } from "wouter";

const skills = [
  { category: "Editing", items: ["Adobe Premiere Pro", "After Effects", "Capcut"] },
  { category: "AI Tools", items: ["Google Flow", "MidJourney", "Higgsfield"] },
  { category: "Image", items: ["Adobe Photoshop", "Procreate", "Clip Studio"] },
  { category: "PM", items: ["Notion", "Figma", "Jira"] },
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
            무한한 상상으로부터<br />
            <span style={{ color: "#22c55e" }}> 영상을 그려냅니다.<br /></span>
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
              저는 Ecyce - 박자감과 이야기를 중심으로 영상을 만드는 AI Creator입니다.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(240,240,240,0.8)",
              marginBottom: "1.5rem",
            }}>
              영상을 제작할 때엔 저만의 유쾌하고 트렌디한 감각을 담아 만듭니다.
              학창 시절부터 핀터레스트를 탐색하며 트렌드를 쫓고, 코미디를 즐겨 보는 것이 취미였습니다.
              그렇게 쌓인 취향은 지금 제가 만드는 영상 곳곳에 저만의 포인트로
              녹아 있습니다.
              <br /><br />
              상상을 현실로 옮기는 일을 체계화된 방식으로 진행합니다. 게임 개발자로 일하던 시절부터
              Notion, Figjam 등으로 콘텐츠를 계획적으로 설계해 제작해왔고,
              이 습관은 지금도 이어져 영상 프로젝트를 더 정확하고 수월하게
              완성하는 힘이 되고 있습니다.
              <br /><br />
              또한 인디 게임 사업에 도전하며 익힌 마케팅과 사업 지식은, 영상을
              만들기 전 타겟층을 명확히 하는 눈으로 이어졌습니다. 누가 볼지를
              먼저 그리고 나서 영상을 제작해, 보는 사람의 흥미를 파고들 수 있도록 노력하고 있습니다.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(240,240,240,0.8)",
            }}>
              함께 이야기를 만들어 갈 파트너를 찾고 있습니다. <br/><br/>
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#22c55e",
            }}>
              [Contact] <b>ecyce.studio@gmail.com</b>
            </p>

            {/*<div style={{ marginTop: "2.5rem" }}>*/}
            {/*  <Link href="/contact">*/}
            {/*    <span style={{*/}
            {/*      display: "inline-block",*/}
            {/*      fontFamily: "'Space Grotesk', sans-serif",*/}
            {/*      fontSize: "0.75rem",*/}
            {/*      fontWeight: 700,*/}
            {/*      letterSpacing: "0.14em",*/}
            {/*      textTransform: "uppercase",*/}
            {/*      color: "#0a0a0a",*/}
            {/*      background: "#22c55e",*/}
            {/*      padding: "0.85rem 2rem",*/}
            {/*      textDecoration: "none",*/}
            {/*      transition: "background 150ms",*/}
            {/*      cursor: "pointer",*/}
            {/*    }}*/}
            {/*    onMouseEnter={e => (e.currentTarget.style.background = "#16a34a")}*/}
            {/*    onMouseLeave={e => (e.currentTarget.style.background = "#22c55e")}*/}
            {/*    >*/}
            {/*      Start a Project →*/}
            {/*    </span>*/}
            {/*  </Link>*/}
            {/*</div>*/}
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

            {/* Game Dev Portfolio link */}
            <div style={{ marginTop: "3rem" }}>
              <a
                href="https://drive.google.com/file/d/100uVBvxhgSYgfSnQv7UJv9P-0Ya9H_CI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#22c55e",
                  background: "transparent",
                  border: "1px solid #22c55e",
                  padding: "0.75rem 1.5rem",
                  textDecoration: "none",
                  transition: "background 150ms, color 150ms",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#22c55e";
                  e.currentTarget.style.color = "#0a0a0a";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#22c55e";
                }}
              >
                Pre) Game Developer Portfolio →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Ecyce Portfolio — shared project card for Home / Work grids
import { useState } from "react";
import { Link } from "wouter";
import { Play } from "lucide-react";
import { formatDuration, workTypeLabels, type Project, type UpcomingSlot } from "@/lib/projects";
import type { Language } from "@/contexts/LanguageContext";

const metaStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.58rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

// 실제 의뢰 작업만 꽉 찬 초록 배지, 나머지는 테두리형으로 한 단계 낮춤
// 썸네일 위에서도 읽히도록 테두리형은 어두운 반투명 바탕을 깔아둠
function badgeColors(workType: Project["workType"]) {
  if (workType === "client") {
    return { color: "#0a0a0a", background: "#22c55e", border: "1px solid #22c55e" };
  }
  const accent = workType === "fan" ? "rgba(240,240,240,0.6)" : "#22c55e";
  return {
    color: accent,
    background: "rgba(10,10,10,0.75)",
    border: `1px solid ${workType === "fan" ? "rgba(240,240,240,0.35)" : "rgba(34,197,94,0.5)"}`,
  };
}

export function WorkTypeBadge({ project }: { project: Project }) {
  return (
    <span style={{
      ...metaStyle,
      ...badgeColors(project.workType),
      fontSize: "0.55rem",
      padding: "0.25rem 0.5rem",
      fontWeight: 700,
    }}>
      {workTypeLabels[project.workType]}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const isPortrait = project.format === "9:16";

  return (
    <Link href={`/work/${project.slug}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "block", cursor: "pointer" }}
      >
        <div style={{
          position: "relative",
          aspectRatio: "16/9", // 카드 비율은 항상 통일
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
              // 세로 영상은 레터박스(contain), 가로 영상은 꽉 채움(cover)
              objectFit: isPortrait ? "contain" : "cover",
              display: "block",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 350ms cubic-bezier(0.23,1,0.32,1)",
            }}
          />
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <WorkTypeBadge project={project} />
          </div>
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
          <p style={{ ...metaStyle, color: "#22c55e", marginBottom: "0.3rem" }}>
            {project.category} // {project.format} // {formatDuration(project.duration)}
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

export function UpcomingCard({ slot, language }: { slot: UpcomingSlot; language: Language }) {
  return (
    <div>
      <div style={{
        aspectRatio: "16/9",
        border: "1px dashed rgba(34,197,94,0.35)",
        background: "rgba(34,197,94,0.03)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
      }}>
        <span style={{ ...metaStyle, color: "rgba(34,197,94,0.8)" }}>Coming soon</span>
        <span style={{ ...metaStyle, fontSize: "0.52rem", color: "rgba(240,240,240,0.3)" }}>{slot.format}</span>
      </div>
      <div style={{ padding: "0.65rem 0 0" }}>
        <p style={{ ...metaStyle, color: "rgba(240,240,240,0.35)", marginBottom: "0.3rem" }}>
          Commercial // English
        </p>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "rgba(240,240,240,0.5)",
          margin: 0,
          lineHeight: 1.3,
          letterSpacing: "0.02em",
        }}>
          {slot.title[language].toUpperCase()}
        </h3>
      </div>
    </div>
  );
}

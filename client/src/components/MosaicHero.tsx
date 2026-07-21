// Ecyce Portfolio — Mosaic Hero
// Style: Dark Craft — geometric tile grid with green/black/dark palette
// Inspired by matheus.works mosaic grid hero, adapted with electric green theme
import { useEffect, useState } from "react";

type TileType = "circle" | "half-circle" | "triangle" | "chevron" | "stripes" | "dots" | "arc" | "diagonal" | "cross" | "wave" | "square-outline" | "letter-e" | "zigzag" | "quarter-circle" | "grid-dots";

interface Tile {
  type: TileType;
  bg: string;
  fg: string;
  rotate?: number;
}

const G = "#22c55e";   // electric green
const DG = "#0d2010";  // dark green
const BK = "#0a0a0a";  // near black
const D1 = "#111111";  // dark surface 1
const D2 = "#1a1a1a";  // dark surface 2
const D3 = "#222222";  // dark surface 3
const MG = "#166534";  // mid green

const tileData: Tile[] = [
  { type: "half-circle", bg: D1, fg: G, rotate: 0 },
  { type: "diagonal", bg: BK, fg: D2, rotate: 0 },
  { type: "triangle", bg: G, fg: BK, rotate: 0 },
  { type: "quarter-circle", bg: D2, fg: G, rotate: 0 },

  { type: "chevron", bg: DG, fg: G, rotate: 0 },
  { type: "stripes", bg: BK, fg: D3, rotate: 0 },
  { type: "dots", bg: D1, fg: G, rotate: 0 },
  { type: "arc", bg: G, fg: BK, rotate: 0 },

  { type: "square-outline", bg: D2, fg: G, rotate: 0 },
  { type: "wave", bg: BK, fg: G, rotate: 0 },
  { type: "triangle", bg: D1, fg: D3, rotate: 180 },
  { type: "half-circle", bg: MG, fg: BK, rotate: 180 },

  { type: "cross", bg: D3, fg: G, rotate: 0 },
  { type: "diagonal", bg: DG, fg: G, rotate: 0 },
  { type: "circle", bg: BK, fg: D2, rotate: 0 },
  { type: "chevron", bg: D1, fg: G, rotate: 90 },

  { type: "stripes", bg: G, fg: BK, rotate: 90 },
  { type: "arc", bg: D2, fg: G, rotate: 90 },
  { type: "grid-dots", bg: D3, fg: DG, rotate: 0 },
  { type: "letter-e", bg: BK, fg: G, rotate: 0 },

  { type: "zigzag", bg: DG, fg: G, rotate: 180 },
  { type: "square-outline", bg: D1, fg: G, rotate: 45 },
  { type: "triangle", bg: G, fg: BK, rotate: 90 },
  { type: "quarter-circle", bg: D2, fg: G, rotate: 180 },
];

function TileSVG({ tile, size }: { tile: Tile; size: number }) {
  const { type, bg, fg, rotate = 0 } = tile;
  const s = size;
  const cx = s / 2;

  return (
    <svg
      width={s} height={s} viewBox={`0 0 ${s} ${s}`}
      style={{ display: "block", transform: `rotate(${rotate}deg)`, width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={s} height={s} fill={bg} />

      {type === "circle" && (
        <circle cx={cx} cy={cx} r={s * 0.38} fill={fg} />
      )}
      {type === "half-circle" && (
        <path d={`M ${s * 0.08} ${cx} A ${s * 0.42} ${s * 0.42} 0 0 1 ${s * 0.92} ${cx} Z`} fill={fg} />
      )}
      {type === "quarter-circle" && (
        <path d={`M 0 ${s} A ${s} ${s} 0 0 1 ${s} 0 L ${s} ${s} Z`} fill={fg} />
      )}
      {type === "triangle" && (
        <polygon points={`${cx},${s * 0.12} ${s * 0.88},${s * 0.85} ${s * 0.12},${s * 0.85}`} fill={fg} />
      )}
      {type === "chevron" && (
        <>
          <polyline points={`${s * 0.12},${s * 0.32} ${cx},${s * 0.52} ${s * 0.88},${s * 0.32}`} fill="none" stroke={fg} strokeWidth={s * 0.09} strokeLinecap="square" />
          <polyline points={`${s * 0.12},${s * 0.54} ${cx},${s * 0.74} ${s * 0.88},${s * 0.54}`} fill="none" stroke={fg} strokeWidth={s * 0.09} strokeLinecap="square" />
        </>
      )}
      {type === "stripes" && Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={0} y={s * (i * 0.155 + 0.07)} width={s} height={s * 0.075} fill={fg} />
      ))}
      {type === "dots" && [
        [0.25, 0.25], [0.5, 0.25], [0.75, 0.25],
        [0.25, 0.5], [0.5, 0.5], [0.75, 0.5],
        [0.25, 0.75], [0.5, 0.75], [0.75, 0.75],
      ].map(([x, y], i) => (
        <circle key={i} cx={s * x} cy={s * y} r={s * 0.06} fill={fg} />
      ))}
      {type === "grid-dots" && [
        [0.2, 0.2], [0.5, 0.2], [0.8, 0.2],
        [0.2, 0.5], [0.5, 0.5], [0.8, 0.5],
        [0.2, 0.8], [0.5, 0.8], [0.8, 0.8],
      ].map(([x, y], i) => (
        <rect key={i} x={s * x - s * 0.04} y={s * y - s * 0.04} width={s * 0.08} height={s * 0.08} fill={fg} />
      ))}
      {type === "arc" && (
        <path d={`M ${s * 0.08} ${s * 0.92} A ${s * 0.42} ${s * 0.42} 0 0 1 ${s * 0.92} ${s * 0.92}`} fill={fg} />
      )}
      {type === "diagonal" && (
        <polygon points={`0,0 ${s},0 ${s},${s}`} fill={fg} />
      )}
      {type === "cross" && (
        <>
          <rect x={cx - s * 0.075} y={s * 0.12} width={s * 0.15} height={s * 0.76} fill={fg} />
          <rect x={s * 0.12} y={cx - s * 0.075} width={s * 0.76} height={s * 0.15} fill={fg} />
        </>
      )}
      {type === "wave" && (
        <>
          <path d={`M 0 ${cx} Q ${s * 0.25} ${s * 0.22} ${cx} ${cx} Q ${s * 0.75} ${s * 0.78} ${s} ${cx}`}
            fill="none" stroke={fg} strokeWidth={s * 0.1} strokeLinecap="round" />
          <path d={`M 0 ${s * 0.7} Q ${s * 0.25} ${s * 0.42} ${cx} ${s * 0.7} Q ${s * 0.75} ${s * 0.98} ${s} ${s * 0.7}`}
            fill="none" stroke={fg} strokeWidth={s * 0.07} strokeLinecap="round" opacity={0.5} />
        </>
      )}
      {type === "square-outline" && (
        <rect x={s * 0.18} y={s * 0.18} width={s * 0.64} height={s * 0.64} fill="none" stroke={fg} strokeWidth={s * 0.09} />
      )}
      {type === "zigzag" && (
        <polyline
          points={`0,${s * 0.65} ${s * 0.2},${s * 0.35} ${s * 0.4},${s * 0.65} ${s * 0.6},${s * 0.35} ${s * 0.8},${s * 0.65} ${s},${s * 0.35}`}
          fill="none" stroke={fg} strokeWidth={s * 0.09} strokeLinejoin="miter"
        />
      )}
      {type === "letter-e" && (
        <>
          <rect x={s * 0.25} y={s * 0.22} width={s * 0.5} height={s * 0.1} fill={fg} />
          <rect x={s * 0.25} y={s * 0.45} width={s * 0.38} height={s * 0.1} fill={fg} />
          <rect x={s * 0.25} y={s * 0.68} width={s * 0.5} height={s * 0.1} fill={fg} />
          <rect x={s * 0.25} y={s * 0.22} width={s * 0.1} height={s * 0.56} fill={fg} />
        </>
      )}
    </svg>
  );
}

export default function MosaicHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const cols = 4;
  const rows = 6;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 600,
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Mosaic grid — fills entire viewport */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        {tileData.map((tile, i) => (
          <div
            key={i}
            style={{
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.95)",
              transition: `opacity 0.4s ease ${i * 35}ms, transform 0.4s ease ${i * 35}ms`,
            }}
          >
            <TileSVG tile={tile} size={400} />
          </div>
        ))}
      </div>

      {/* Gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.95))",
          pointerEvents: "none",
        }}
      />

      {/* Intro text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "9%",
          left: "5%",
          right: "5%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 800ms, transform 0.6s ease 800ms",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#22c55e",
            marginBottom: "0.8rem",
          }}
        >
          Video Editor — Korea
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.7rem, 4.2vw, 3.4rem)",
            fontWeight: 700,
            lineHeight: 1.12,
            color: "#f0f0f0",
            maxWidth: "680px",
            margin: 0,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          관성을 깨는{" "}
          <em style={{ color: "#22c55e", fontStyle: "italic" }}>아이디어.</em>
          <br />
          한계 없는{" "}
          <em style={{ color: "#22c55e", fontStyle: "italic" }}>시도.</em>
        </h1>
        <p
          style={{
            marginTop: "1rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
            color: "rgba(240,240,240,0.55)",
            maxWidth: "440px",
          }}
        >
          저는 Ecyce입니다. — 박자감 있는 편집과 명확한 서사로 사람들의 기억에 남는 영상을 만듭니다.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: visible ? 0.45 : 0,
          transition: "opacity 0.6s ease 1200ms",
        }}
      >
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.12em",
          color: "#f0f0f0",
          writingMode: "vertical-rl",
          textTransform: "uppercase",
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #f0f0f0, transparent)" }} />
      </div>
    </section>
  );
}

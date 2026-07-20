// Ecyce Portfolio — Contact Page
// Style: Dark Craft — editor-voice copy, geometric accent, minimal form
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Geometric header strip */}
      <div style={{ paddingTop: "80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          height: 6,
        }}>
          {["#22c55e","#0d2010","#111","#1a1a1a","#22c55e","#0a0a0a","#0d2010","#1a1a1a","#22c55e","#111","#0a0a0a","#0d2010"].map((bg, i) => (
            <div key={i} style={{ background: bg }} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          color: "#22c55e",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          Contact
        </p>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#f0f0f0",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}>
          Got footage.<br />
          <span style={{ color: "#22c55e" }}>Need a cut?</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1rem",
          color: "rgba(240,240,240,0.5)",
          marginBottom: "3.5rem",
          lineHeight: 1.7,
        }}>
          Tell me about your project — the story, the pacing, the feeling you're after. I'll get back to you within 24 hours.
        </p>

        {sent ? (
          <div style={{
            padding: "2.5rem",
            border: "1px solid rgba(34,197,94,0.3)",
            background: "rgba(34,197,94,0.05)",
            textAlign: "center",
          }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: "#22c55e", marginBottom: "0.5rem" }}>Transmission received.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(240,240,240,0.55)" }}>I'll review the brief and respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { key: "name", label: "Name", type: "text", placeholder: "Your name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map(field => (
              <div key={field.key}>
                <label style={{
                  display: "block",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(240,240,240,0.4)",
                  marginBottom: "0.5rem",
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  required
                  style={{
                    width: "100%",
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "0.85rem 1rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: "#f0f0f0",
                    outline: "none",
                    transition: "border-color 150ms",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#22c55e")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
            ))}
            <div>
              <label style={{
                display: "block",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(240,240,240,0.4)",
                marginBottom: "0.5rem",
              }}>
                The Brief
              </label>
              <textarea
                placeholder="Describe the project — genre, tone, pacing, deadline..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={6}
                style={{
                  width: "100%",
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "0.85rem 1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "#f0f0f0",
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 150ms",
                  boxSizing: "border-box",
                }}
                onFocus={e => (e.target.style.borderColor = "#22c55e")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
            <div>
              <button
                type="submit"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#0a0a0a",
                  background: "#22c55e",
                  border: "none",
                  padding: "1rem 2.5rem",
                  cursor: "pointer",
                  transition: "background 150ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#16a34a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#22c55e")}
              >
                Send the Brief →
              </button>
            </div>
          </form>
        )}

        {/* Contact info */}
        <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {[
              { label: "Email", value: "ecyce@email.com" },
              { label: "Based in", value: "Seoul, Korea" },
              { label: "Available for", value: "Remote Worldwide" },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(240,240,240,0.35)", textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#f0f0f0" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


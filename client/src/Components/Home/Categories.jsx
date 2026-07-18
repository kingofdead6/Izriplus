import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import Reveal from "../Shared/Reveal";

// Warm, earthy overlay tints per card — cycles if there are more categories.
const OVERLAYS = [
  "linear-gradient(0deg,rgba(43,25,10,.82),rgba(43,25,10,.15) 55%,transparent)",
  "linear-gradient(0deg,rgba(60,30,15,.82),rgba(60,30,15,.12) 55%,transparent)",
  "linear-gradient(0deg,rgba(35,35,20,.82),rgba(35,35,20,.12) 55%,transparent)",
  "linear-gradient(0deg,rgba(50,20,20,.82),rgba(50,20,20,.12) 55%,transparent)",
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories`)
      .then((r) => setCategories(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 26px 30px" }}>
        <div style={{ display: "flex", gap: 14, height: 330 }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: 24,
                background: "var(--surface-soft)",
                border: "1px solid var(--line)",
                animation: "glowPulse 1.8s infinite",
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "76px 26px 30px" }}>
      <Reveal
        as="div"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <div>
          <span className="nv-eyebrow" style={{ marginBottom: 14, display: "inline-flex" }}>
            Nos catégories
          </span>
          <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.015em", margin: "12px 0 0", color: "var(--ink)", lineHeight: 1.1 }}>
            Une pièce pour chaque<br />coin de la maison.
          </h2>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="nv-link"
          style={{
            fontFamily: "'Inter'",
            fontWeight: 600,
            color: "var(--ink)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Voir toute la collection <span style={{ color: "var(--secondary)" }}>→</span>
        </button>
      </Reveal>

      <Reveal className="nv-brand-row" variant="scale">
        {categories.map((cat, idx) => {
          const overlay = OVERLAYS[idx % OVERLAYS.length];
          return (
            <div
              key={cat._id}
              className="nv-brand-card nv-media"
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              style={{
                position: "relative",
                borderRadius: 24,
                cursor: "pointer",
                overflow: "hidden",
                border: "1px solid var(--line)",
                background: "var(--surface-soft)",
              }}
            >
              {/* Photo layer */}
              {cat.image?.url && (
                <img src={cat.image.url} alt={cat.name} className="nv-brand-logo" />
              )}
              {/* Contrast overlay so text stays readable over any photo */}
              <div style={{ position: "absolute", inset: 0, background: overlay, zIndex: 1 }} />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 22,
                }}
              >
                <span style={{ alignSelf: "flex-start", fontFamily: "'Inter'", fontWeight: 600, fontSize: 10.5, letterSpacing: ".1em", color: "rgba(255,255,255,.9)", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.22)", backdropFilter: "blur(6px)" }}>
                  Catégorie
                </span>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 23, margin: "0 0 6px", color: "#fff" }}>
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p
                      style={{
                        fontFamily: "'Inter'",
                        fontSize: 13,
                        color: "rgba(255,255,255,.85)",
                        margin: "0 0 12px",
                        lineHeight: 1.45,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {cat.description}
                    </p>
                  )}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, color: "#fff", letterSpacing: ".02em" }}>
                    Découvrir
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}

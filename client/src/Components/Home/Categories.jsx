import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";

// Warm, earthy overlay tints per card — cycles if there are more categories.
const OVERLAYS = [
  "linear-gradient(0deg,rgba(43,25,10,.78),rgba(43,25,10,.12) 55%,transparent)",
  "linear-gradient(0deg,rgba(60,30,15,.78),rgba(60,30,15,.1) 55%,transparent)",
  "linear-gradient(0deg,rgba(35,35,20,.78),rgba(35,35,20,.1) 55%,transparent)",
  "linear-gradient(0deg,rgba(50,20,20,.78),rgba(50,20,20,.1) 55%,transparent)",
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
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 26px 30px" }}>
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
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 26px 30px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "var(--secondary)", margin: "0 0 10px", textTransform: "uppercase" }}>
            Nos catégories
          </p>
          <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.01em", margin: 0, color: "var(--ink)" }}>
            Une pièce pour chaque coin de la maison.
          </h2>
        </div>

        <button
          onClick={() => navigate("/products")}
          style={{
            fontFamily: "'Inter'",
            fontWeight: 600,
            color: "var(--muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            transition: "color .25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          Voir tout
        </button>
      </div>

      <div className="nv-brand-row">
        {categories.map((cat, idx) => {
          const overlay = OVERLAYS[idx % OVERLAYS.length];
          return (
            <div
              key={cat._id}
              className="nv-brand-card"
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
                <span style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 11, letterSpacing: ".08em", color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>
                  Catégorie
                </span>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 22, margin: "0 0 6px", color: "#fff" }}>
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p
                      style={{
                        fontFamily: "'Inter'",
                        fontSize: 13,
                        color: "rgba(255,255,255,.82)",
                        margin: 0,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import { useNavigate } from "react-router-dom";
import Reveal from "../Shared/Reveal";

export default function PromoBanner() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 26px 76px" }}>
      <Reveal variant="scale">
        <div style={{ position: "relative", borderRadius: 32, overflow: "hidden", border: "1px solid rgb(var(--primary-rgb) / .2)", background: "linear-gradient(125deg,#4A2F1B,#5A3A22 40%,#7C4E2C)", boxShadow: "0 50px 90px -44px rgb(var(--primary-rgb) / .7)" }}>
          {/* soft warm glows */}
          <div style={{ position: "absolute", top: "-40%", left: "-8%", width: "55%", height: "180%", background: "radial-gradient(circle,rgb(var(--secondary-rgb) / .5),transparent 65%)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: "-40%", right: "-6%", width: "50%", height: "170%", background: "radial-gradient(circle,rgb(var(--accent-rgb) / .4),transparent 65%)", filter: "blur(55px)" }} />
          {/* fine diagonal texture */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 22px)", pointerEvents: "none" }} />

          <div className="nv-hero-row" style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 36, padding: "60px 54px" }}>
            <div style={{ maxWidth: 580 }}>
              <span className="nv-eyebrow" style={{ display: "inline-flex", color: "#F0DDBE", marginBottom: 16 }}>Sur mesure</span>
              <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,48px)", lineHeight: 1.1, letterSpacing: "-.015em", margin: "0 0 18px", color: "#fff" }}>
                Aménagez votre intérieur<br />avec du mobilier <span style={{ fontStyle: "italic", color: "#F0DDBE" }}>fabriqué pour vous</span>.
              </h2>
              <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.85)", margin: "0 0 30px", lineHeight: 1.65 }}>
                Notre atelier conçoit et fabrique chaque pièce en Algérie. Contactez notre équipe pour un devis personnalisé et des conseils adaptés à votre espace.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("/contact")}
                  className="nv-btn"
                  style={{ padding: "16px 30px", border: "none", borderRadius: 15, background: "#fff", color: "#5A3A22", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 20px 40px -16px rgba(0,0,0,.5)" }}
                >
                  Demander un devis →
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="nv-link"
                  style={{ padding: "16px 30px", border: "1px solid rgba(255,255,255,.3)", borderRadius: 15, background: "rgba(255,255,255,.08)", color: "#fff", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, cursor: "pointer", backdropFilter: "blur(6px)" }}
                >
                  Voir la collection
                </button>
              </div>
            </div>

            <div style={{ position: "relative", flexShrink: 0 }}>
              <div className="nv-spin-slow" style={{ position: "absolute", inset: -18, borderRadius: "50%", border: "1px dashed rgba(255,255,255,.28)" }} />
              <div style={{ width: 172, height: 172, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.28)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", animation: "floaty 6s ease-in-out infinite", backdropFilter: "blur(4px)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" style={{ marginBottom: 8 }}>
                  <path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z" />
                </svg>
                <span style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".04em", color: "#fff", lineHeight: 1.3 }}>100% Fabriqué<br />en Algérie</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

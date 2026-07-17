import { useNavigate } from "react-router-dom";

export default function PromoBanner() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "54px 26px 60px" }}>
      <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", border: "1px solid rgb(var(--primary-rgb) / .2)", background: "linear-gradient(120deg,#5A3A22,#7C4E2C)" }}>
        {/* soft warm glows, no neon */}
        <div style={{ position: "absolute", top: "-40%", left: "-8%", width: "55%", height: "180%", background: "radial-gradient(circle,rgb(var(--secondary-rgb) / .45),transparent 65%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "-40%", right: "-6%", width: "50%", height: "170%", background: "radial-gradient(circle,rgb(var(--accent-rgb) / .3),transparent 65%)", filter: "blur(55px)" }} />

        <div className="nv-hero-row" style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, padding: "54px 50px" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "#F0DDBE", margin: "0 0 14px", textTransform: "uppercase" }}>Sur mesure</p>
            <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.12, letterSpacing: "-.01em", margin: "0 0 18px", color: "#fff" }}>
              Aménagez votre intérieur<br />avec du mobilier <span style={{ color: "#F0DDBE" }}>fabriqué pour vous</span>.
            </h2>
            <p style={{ fontSize: 16.5, color: "rgba(255,255,255,.82)", margin: "0 0 28px", lineHeight: 1.6 }}>
              Notre atelier conçoit et fabrique chaque pièce en Algérie. Contactez notre équipe pour un devis personnalisé et des conseils adaptés à votre espace.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="nv-mag-btn"
              style={{ padding: "15px 28px", border: "none", borderRadius: 14, background: "#fff", color: "#5A3A22", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
            >
              Demander un devis →
            </button>
          </div>

          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", animation: "floaty 6s ease-in-out infinite" }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" style={{ marginBottom: 8 }}>
                <path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z" />
              </svg>
              <span style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".04em", color: "#fff", lineHeight: 1.3 }}>100% Fabriqué<br />en Algérie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
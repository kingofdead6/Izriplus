import { useNavigate } from "react-router-dom";
import Reveal from "../Shared/Reveal";

export default function PromoBanner() {
  const navigate = useNavigate();
  return (
    <section style={{ background: "var(--ink)" }}>
      <Reveal as="div" className="max-w-[900px] mx-auto px-6 sm:px-8 py-24 md:py-32 text-center">
        <span className="nv-eyebrow nv-eyebrow--center mb-7" style={{ color: "var(--accent)" }}>Sur mesure</span>
        <h2
          className="mt-6 mb-7 mx-auto"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: "var(--bg)", fontSize: "clamp(30px,4.6vw,54px)", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 640 }}
        >
          Aménagez votre intérieur avec du mobilier{" "}
          <span style={{ fontStyle: "italic" }}>fabriqué pour vous</span>.
        </h2>
        <p className="mx-auto mb-10" style={{ color: "rgba(243,238,230,.72)", fontSize: 17, lineHeight: 1.7, maxWidth: 520 }}>
          Notre atelier conçoit et fabrique chaque pièce en Algérie. Contactez notre équipe pour un devis
          personnalisé et des conseils adaptés à votre espace.
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <button onClick={() => navigate("/contact")} className="nv-btn nv-btn-light">
            Demander un devis
          </button>
          <button
            onClick={() => navigate("/products")}
            className="nv-link"
            style={{ color: "var(--bg)" }}
          >
            Voir la collection <span className="nv-link__arrow">→</span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}

import { store } from "../../store.config.js";
import Reveal from "../Shared/Reveal";

const IconCraft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z" />
  </svg>
);
const IconTruck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="14" height="11" rx="1.5" /><path d="M15 10h4l3 3v4h-7z" />
    <circle cx="6" cy="19" r="1.6" /><circle cx="17.5" cy="19" r="1.6" />
  </svg>
);
const IconCash = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconSupport = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a4 4 0 10-5.4 5.4l6.9 6.9a1.5 1.5 0 002.1-2.1z" />
    <path d="M6 12l-3 3 3 3" />
  </svg>
);

const FEATURES = [
  { Icon: IconCraft, title: "Fabrication soignée", desc: "Chaque meuble est fabriqué en Algérie, avec des matériaux durables et un vrai savoir-faire." },
  { Icon: IconTruck, title: "Livraison rapide", desc: "Livraison partout en Algérie, commande préparée avec soin avant expédition." },
  { Icon: IconCash, title: "Paiement à la livraison", desc: "Aucun paiement à l'avance. Vous inspectez votre meuble, puis vous payez." },
  { Icon: IconSupport, title: "Service après-vente", desc: "Une équipe disponible pour le montage, les questions et le suivi de commande." },
];

export default function WhyUs() {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "76px 26px 40px" }}>
      <Reveal as="div" style={{ textAlign: "center", marginBottom: 20 }}>
        <span className="nv-eyebrow nv-eyebrow--center" style={{ display: "inline-flex", marginBottom: 14 }}>
          Pourquoi {store.brand.name}
        </span>
        <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.015em", margin: "12px 0 22px", color: "var(--ink)", lineHeight: 1.1 }}>
          Une maison de confiance.
        </h2>
        <div className="nv-divider"><span className="nv-diamond" /></div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20, marginTop: 42 }}>
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 90} style={{ height: "100%" }}>
            <div
              className="nv-rise"
              style={{
                position: "relative", borderRadius: 20, padding: "30px 26px",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgb(var(--secondary-rgb) / .16), rgb(var(--accent-rgb) / .1))", border: "1px solid rgb(var(--secondary-rgb) / .22)", marginBottom: 20 }}>
                <f.Icon />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 18.5, margin: "0 0 8px", color: "var(--ink)" }}>{f.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

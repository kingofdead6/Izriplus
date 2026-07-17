import { store } from "../../store.config.js";

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
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 26px 30px" }}>
      <div style={{ textAlign: "center", marginBottom: 42 }}>
        <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "var(--secondary)", margin: "0 0 10px", textTransform: "uppercase" }}>Pourquoi {store.brand.name}</p>
        <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.01em", margin: 0, color: "var(--ink)" }}>Une maison de confiance.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18 }}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            style={{
              position: "relative", borderRadius: 18, padding: "28px 24px",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              overflow: "hidden",
              animation: `fadeUp .6s both`,
              animationDelay: `${i * 0.08}s`,
              transition: "transform .3s,border-color .3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgb(var(--secondary-rgb) / .4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--line)"; }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(var(--secondary-rgb) / .1)", border: "1px solid rgb(var(--secondary-rgb) / .25)", marginBottom: 18 }}>
              <f.Icon />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 18, margin: "0 0 8px", color: "var(--ink)" }}>{f.title}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
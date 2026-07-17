import { useNavigate } from "react-router-dom";

const IconCatalog = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const IconContact = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconDelivery = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="14" height="11" rx="1.5" /><path d="M15 10h4l3 3v4h-7z" />
    <circle cx="6" cy="19" r="1.6" /><circle cx="17.5" cy="19" r="1.6" />
  </svg>
);

const SERVICES = [
  {
    Icon: IconCatalog,
    label: "Parcourir le catalogue",
    desc: "Salon, chambre, salle à manger et décoration — toute la gamme, aux meilleurs prix.",
    to: "/products",
    gradient: ["var(--secondary)", "var(--primary)"],
    tag: "CATALOGUE",
  },
  {
    Icon: IconContact,
    label: "Nous contacter",
    desc: "Une question ou besoin de conseils ? Notre équipe vous aide à choisir le bon meuble.",
    to: "/contact",
    gradient: ["var(--accent)", "#8f7139"],
    tag: "CONTACT",
    highlight: true,
  },
  {
    Icon: IconDelivery,
    label: "Livraison & Montage",
    desc: "Livraison partout en Algérie, paiement à la livraison. Montage disponible sur demande.",
    to: "/products",
    gradient: ["#7a8f5f", "#4f5c3d"],
    tag: "LIVRAISON",
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 26px 70px" }}>
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "var(--secondary)", margin: "0 0 12px", textTransform: "uppercase" }}>
          Nos services
        </p>
        <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(26px,4vw,42px)", letterSpacing: "-.01em", margin: 0, lineHeight: 1.15, color: "var(--ink)" }}>
          Plus qu'un simple magasin.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        {SERVICES.map(({ Icon, label, desc, to, gradient, tag, highlight }) => (
          <div
            key={tag}
            onClick={() => navigate(to)}
            style={{
              position: "relative",
              borderRadius: 22,
              cursor: "pointer",
              border: `1px solid ${highlight ? "rgb(var(--accent-rgb) / .35)" : "var(--line)"}`,
              background: highlight ? "rgb(var(--accent-rgb) / .06)" : "var(--surface)",
              padding: "34px 30px",
              overflow: "hidden",
              transition: "transform .25s, border-color .25s, box-shadow .25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 22px 44px -22px rgba(43,33,24,.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: `linear-gradient(135deg,${gradient[0]},${gradient[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon />
              </div>
              <span style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 10.5, letterSpacing: ".08em", color: "var(--muted)", padding: "5px 10px", border: "1px solid var(--line)", borderRadius: 8 }}>
                {tag}
              </span>
            </div>

            <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 19, margin: "0 0 10px", color: "var(--ink)" }}>
              {label}
            </h3>
            <p style={{ fontFamily: "'Inter'", fontSize: 14.5, color: "var(--muted)", margin: "0 0 26px", lineHeight: 1.6 }}>
              {desc}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14, color: gradient[0] }}>
                En savoir plus
              </span>
              <span style={{ fontSize: 14, color: gradient[0] }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import { useNavigate } from "react-router-dom";
import Reveal from "../Shared/Reveal";

const IconCatalog = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconContact = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconDelivery = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="14" height="11" rx="1" /><path d="M15 10h4l3 3v4h-7z" />
    <circle cx="6" cy="19" r="1.6" /><circle cx="17.5" cy="19" r="1.6" />
  </svg>
);

const SERVICES = [
  { n: "01", Icon: IconCatalog, label: "Parcourir le catalogue", desc: "Salon, chambre, salle à manger et décoration — toute la gamme, aux meilleurs prix.", to: "/products", cta: "Voir la collection" },
  { n: "02", Icon: IconContact, label: "Conseils personnalisés", desc: "Une question ou besoin d'aide ? Notre équipe vous accompagne pour choisir le bon meuble.", to: "/contact", cta: "Nous contacter" },
  { n: "03", Icon: IconDelivery, label: "Livraison & montage", desc: "Livraison partout en Algérie, paiement à la livraison. Montage disponible sur demande.", to: "/products", cta: "En savoir plus" },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="border-t border-[var(--line)]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-20 md:py-28">
        <Reveal as="div" className="mb-14">
          <span className="nv-eyebrow mb-5">Nos services</span>
          <h2 className="text-ink mt-5 mb-0" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(30px,4.2vw,50px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Plus qu'un simple magasin
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] rounded-[6px] overflow-hidden">
          {SERVICES.map(({ n, Icon, label, desc, to, cta }, i) => (
            <Reveal key={n} delay={i * 90}>
              <div
                onClick={() => navigate(to)}
                className="group bg-[var(--bg)] hover:bg-[var(--surface)] transition-colors duration-300 cursor-pointer p-9 md:p-10 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[var(--secondary)]"><Icon /></span>
                  <span className="text-[var(--muted)]/60" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 26, fontStyle: "italic" }}>{n}</span>
                </div>
                <h3 className="text-ink m-0 mb-3" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 21 }}>{label}</h3>
                <p className="text-[var(--muted)] text-[14.5px] leading-[1.7] m-0 mb-8 flex-1">{desc}</p>
                <span className="nv-link">{cta} <span className="nv-link__arrow">→</span></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

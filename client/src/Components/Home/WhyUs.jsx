import Reveal from "../Shared/Reveal";

const IconCraft = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 5.2L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.8z" />
  </svg>
);
const IconTruck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="14" height="11" rx="1" /><path d="M15 10h4l3 3v4h-7z" />
    <circle cx="6" cy="19" r="1.6" /><circle cx="17.5" cy="19" r="1.6" />
  </svg>
);
const IconCash = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="1.5" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconSupport = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a4 4 0 10-5.4 5.4l6.9 6.9a1.5 1.5 0 002.1-2.1z" /><path d="M6 12l-3 3 3 3" />
  </svg>
);

const FEATURES = [
  { Icon: IconCraft, title: "Fabrication soignée", desc: "Fabriqué en Algérie, avec des matériaux durables et un vrai savoir-faire." },
  { Icon: IconTruck, title: "Livraison rapide", desc: "Partout en Algérie, commande préparée avec soin avant expédition." },
  { Icon: IconCash, title: "Paiement à la livraison", desc: "Aucun paiement à l'avance. Vous inspectez votre meuble, puis vous payez." },
  { Icon: IconSupport, title: "Service après-vente", desc: "Une équipe disponible pour le montage, les questions et le suivi." },
];

export default function WhyUs() {
  return (
    <section className="border-t border-[var(--line)]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-4 gap-y-12 gap-x-10">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="md:border-l md:border-[var(--line)] md:pl-8 h-full">
                <span className="text-[var(--secondary)] block mb-5"><f.Icon /></span>
                <h3 className="text-ink m-0 mb-2.5" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 18.5 }}>{f.title}</h3>
                <p className="text-[var(--muted)] text-[14px] leading-[1.7] m-0">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import { store } from "../../store.config.js";
import heroImage from "../../assets/HOME.jpg";

const STATS = [
  { value: "100%", label: "Fabriqué en Algérie" },
  { value: "58", label: "Wilayas livrées" },
  { value: "0 DA", label: "Payé à l'avance" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="nv-hero-row flex flex-row items-center gap-12 lg:gap-20 pt-16 pb-16 md:pt-24 md:pb-20">

          {/* Left – text */}
          <div className="flex-[1.02] [animation:fadeUp_.8s_both]">
            <span className="nv-eyebrow mb-7">Atelier d'ameublement · Koléa</span>

            <h1
              className="text-ink mt-6 mb-7"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(40px,6vw,76px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
            >
              Du mobilier fait pour{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>durer</span>.
            </h1>

            <p className="max-w-[440px] text-[17px] leading-[1.7] text-[var(--muted)] mb-9">
              {store.brand.tagline}
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <button onClick={() => navigate("/products")} className="nv-btn nv-btn-solid">
                Découvrir la collection
              </button>
              <button onClick={() => navigate("/contact")} className="nv-link">
                Nous contacter <span className="nv-link__arrow">→</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-stretch gap-8 sm:gap-10 mt-14 pt-9 border-t border-[var(--line)]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="m-0 text-ink" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: "clamp(24px,3vw,32px)", lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p className="mt-2 mb-0 text-[12px] text-[var(--muted)] uppercase" style={{ letterSpacing: ".08em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – image with offset frame */}
          <div className="flex-1 relative [animation:fadeIn_1s_both]">
            {/* offset outline behind the photo — a quiet editorial matting */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-full h-full rounded-[6px] border border-[rgb(var(--accent-rgb)_/_.5)] pointer-events-none" />
            <div className="nv-media relative rounded-[6px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(35,25,15,.45)]">
              <img
                src={heroImage}
                alt="Salon en bois massif — Meubles IZRI Plus"
                className="w-full h-[420px] sm:h-[500px] md:h-[580px] object-cover"
              />
            </div>
            {/* single understated caption */}
            <div className="absolute left-5 bottom-5 bg-[var(--surface)]/95 backdrop-blur-sm border border-[var(--line)] rounded-[4px] px-4 py-2.5">
              <p className="m-0 text-[11px] uppercase tracking-[.14em] text-[var(--muted)]">Collection Salon</p>
              <p className="m-0 mt-0.5 text-[14px] font-semibold text-ink" style={{ fontFamily: "'Fraunces', serif" }}>Bois massif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slim values strip */}
      <div className="border-y border-[var(--line)]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--line)]">
            {[
              ["Bois massif", "Matériaux durables, finitions soignées"],
              ["Livraison 58 wilayas", "Partout en Algérie"],
              ["Paiement à la livraison", "Vous inspectez, puis vous payez"],
              ["Montage sur demande", "Service après-vente dédié"],
            ].map(([t, d], i) => (
              <div key={t} className={`py-6 px-5 ${i === 0 ? "" : "pl-6"}`}>
                <p className="m-0 text-[14px] font-semibold text-ink" style={{ fontFamily: "'Fraunces', serif" }}>{t}</p>
                <p className="m-0 mt-1 text-[12.5px] text-[var(--muted)] leading-snug">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

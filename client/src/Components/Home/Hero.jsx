import { useNavigate } from "react-router-dom";
import { store } from "../../store.config.js";

// Placeholder showcase image, tinted to the brand palette, until real product
// photography is uploaded. Swap `heroImage` for a Cloudinary URL any time —
// nothing else in this component needs to change.
import heroImage from "../../assets/HOME.jpg";

const STATS = [
  { value: "100%", label: "Fabriqué en Algérie" },
  { value: "58", suffix: "wilayas", label: "Livraison partout" },
  { value: "0 DA", label: "À l'avance" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* decorative oversized watermark word */}
      <span
        aria-hidden
        className="pointer-events-none select-none hidden lg:block absolute -top-6 right-0 font-['Playfair_Display'] font-bold text-[220px] leading-none tracking-tight text-[rgb(var(--primary-rgb)_/_.04)] z-0"
      >
        IZRI
      </span>

      <div className="relative z-[1] max-w-[1280px] mx-auto px-5 sm:px-[26px]">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 pt-16 pb-14 md:pt-[86px] md:pb-[72px]">

          {/* Left – text */}
          <div className="flex-[1.08] flex flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-[9px] px-[15px] py-[7px] rounded-full bg-[rgb(var(--secondary-rgb)_/_.1)] border border-[rgb(var(--secondary-rgb)_/_.28)] mb-7 [animation:fadeUp_.7s_both] backdrop-blur-sm">
              <span className="w-[7px] h-[7px] rounded-full bg-secondary [animation:glowPulse_2.5s_infinite] block shrink-0" />
              <span className="font-['Inter'] font-semibold text-[11.5px] sm:text-xs tracking-[.14em] text-primary uppercase">
                Atelier d'ameublement · Koléa
              </span>
            </div>

            <h1 className="font-['Playfair_Display'] font-bold text-[clamp(38px,6.4vw,70px)] leading-[1.05] tracking-[-0.015em] m-0 mb-6 text-ink [animation:fadeUp_.8s_both] [animation-delay:.05s]">
              Du mobilier fait
              <br className="hidden sm:block" /> pour <span className="nv-gradient-text italic">durer.</span>
            </h1>

            <p className="max-w-[500px] text-base sm:text-[18px] leading-[1.7] text-[var(--muted)] mt-0 mb-9 [animation:fadeUp_.8s_both] [animation-delay:.12s]">
              {store.brand.tagline}
            </p>

            <div className="flex gap-3.5 flex-wrap justify-center md:justify-start w-full [animation:fadeUp_.8s_both] [animation-delay:.2s]">
              <button
                onClick={() => navigate("/products")}
                className="nv-btn inline-flex items-center gap-2.5 px-8 py-[17px] border-none rounded-[15px] bg-gradient-to-br from-secondary to-primary text-white font-['Inter'] font-bold text-base cursor-pointer shadow-[0_20px_40px_-16px_rgb(var(--primary-rgb)_/_.6)]"
              >
                Découvrir la collection
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="nv-link px-8 py-[17px] border border-[var(--line)] rounded-[15px] bg-white/70 backdrop-blur-sm text-ink font-['Inter'] font-bold text-base cursor-pointer transition-all duration-[250ms] hover:border-[rgb(var(--secondary-rgb)_/_.5)] hover:bg-white"
              >
                Nous contacter
              </button>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 w-full max-w-[500px] [animation:fadeUp_.8s_both] [animation-delay:.28s]">
              {STATS.map((s, i) => (
                <div key={i} className={`text-center md:text-left ${i > 0 ? "border-l border-[var(--line)] pl-4 sm:pl-8" : ""}`}>
                  <p className="font-['Playfair_Display'] font-bold text-[clamp(22px,3vw,30px)] text-ink m-0 leading-none">
                    {s.value}
                    {s.suffix && <span className="text-secondary text-[15px] ml-1 font-semibold">{s.suffix}</span>}
                  </p>
                  <p className="font-['Inter'] text-[11.5px] text-[var(--muted)] mt-2 mb-0 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – showcase image */}
          <div className="flex-1 relative flex justify-center items-center [animation:scaleIn_.9s_both]">
            {/* slow-spinning accent ring */}
            <div className="nv-spin-slow absolute w-[300px] h-[300px] sm:w-[430px] sm:h-[430px] md:w-[510px] md:h-[510px] rounded-full border border-dashed border-[rgb(var(--accent-rgb)_/_.35)] pointer-events-none" />
            {/* soft warm glow behind the frame */}
            <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] rounded-full bg-[radial-gradient(circle,rgb(var(--secondary-rgb)_/_.3),transparent_68%)] blur-[14px] [animation:glowPulse_6s_infinite] pointer-events-none" />

            {/* photo frame */}
            <div className="nv-media relative z-[2] w-[268px] sm:w-[350px] md:w-[410px] aspect-[9/11] rounded-[30px] overflow-hidden shadow-[0_46px_90px_-30px_rgba(43,33,24,.5)] border-[6px] border-white ring-1 ring-[var(--line)]">
              <img src={heroImage} alt="Salon Meubles IZRI Plus" className="nv-kenburns w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(43,25,10,.32)] via-transparent to-transparent" />
            </div>

            {/* floating badges */}
            <div className="hidden sm:flex items-center gap-3 absolute top-[7%] left-[-6%] z-[3] [animation:floatySlow_5s_ease-in-out_infinite] nv-glass rounded-2xl px-4 py-[13px]">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white shrink-0">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z" /></svg>
              </span>
              <div>
                <p className="font-['Inter'] font-bold text-[11px] tracking-[.06em] text-secondary m-0 uppercase">Atelier local</p>
                <p className="text-[13px] mt-0.5 mb-0 text-ink font-semibold">Fabrication artisanale</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 absolute bottom-[9%] right-[-6%] z-[3] [animation:floatySlow_6s_ease-in-out_infinite_.6s] nv-glass rounded-2xl px-4 py-[13px]">
              <span className="w-9 h-9 rounded-xl bg-[#7a8f5f] flex items-center justify-center text-white shrink-0">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg>
              </span>
              <div>
                <p className="font-['Inter'] font-bold text-[11px] tracking-[.06em] text-[#5f7048] m-0 uppercase">En stock</p>
                <p className="text-[13px] mt-0.5 mb-0 text-ink font-semibold">Livraison rapide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee trust strip */}
      <div className="relative z-[1] border-y border-[var(--line)] bg-white/40 backdrop-blur-sm py-4 mt-2">
        <div className="nv-marquee max-w-full">
          <div className="nv-marquee__track font-['Inter'] font-semibold text-[13px] tracking-[.08em] uppercase text-[var(--muted)]">
            {[...Array(2)].map((_, dup) => (
              <span key={dup} className="flex items-center gap-[54px]">
                {["Bois massif", "Paiement à la livraison", "Fabriqué en Algérie", "Montage sur demande", "Matériaux durables", "Service après-vente"].map((t) => (
                  <span key={t} className="flex items-center gap-[54px]">
                    <span className="nv-diamond" />
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

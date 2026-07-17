import { useNavigate } from "react-router-dom";
import { store } from "../../store.config.js";

// Placeholder showcase image, tinted to the brand palette, until real product
// photography is uploaded. Swap `heroImage` for a Cloudinary URL any time —
// nothing else in this component needs to change.
import heroImage from "../../assets/HOME.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative max-w-[1280px] mx-auto px-5 sm:px-[26px] overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-14 pt-14 pb-16 md:pt-[76px] md:pb-[70px] [animation:fadeIn_.5s]">

        {/* Left – text */}
        <div className="flex-[1.05] flex flex-col items-center text-center md:items-start md:text-left [animation:fadeUp_.8s_both]">
          <div className="inline-flex items-center gap-[9px] px-[15px] py-[7px] rounded-full bg-[rgb(var(--secondary-rgb)_/_.1)] border border-[rgb(var(--secondary-rgb)_/_.3)] mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-secondary [animation:glowPulse_2.5s_infinite] block shrink-0" />
            <span className="font-['Inter'] font-semibold text-[11.5px] sm:text-xs tracking-[.1em] text-primary uppercase">
              Fabriqué en Algérie
            </span>
          </div>

          <h1 className="font-['Playfair_Display'] font-bold text-[clamp(34px,6vw,64px)] leading-[1.08] tracking-[-0.01em] m-0 mb-5 text-ink">
            Du mobilier fait pour
            <span className="text-secondary"> durer.</span>
          </h1>

          <p className="max-w-[480px] text-base sm:text-[18px] leading-[1.65] text-[var(--muted)] mt-0 mb-8">
            {store.brand.tagline}
          </p>

          <div className="flex gap-3 flex-wrap justify-center md:justify-start w-full">
            <button
              onClick={() => navigate("/products")}
              className="nv-mag-btn inline-flex items-center gap-2.5 px-7 py-4 border-none rounded-[14px] bg-gradient-to-br from-secondary to-primary text-white font-['Inter'] font-bold text-base cursor-pointer shadow-[0_18px_36px_-14px_rgb(var(--primary-rgb)_/_.55)]"
            >
              Découvrir la collection <span className="text-lg">→</span>
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-7 py-4 border border-[var(--line)] rounded-[14px] bg-white text-ink font-['Inter'] font-bold text-base cursor-pointer transition-all duration-[250ms] hover:border-[rgb(var(--secondary-rgb)_/_.5)]"
            >
              Nous contacter
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-10 text-[13px] font-['Inter'] font-semibold text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
              Bois massif &amp; matériaux durables
            </span>
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
              Paiement à la livraison
            </span>
          </div>
        </div>

        {/* Right – showcase image */}
        <div className="flex-1 relative flex justify-center items-center [animation:scaleIn_.9s_both]">
          {/* soft warm glow behind the frame */}
          <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] rounded-full bg-[radial-gradient(circle,rgb(var(--secondary-rgb)_/_.28),transparent_68%)] blur-[10px] [animation:glowPulse_6s_infinite] pointer-events-none" />

          {/* photo frame */}
          <div className="relative z-[2] w-[260px] sm:w-[340px] md:w-[400px] aspect-[9/11] rounded-[26px] overflow-hidden shadow-[0_36px_70px_-26px_rgba(43,33,24,.35)] border border-[var(--line)]">
            <img src={heroImage} alt="Salon Meubles IZRI Plus" className="w-full h-full object-cover" />
          </div>

          {/* floating badges */}
          <div className="hidden sm:block absolute top-[6%] left-[-4%] z-[3] [animation:floatySlow_5s_ease-in-out_infinite] bg-white border border-[var(--line)] rounded-2xl px-4 py-[13px] shadow-[0_20px_36px_-18px_rgba(43,33,24,.25)]">
            <p className="font-['Inter'] font-bold text-[11px] tracking-[.06em] text-secondary m-0 uppercase">Atelier local</p>
            <p className="text-[13px] mt-1 mb-0 text-ink font-semibold">Fabrication artisanale</p>
          </div>
          <div className="hidden sm:block absolute bottom-[8%] right-[-4%] z-[3] [animation:floatySlow_6s_ease-in-out_infinite_.6s] bg-white border border-[var(--line)] rounded-2xl px-4 py-[13px] shadow-[0_20px_36px_-18px_rgba(43,33,24,.25)]">
            <p className="font-['Inter'] font-bold text-[11px] tracking-[.06em] text-[#7a8f5f] m-0 uppercase">✓ En stock</p>
            <p className="text-[13px] mt-1 mb-0 text-ink font-semibold">Livraison rapide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
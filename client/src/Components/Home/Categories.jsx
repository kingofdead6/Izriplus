import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import Reveal from "../Shared/Reveal";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories`)
      .then((r) => setCategories(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-[1240px] mx-auto px-6 sm:px-8 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-[6px] bg-[var(--surface-soft)] border border-[var(--line)]" style={{ animation: "fadeIn .6s both" }} />
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="max-w-[1240px] mx-auto px-6 sm:px-8 py-20 md:py-28">
      <Reveal as="div" className="flex items-end justify-between gap-6 flex-wrap mb-12">
        <div>
          <span className="nv-eyebrow mb-5">Nos catégories</span>
          <h2 className="text-ink mt-5 mb-0" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(30px,4.2vw,50px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Une pièce pour chaque<br />coin de la maison
          </h2>
        </div>
        <button onClick={() => navigate("/products")} className="nv-link">
          Voir toute la collection <span className="nv-link__arrow">→</span>
        </button>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {categories.map((cat, idx) => (
          <Reveal key={cat._id} delay={idx * 80}>
            <button
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              className="nv-card group relative block w-full text-left p-0 cursor-pointer"
            >
              <div className="nv-media relative aspect-[4/5] bg-[var(--surface-soft)]">
                {cat.image?.url ? (
                  <img src={cat.image.url} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.1" opacity="0.5">
                      <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5zM6 21v-2M18 21v-2" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(20,12,4,.72), rgba(20,12,4,.06) 46%, transparent)" }} />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="m-0 text-[10.5px] uppercase tracking-[.18em] text-white/70">Catégorie</p>
                  <div className="flex items-center justify-between gap-3 mt-1.5">
                    <h3 className="m-0 text-white" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 22, lineHeight: 1.1 }}>
                      {cat.name}
                    </h3>
                    <span className="shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

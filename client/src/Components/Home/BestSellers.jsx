import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import Reveal from "../Shared/Reveal";

export function ProductCard({ product, onClick }) {
  return (
    <button onClick={onClick} className="nv-card group block w-full text-left p-0 cursor-pointer h-full">
      <div className="nv-media relative aspect-[4/5] bg-[var(--surface-soft)]">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase tracking-[.1em] px-2.5 py-1.5 rounded-[3px] bg-[var(--surface)]/95 backdrop-blur-sm border border-[var(--line)] text-[var(--primary)]">
            {product.badge}
          </span>
        )}
        {product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.1" opacity="0.5">
              <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5zM6 21v-2M18 21v-2" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="m-0 text-[11px] uppercase tracking-[.12em] text-[var(--muted)]">{product.category?.name || "Meuble"}</p>
        <h3 className="mt-1.5 mb-0 text-ink group-hover:text-[var(--primary)] transition-colors" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 18, lineHeight: 1.25 }}>
          {product.name}
        </h3>
        <p className="mt-3 mb-0 text-ink" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 17 }}>
          {(product.price || 0).toLocaleString()} DA
        </p>
      </div>
    </button>
  );
}

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products?featured=true`)
      .then(r => setProducts((r.data || []).slice(0, 8)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!products.length) return null;

  return (
    <section className="border-t border-[var(--line)]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-20 md:py-28">
        <Reveal as="div" className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div>
            <span className="nv-eyebrow mb-5">Sélection du moment</span>
            <h2 className="text-ink mt-5 mb-0" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(30px,4.2vw,50px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Les préférés de nos clients
            </h2>
          </div>
          <button onClick={() => navigate("/products")} className="nv-link">
            Voir tout <span className="nv-link__arrow">→</span>
          </button>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <Reveal key={p._id} delay={(i % 4) * 80}>
              <ProductCard product={p} onClick={() => navigate(`/products/${p._id}`)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

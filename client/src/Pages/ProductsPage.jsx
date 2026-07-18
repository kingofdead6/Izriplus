import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify";
import Reveal from "../Components/Shared/Reveal";
import { ProductCard } from "../Components/Home/BestSellers";

const PlaceholderIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.1" opacity="0.5">
    <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5zM6 21v-2M18 21v-2" />
  </svg>
);

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCat(cat || "All");
  }, [searchParams]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [itemsRes, catsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/categories`),
        ]);
        setItems(itemsRes.data || []);
        setCategories(catsRes.data || []);
      } catch {
        toast.error("Impossible de charger les meubles");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    return items.filter(item => {
      const catName = item.category?.name || "";
      const matchCat = selectedCat === "All" || catName === selectedCat;
      const matchSearch = !search
        || item.name.toLowerCase().includes(search.toLowerCase())
        || catName.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, selectedCat, search]);

  const setCategory = (name) => {
    setSelectedCat(name);
    if (name === "All") navigate("/products", { replace: true });
    else navigate(`/products?category=${encodeURIComponent(name)}`, { replace: true });
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
      {/* Header */}
      <section className="border-b border-[var(--line)]">
        <Reveal as="div" className="max-w-[1240px] mx-auto px-6 sm:px-8 pt-20 pb-14 md:pt-28 md:pb-16">
          <span className="nv-eyebrow mb-6">La boutique</span>
          <h1 className="text-ink mt-6 mb-5" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(40px,5.6vw,68px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            Notre <span style={{ fontStyle: "italic" }}>collection</span>
          </h1>
          <p className="text-[var(--muted)] text-[17px] leading-[1.7] m-0 max-w-[540px]">
            Salon, chambre, salle à manger et décoration — fabriqués en Algérie, livrés chez vous.
          </p>
        </Reveal>
      </section>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 pb-24">
        {/* Sticky filter bar */}
        <div className="sticky top-[70px] z-40 -mx-6 sm:-mx-8 px-6 sm:px-8 py-5 mb-12 bg-[var(--bg)]/92 backdrop-blur-md border-b border-[var(--line)]">
          <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
            {/* Category chips */}
            <div className="flex gap-1.5 flex-wrap">
              {["All", ...categories.map(c => c.name)].map(cat => {
                const active = selectedCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="text-[13.5px] font-medium px-4 py-2 rounded-full transition-colors duration-200"
                    style={{
                      color: active ? "var(--bg)" : "var(--muted)",
                      background: active ? "var(--ink)" : "transparent",
                      border: `1px solid ${active ? "var(--ink)" : "var(--line)"}`,
                    }}
                  >
                    {cat === "All" ? "Tout" : cat}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2.5 border-b border-[var(--line)] pb-2 md:min-w-[260px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher…"
                className="flex-1 bg-transparent border-none outline-none text-ink text-[14.5px]"
                style={{ fontFamily: "var(--font-body)" }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-[var(--muted)] text-sm leading-none">✕</button>
              )}
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-[6px] overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
                <div className="aspect-[4/5] bg-[var(--surface-soft)]" style={{ animation: "fadeIn .6s both" }} />
                <div className="p-5">
                  <div className="w-1/2 h-3 rounded bg-[var(--surface-soft)] mb-3" />
                  <div className="w-4/5 h-4 rounded bg-[var(--surface-soft)]" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-[var(--muted)]">
            <div className="flex justify-center mb-5"><PlaceholderIcon /></div>
            <p className="text-ink m-0 mb-2" style={{ fontFamily: "'Fraunces', serif", fontSize: 24 }}>Aucun meuble trouvé</p>
            <p className="m-0">Essayez une autre catégorie ou un autre mot-clé.</p>
            {(search || selectedCat !== "All") && (
              <button onClick={() => { setSearch(""); setCategory("All"); }} className="nv-btn nv-btn-outline mt-7">
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((item, i) => (
              <Reveal key={item._id} delay={(i % 4) * 70}>
                <ProductCard product={item} onClick={() => navigate(`/products/${item._id}`)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify";

// Simple line-art armchair — shown when a product has no photo yet.
const PlaceholderIcon = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.3" opacity="0.55">
    <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
    <path d="M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
    <path d="M4 14a2 2 0 00-2 2v3h2M20 14a2 2 0 012 2v3h-2" />
    <path d="M6 21v-2M18 21v-2" />
  </svg>
);

function ProductCard({ item, index, onClick }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative", borderRadius: 20, overflow: "hidden",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        transition: "box-shadow .3s",
        transformStyle: "preserve-3d",
        animation: "fadeUp .55s both",
        animationDelay: `${index * 0.05}s`,
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 30px 54px -26px rgb(var(--primary-rgb) / .3)")}
      onMouseLeaveCapture={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <div onClick={onClick} style={{ position: "relative", height: 210, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-soft)", overflow: "hidden", cursor: "pointer" }}>
        {item.images?.[0]?.url ? (
          <img src={item.images[0].url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "translateZ(20px)" }} />
        ) : (
          <div style={{ transform: "translateZ(20px)" }}><PlaceholderIcon /></div>
        )}
      </div>

      <div style={{ position: "relative", zIndex: 4, padding: 18 }}>
        <p style={{ fontFamily: "'Inter'", fontSize: 11, color: "var(--secondary)", margin: "0 0 5px", letterSpacing: ".04em", fontWeight: 600, textTransform: "uppercase" }}>
          {item.category?.name || "Meuble"}
        </p>
        <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 17, margin: "0 0 4px", lineHeight: 1.25, color: "var(--ink)" }}>{item.name}</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 18, color: "var(--ink)" }}>{(item.price || 0).toLocaleString()} DA</span>
          <button
            onClick={onClick}
            style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 13, padding: "9px 14px", borderRadius: 11, border: "1px solid rgb(var(--secondary-rgb) / .35)", background: "rgb(var(--secondary-rgb) / .08)", color: "var(--primary)", cursor: "pointer", transition: "all .25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--secondary)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgb(var(--secondary-rgb) / .08)"; e.currentTarget.style.color = "var(--primary)"; }}
          >
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  // Sync category from URL param
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'Playfair Display'", fontSize: 22, color: "var(--secondary)", animation: "glowPulse 1.5s infinite" }}>
          Chargement des meubles…
        </p>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeIn .5s", maxWidth: 1280, margin: "0 auto", padding: "50px 26px 60px" }}>
      {/* Header */}
      <div style={{ animation: "fadeUp .6s both", marginBottom: 30 }}>
        <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "var(--secondary)", margin: "0 0 10px", textTransform: "uppercase" }}>
          {filtered.length} meuble{filtered.length > 1 ? "s" : ""}
        </p>
        <h1 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(32px,5vw,54px)", letterSpacing: "-.01em", margin: 0, color: "var(--ink)" }}>
          Nos Meubles
        </h1>
      </div>

      {/* Sticky filter bar */}
      <div style={{
        position: "sticky", top: 72, zIndex: 40,
        background: "rgba(247,241,232,.92)", backdropFilter: "blur(14px)",
        border: "1px solid var(--line)", borderRadius: 18,
        padding: 14, marginBottom: 28,
        display: "flex", flexDirection: "column", gap: 13,
      }}>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 13, padding: "11px 15px" }}>
          <span style={{ color: "var(--muted)", fontSize: 17 }}>⌕</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un meuble, une catégorie…"
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--ink)", fontFamily: "'Inter'", fontSize: 15 }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All", ...categories.map(c => c.name)].map(cat => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  fontFamily: "'Inter'", fontWeight: 600, fontSize: 13.5,
                  padding: "8px 15px", borderRadius: 11, cursor: "pointer", transition: "all .25s",
                  color: active ? "#fff" : "var(--muted)",
                  background: active ? "var(--secondary)" : "var(--surface)",
                  border: `1px solid ${active ? "var(--secondary)" : "var(--line)"}`,
                }}
              >
                {cat === "All" ? "Tout" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><PlaceholderIcon /></div>
          <p style={{ fontFamily: "'Playfair Display'", fontSize: 22, color: "var(--ink)", margin: "0 0 8px" }}>Aucun meuble trouvé</p>
          <p style={{ margin: 0 }}>Essayez une autre catégorie ou un autre mot-clé.</p>
          {(search || selectedCat !== "All") && (
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              style={{ marginTop: 20, padding: "10px 22px", borderRadius: 12, background: "rgb(var(--secondary-rgb) / .1)", border: "1px solid rgb(var(--secondary-rgb) / .3)", color: "var(--primary)", fontFamily: "'Inter'", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(258px,1fr))", gap: 18 }}>
        {filtered.map((item, i) => (
          <ProductCard key={item._id} item={item} index={i} onClick={() => navigate(`/products/${item._id}`)} />
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";

function TiltCard({ product, index, onClick }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
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
      onClick={onClick}
      style={{
        position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        transition: "box-shadow .3s",
        transformStyle: "preserve-3d",
        animation: `fadeUp .6s both`,
        animationDelay: `${index * 0.07}s`,
        "--mx": "50%", "--my": "50%",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 30px 54px -24px rgb(var(--primary-rgb) / .3)"}
    >
      {/* Product visual */}
      <div style={{ position: "relative", height: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-soft)", overflow: "hidden" }}>
        {product.badge && (
          <span style={{ position: "absolute", top: 13, left: 13, zIndex: 4, fontFamily: "'Inter'", fontSize: 10.5, fontWeight: 700, padding: "5px 10px", borderRadius: 8, background: "rgb(var(--accent-rgb) / .15)", border: "1px solid rgb(var(--accent-rgb) / .4)", color: "var(--primary)" }}>
            {product.badge}
          </span>
        )}
        {product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "translateZ(30px)" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", transform: "translateZ(30px)" }}>
            {/* Simple line-art armchair placeholder for products without a photo yet */}
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.3" opacity="0.55">
              <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
              <path d="M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
              <path d="M4 14a2 2 0 00-2 2v3h2M20 14a2 2 0 012 2v3h-2" />
              <path d="M6 21v-2M18 21v-2" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ position: "relative", zIndex: 4, padding: 18 }}>
        <p style={{ fontFamily: "'Inter'", fontSize: 11, color: "var(--muted)", margin: "0 0 6px" }}>{product.category?.name || ""}</p>
        <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 18, margin: "0 0 8px", color: "var(--ink)" }}>{product.name}</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 19, color: "var(--ink)" }}>{(product.price || 0).toLocaleString()} DA</span>
          <span style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,var(--secondary),var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff" }}>→</span>
        </div>
      </div>
    </div>
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
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "54px 26px 30px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 30, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "var(--secondary)", margin: "0 0 10px", textTransform: "uppercase" }}>Sélection du moment</p>
          <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.01em", margin: 0, color: "var(--ink)" }}>Les préférés de nos clients</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(248px,1fr))", gap: 18 }}>
        {products.map((p, i) => (
          <TiltCard key={p._id} product={p} index={i} onClick={() => navigate(`/products/${p._id}`)} />
        ))}
      </div>
    </section>
  );
}
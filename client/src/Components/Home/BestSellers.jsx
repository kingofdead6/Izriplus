import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import Reveal from "../Shared/Reveal";

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
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    card.style.boxShadow = "0 1px 3px rgba(43,33,24,.05)";
  };

  return (
    <Reveal delay={index * 70} style={{ height: "100%" }}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{
          position: "relative", borderRadius: 22, overflow: "hidden", cursor: "pointer",
          border: "1px solid var(--line)",
          background: "var(--surface)",
          transition: "transform .3s cubic-bezier(.2,.9,.3,1), box-shadow .3s",
          transformStyle: "preserve-3d",
          boxShadow: "0 1px 3px rgba(43,33,24,.05)",
          height: "100%",
          "--mx": "50%", "--my": "50%",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 34px 60px -26px rgb(var(--primary-rgb) / .38)"}
      >
        {/* Product visual */}
        <div className="nv-media" style={{ position: "relative", height: 230, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-soft)", overflow: "hidden" }}>
          {product.badge && (
            <span style={{ position: "absolute", top: 13, left: 13, zIndex: 4, fontFamily: "'Inter'", fontSize: 10.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,.9)", backdropFilter: "blur(6px)", border: "1px solid rgb(var(--accent-rgb) / .4)", color: "var(--primary)", letterSpacing: ".04em", textTransform: "uppercase" }}>
              {product.badge}
            </span>
          )}
          {product.images?.[0]?.url ? (
            <img src={product.images[0].url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.3" opacity="0.55">
                <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
                <path d="M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
                <path d="M4 14a2 2 0 00-2 2v3h2M20 14a2 2 0 012 2v3h-2" />
                <path d="M6 21v-2M18 21v-2" />
              </svg>
            </div>
          )}
          {/* subtle bottom fade for a premium finish */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(43,25,10,.14),transparent 40%)", pointerEvents: "none" }} />
        </div>

        {/* Info */}
        <div style={{ position: "relative", zIndex: 4, padding: 18 }}>
          <p style={{ fontFamily: "'Inter'", fontSize: 11, color: "var(--secondary)", margin: "0 0 6px", letterSpacing: ".05em", fontWeight: 600, textTransform: "uppercase" }}>{product.category?.name || "Meuble"}</p>
          <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 18.5, margin: "0 0 10px", color: "var(--ink)", lineHeight: 1.25 }}>{product.name}</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>{(product.price || 0).toLocaleString()} DA</span>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,var(--secondary),var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: "#fff", boxShadow: "0 10px 20px -8px rgb(var(--primary-rgb) / .55)" }}>→</span>
          </div>
        </div>
      </div>
    </Reveal>
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
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "68px 26px 30px" }}>
      <Reveal as="div" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 34, flexWrap: "wrap" }}>
        <div>
          <span className="nv-eyebrow" style={{ display: "inline-flex" }}>Sélection du moment</span>
          <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.015em", margin: "14px 0 0", color: "var(--ink)", lineHeight: 1.1 }}>Les préférés de nos clients</h2>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="nv-link"
          style={{ fontFamily: "'Inter'", fontWeight: 600, color: "var(--ink)", background: "none", border: "none", cursor: "pointer", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          Voir tout <span style={{ color: "var(--secondary)" }}>→</span>
        </button>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(248px,1fr))", gap: 20 }}>
        {products.map((p, i) => (
          <TiltCard key={p._id} product={p} index={i} onClick={() => navigate(`/products/${p._id}`)} />
        ))}
      </div>
    </section>
  );
}

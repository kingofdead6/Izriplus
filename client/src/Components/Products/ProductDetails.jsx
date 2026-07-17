import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { store } from "../../store.config.js";

const ACCORDIONS = [
  { title: "Contenu du produit", body: "Le produit correspond aux photos présentées. L'emballage peut varier. Consultez la description pour le détail des éléments inclus." },
  { title: "Garantie & réclamations", body: "En cas de défaut de fabrication, contactez notre équipe avec votre numéro de commande : nous trouvons une solution au cas par cas." },
  { title: "Livraison", body: "Livraison partout en Algérie, paiement à la livraison. Le délai est confirmé avec vous par téléphone après la commande." },
];

// Simple line-art armchair — shown when a product has no photo yet.
const PlaceholderIcon = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.1" opacity="0.5">
    <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
    <path d="M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
    <path d="M4 14a2 2 0 00-2 2v3h2M20 14a2 2 0 012 2v3h-2" />
    <path d="M6 21v-2M18 21v-2" />
  </svg>
);

function PriceBlock({ price }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 13, marginBottom: 22 }}>
      <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 38, background: "linear-gradient(120deg,var(--primary),var(--secondary))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
        {(price || 0).toLocaleString()} DA
      </span>
    </div>
  );
}

function StockBadge({ stock }) {
  if (stock === undefined || stock === null || stock > 4) return null;
  if (stock === 0) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 10, background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.3)", marginBottom: 16 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#dc2626", display: "block" }} />
        <span style={{ fontFamily: "'Inter'", fontSize: 12, color: "#b91c1c", fontWeight: 600 }}>Rupture de stock</span>
      </div>
    );
  }
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 10, background: "rgb(var(--accent-rgb) / .12)", border: "1px solid rgb(var(--accent-rgb) / .4)", marginBottom: 16 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "block", animation: "ringPulse 2s infinite" }} />
      <span style={{ fontFamily: "'Inter'", fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>Plus que {stock} en stock !</span>
    </div>
  );
}

function RelatedCard({ item, onClick }) {
  const cardRef = useRef(null);
  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.transform = `perspective(800px) rotateX(${((e.clientY - rect.top) / rect.height - 0.5) * -6}deg) rotateY(${((e.clientX - rect.left) / rect.width - 0.5) * 6}deg)`;
  };
  const onMouseLeave = () => { if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)"; };

  return (
    <div ref={cardRef} onClick={onClick} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ position: "relative", borderRadius: 20, overflow: "hidden", cursor: "pointer", border: "1px solid var(--line)", background: "var(--surface)", transition: "box-shadow .3s", transformStyle: "preserve-3d" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 26px 48px -24px rgb(var(--primary-rgb) / .3)"}
    >
      <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-soft)" }}>
        {item.images?.[0]?.url
          ? <img src={item.images[0].url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <PlaceholderIcon size={56} />
        }
      </div>
      <div style={{ position: "relative", zIndex: 4, padding: 16 }}>
        <p style={{ fontFamily: "'Inter'", fontSize: 11, color: "var(--muted)", margin: "0 0 4px" }}>{item.category?.name || ""}</p>
        <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 16, margin: "0 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--ink)" }}>{item.name}</h3>
        <p style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 15, color: "var(--secondary)", margin: 0 }}>{(item.price || 0).toLocaleString()} DA</p>
      </div>
    </div>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [related, setRelated] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setSelectedImg(0);
    axios.get(`${API_BASE_URL}/products/${id}`)
      .then(r => {
        setItem(r.data);
        const catId = r.data.category?._id;
        if (catId) {
          axios.get(`${API_BASE_URL}/products`)
            .then(r2 => setRelated((r2.data || []).filter(a => a.category?._id === catId && a._id !== id).slice(0, 4)))
            .catch(() => {});
        }
      })
      .catch(() => toast.error("Meuble introuvable"))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!item) return;
    const cartItem = { productId: item._id, name: item.name, price: item.price, image: item.images?.[selectedImg]?.url, quantity: 1, addedAt: new Date().toISOString() };
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex(i => i.productId === cartItem.productId);
    if (idx !== -1) cart[idx].quantity += 1;
    else cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Ajouté au panier !");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const onTilt = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.transform = `rotateX(${((e.clientY - rect.top) / rect.height - 0.5) * -5}deg) rotateY(${((e.clientX - rect.left) / rect.width - 0.5) * 5}deg)`;
  };
  const onTiltLeave = () => { if (cardRef.current) cardRef.current.style.transform = "rotateX(0) rotateY(0)"; };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Playfair Display'", fontSize: 22, color: "var(--secondary)", animation: "glowPulse 1.5s infinite" }}>Chargement du produit…</p>
    </div>
  );
  if (!item) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Playfair Display'", fontSize: 22, color: "var(--muted)" }}>Meuble introuvable.</p>
    </div>
  );

  const images = item.images || [];
  const specs = [
    item.material && { label: "Matériau", value: item.material },
    item.dimensions && { label: "Dimensions", value: item.dimensions },
  ].filter(Boolean);

  return (
    <div style={{ animation: "fadeIn .5s", maxWidth: 1280, margin: "0 auto", padding: "34px 26px 80px" }}>
      <button onClick={() => navigate("/products")}
        style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 7, transition: "color .2s" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
      >← Retour aux meubles</button>

      <div style={{ display: "flex", gap: 46, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Gallery */}
        <div style={{ flex: "0 0 500px", minWidth: 300, maxWidth: 560, position: "sticky", top: 96, animation: "fadeUp .6s both" }}>
          <div ref={cardRef} onMouseMove={onTilt} onMouseLeave={onTiltLeave}
            style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: "1px solid var(--line)", background: "var(--surface-soft)", height: 520, display: "flex", alignItems: "center", justifyContent: "center", transformStyle: "preserve-3d", transition: "transform .25s" }}
          >
            {images.length > 0 ? (
              <img src={images[selectedImg]?.url} alt={item.name}
                style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", objectFit: "cover", transition: "opacity .25s" }}
              />
            ) : (
              <PlaceholderIcon size={140} />
            )}
          </div>
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  style={{ width: 72, height: 72, borderRadius: 14, cursor: "pointer", overflow: "hidden", border: `2px solid ${i === selectedImg ? "var(--secondary)" : "var(--line)"}`, transition: "all .25s", padding: 0, background: "var(--surface)" }}
                >
                  <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 300, animation: "fadeUp .6s both .08s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            {item.category?.name && (
              <span style={{ fontFamily: "'Inter'", fontWeight: 600, fontSize: 12, padding: "5px 11px", borderRadius: 8, background: "rgb(var(--secondary-rgb) / .1)", border: "1px solid rgb(var(--secondary-rgb) / .3)", color: "var(--primary)" }}>{item.category.name}</span>
            )}
            {(item.stock === undefined || item.stock > 4) && (
              <span style={{ fontFamily: "'Inter'", fontSize: 12, color: "#3f7d4a", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ba05a", animation: "ringPulse 2s infinite", display: "block" }} />
                En stock
              </span>
            )}
          </div>

          <h1 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.01em", lineHeight: 1.1, margin: "0 0 12px", color: "var(--ink)" }}>{item.name}</h1>

          {item.description && (
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 18px" }}>{item.description}</p>
          )}

          {specs.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
              {specs.map(s => (
                <div key={s.label} style={{ padding: "9px 14px", borderRadius: 11, background: "var(--surface-soft)", border: "1px solid var(--line)" }}>
                  <span style={{ fontFamily: "'Inter'", fontSize: 11, color: "var(--muted)", display: "block", marginBottom: 2 }}>{s.label}</span>
                  <span style={{ fontFamily: "'Inter'", fontSize: 13.5, color: "var(--ink)", fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}

          <StockBadge stock={item.stock} />
          <PriceBlock price={item.price} />

          <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <button onClick={addToCart} disabled={item.stock === 0} className="nv-mag-btn"
              style={{ flex: 1, minWidth: 180, padding: 17, border: "none", borderRadius: 15, background: added ? "linear-gradient(135deg,#3f7d4a,#2d5c37)" : item.stock === 0 ? "var(--surface-soft)" : "linear-gradient(135deg,var(--secondary),var(--primary))", color: item.stock === 0 ? "var(--muted)" : "#fff", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16.5, cursor: item.stock === 0 ? "not-allowed" : "pointer", boxShadow: item.stock === 0 ? "none" : "0 16px 36px -16px rgb(var(--primary-rgb) / .5)", transition: "background .4s" }}
            >
              {item.stock === 0 ? "Rupture de stock" : added ? "✓ Ajouté !" : "Ajouter au panier"}
            </button>
            <a href={`https://wa.me/${store.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="nv-mag-btn"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "17px 24px", border: "1px solid rgba(52,163,86,.4)", borderRadius: 15, background: "rgba(52,163,86,.08)", color: "#2d6b3a", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, cursor: "pointer", textDecoration: "none" }}
            >
              WhatsApp
            </a>
          </div>
          <p style={{ fontFamily: "'Inter'", fontSize: 12.5, color: "var(--muted)", margin: "0 0 26px" }}>
            Livraison partout en Algérie · Paiement à la livraison
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ACCORDIONS.map((acc, i) => (
              <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", background: "var(--surface)" }}>
                <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", background: "none", border: "none", cursor: "pointer", color: "var(--ink)", fontFamily: "'Inter'", fontWeight: 600, fontSize: 15.5, textAlign: "left" }}
                >
                  {acc.title}
                  <span style={{ fontSize: 18, color: "var(--secondary)", transition: "transform .3s", transform: openAccordion === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {openAccordion === i && (
                  <div style={{ padding: "0 18px 18px", color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, animation: "fadeUp .3s" }}>{acc.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 27, letterSpacing: "-.01em", margin: "0 0 22px", color: "var(--ink)" }}>Vous aimerez aussi</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 18 }}>
            {related.map(a => <RelatedCard key={a._id} item={a} onClick={() => navigate(`/products/${a._id}`)} />)}
          </div>
        </section>
      )}
    </div>
  );
}
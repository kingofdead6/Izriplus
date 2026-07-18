import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { store } from "../../store.config.js";
import { ProductCard } from "../Home/BestSellers";

const ACCORDIONS = [
  { title: "Contenu du produit", body: "Le produit correspond aux photos présentées. L'emballage peut varier. Consultez la description pour le détail des éléments inclus." },
  { title: "Garantie & réclamations", body: "En cas de défaut de fabrication, contactez notre équipe avec votre numéro de commande : nous trouvons une solution au cas par cas." },
  { title: "Livraison", body: "Livraison partout en Algérie, paiement à la livraison. Le délai est confirmé avec vous par téléphone après la commande." },
];

const PlaceholderIcon = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.1" opacity="0.5">
    <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5zM6 21v-2M18 21v-2" />
  </svg>
);

const IconWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.13c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99s.75-2.12 1.01-2.41c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.95 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
  </svg>
);

function StockBadge({ stock }) {
  if (stock === undefined || stock === null || stock > 4) return null;
  if (stock === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] mb-4" style={{ background: "rgba(190,40,30,.07)", border: "1px solid rgba(190,40,30,.28)" }}>
        <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#b91c1c" }} />
        <span className="text-[12.5px] font-semibold" style={{ color: "#b91c1c" }}>Rupture de stock</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] mb-4" style={{ background: "rgb(var(--accent-rgb) / .12)", border: "1px solid rgb(var(--accent-rgb) / .4)" }}>
      <span className="w-[7px] h-[7px] rounded-full" style={{ background: "var(--accent)" }} />
      <span className="text-[12.5px] font-semibold" style={{ color: "var(--primary)" }}>Plus que {stock} en stock</span>
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

  useEffect(() => {
    setLoading(true);
    setSelectedImg(0);
    window.scrollTo(0, 0);
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

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <p style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "var(--muted)" }}>Chargement du produit…</p>
    </div>
  );
  if (!item) return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <p style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: "var(--muted)" }}>Meuble introuvable.</p>
    </div>
  );

  const images = item.images || [];
  const specs = [
    item.material && { label: "Matériau", value: item.material },
    item.dimensions && { label: "Dimensions", value: item.dimensions },
  ].filter(Boolean);

  return (
    <main style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-8 pb-20 md:pt-10 md:pb-28" style={{ animation: "fadeIn .5s" }}>
        <button onClick={() => navigate("/products")} className="nv-link mb-8 md:mb-10">
          <span className="nv-link__arrow" style={{ transform: "scaleX(-1)" }}>→</span> Retour aux meubles
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 self-start w-full" style={{ animation: "fadeUp .6s both" }}>
            <div className="nv-media relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[6px] overflow-hidden border border-[var(--line)] bg-[var(--surface-soft)] flex items-center justify-center">
              {images.length > 0 ? (
                <img src={images[selectedImg]?.url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <PlaceholderIcon size={120} />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2.5 sm:gap-3 mt-3.5 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className="shrink-0 w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[5px] overflow-hidden p-0 cursor-pointer transition-all"
                    style={{ border: `2px solid ${i === selectedImg ? "var(--ink)" : "var(--line)"}`, background: "var(--surface)" }}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="w-full" style={{ animation: "fadeUp .6s both .08s" }}>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {item.category?.name && (
                <span className="text-[11px] font-semibold uppercase tracking-[.12em] px-3 py-1.5 rounded-full" style={{ background: "rgb(var(--secondary-rgb) / .1)", border: "1px solid rgb(var(--secondary-rgb) / .3)", color: "var(--primary)" }}>
                  {item.category.name}
                </span>
              )}
              {(item.stock === undefined || item.stock > 4) && (
                <span className="text-[12.5px] font-semibold inline-flex items-center gap-2" style={{ color: "#3f7d4a" }}>
                  <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#4ba05a" }} />
                  En stock
                </span>
              )}
            </div>

            <h1 className="text-ink m-0 mb-4" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(30px,5vw,50px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              {item.name}
            </h1>

            <p className="m-0 mb-6 text-ink" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 28 }}>
              {(item.price || 0).toLocaleString()} DA
            </p>

            {item.description && (
              <p className="text-[15.5px] sm:text-[16px] leading-[1.7] text-[var(--muted)] m-0 mb-7">{item.description}</p>
            )}

            {specs.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mb-7">
                {specs.map(s => (
                  <div key={s.label} className="px-3.5 py-2.5 rounded-[5px]" style={{ background: "var(--surface-soft)", border: "1px solid var(--line)" }}>
                    <span className="block text-[10.5px] uppercase tracking-[.1em] text-[var(--muted)] mb-1">{s.label}</span>
                    <span className="text-[13.5px] text-ink font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            <StockBadge stock={item.stock} />

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={addToCart}
                disabled={item.stock === 0}
                className="nv-btn flex-1"
                style={{
                  background: added ? "#3f7d4a" : item.stock === 0 ? "var(--surface-soft)" : "var(--ink)",
                  color: item.stock === 0 ? "var(--muted)" : "var(--bg)",
                  cursor: item.stock === 0 ? "not-allowed" : "pointer",
                }}
              >
                {item.stock === 0 ? "Rupture de stock" : added ? "✓ Ajouté au panier" : "Ajouter au panier"}
              </button>
              <a
                href={`https://wa.me/${store.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nv-btn no-underline"
                style={{ background: "#25D366", color: "#0b3d1e" }}
              >
                <IconWhatsapp /> WhatsApp
              </a>
            </div>
            <p className="text-[12.5px] text-[var(--muted)] m-0 mb-9">
              Livraison partout en Algérie · Paiement à la livraison
            </p>

            <div className="flex flex-col">
              {ACCORDIONS.map((acc, i) => (
                <div key={i} className="border-t border-[var(--line)] last:border-b">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-4 bg-transparent border-none cursor-pointer text-left"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15 }}
                  >
                    {acc.title}
                    <span className="text-[20px] leading-none shrink-0 transition-transform duration-300" style={{ color: "var(--secondary)", transform: openAccordion === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                  </button>
                  {openAccordion === i && (
                    <div className="pb-4 text-[var(--muted)] text-[14.5px] leading-[1.7]" style={{ animation: "fadeUp .3s" }}>{acc.body}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 md:mt-28 pt-16 border-t border-[var(--line)]">
            <h2 className="text-ink m-0 mb-9" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(26px,3.4vw,40px)", letterSpacing: "-0.02em" }}>
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(a => (
                <ProductCard key={a._id} product={a} onClick={() => navigate(`/products/${a._id}`)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

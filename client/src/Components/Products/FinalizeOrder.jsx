import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../api";
import { toast } from "react-toastify";
import { CheckCircle, ArrowLeft } from "lucide-react";

const inputStyle = {
  width: "100%",
  padding: "15px 18px",
  background: "var(--surface-soft)",
  border: "1px solid var(--line)",
  borderRadius: 13,
  fontSize: 15.5,
  color: "var(--ink)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
  transition: "border-color .2s",
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontSize: 12.5,
  fontWeight: 700,
  color: "var(--muted)",
  fontFamily: "'Inter', sans-serif",
  letterSpacing: ".06em",
  textTransform: "uppercase",
};

// Simple line-art armchair — shown when an order item has no photo.
const PlaceholderIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.3" opacity="0.5">
    <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
    <path d="M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
    <path d="M4 14a2 2 0 00-2 2v3h2M20 14a2 2 0 012 2v3h-2" />
    <path d="M6 21v-2M18 21v-2" />
  </svg>
);

export default function FinalizeOrder() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [availableWilayas, setAvailableWilayas] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    customerEmail: "",
    wilaya: "",
    desk: "",
    address: "",
    deliveryType: "desk",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart || savedCart === "[]") {
      toast.error("Votre panier est vide");
      navigate("/cart");
      return;
    }
    setCartItems(JSON.parse(savedCart));
  }, [navigate]);

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/delivery-areas`);
        setAvailableWilayas(res.data.areas || []);
      } catch (err) {
        toast.error("Impossible de charger les zones de livraison");
      }
    };
    fetchWilayas();
  }, []);

  useEffect(() => {
    if (!form.wilaya) {
      setDeliveryPrice(null);
      return;
    }
    const selected = availableWilayas.find(w => w.wilaya === form.wilaya);
    if (selected) {
      setDeliveryPrice(form.deliveryType === "home" ? selected.priceHome : selected.priceDesk);
    }
  }, [form.wilaya, form.deliveryType, availableWilayas]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithDelivery = deliveryPrice !== null ? subtotal + deliveryPrice : subtotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/orders/create`, {
        ...form,
        deliveryPrice,
        items: cartItems,
      });
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Commande enregistrée !");
      setIsSuccess(true);
      setTimeout(() => navigate("/products"), 4000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Échec de la commande. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const desks = availableWilayas.find(w => w.wilaya === form.wilaya)?.desks || [];
  const isDisabled = loading || !form.wilaya || (form.deliveryType === "desk" && !form.desk);

  const onFocus = e => (e.target.style.borderColor = "rgb(var(--secondary-rgb) / .6)");
  const onBlur = e => (e.target.style.borderColor = "var(--line)");

  if (isSuccess) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "var(--surface)", border: "1px solid rgb(var(--secondary-rgb) / .3)", borderRadius: 24, padding: "56px 44px", maxWidth: 420, textAlign: "center", animation: "scaleIn .5s both" }}>
          <CheckCircle style={{ width: 72, height: 72, color: "var(--secondary)", margin: "0 auto 22px" }} />
          <h1 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 32, color: "var(--ink)", margin: "0 0 12px" }}>
            Commande confirmée !
          </h1>
          <p style={{ fontSize: 15.5, color: "var(--muted)", margin: 0, fontFamily: "'Inter'", lineHeight: 1.6 }}>
            Notre équipe vous contacte très prochainement pour confirmer les détails et la livraison.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: 60, paddingBottom: 80, paddingLeft: 20, paddingRight: 20, animation: "fadeIn .5s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <Link
          to="/cart"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--muted)", textDecoration: "none", marginBottom: 28, fontSize: 15, fontFamily: "'Inter'", fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Retour au panier
        </Link>

        <h1 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: "clamp(28px,5vw,46px)", color: "var(--ink)", margin: "0 0 36px", letterSpacing: "-.01em" }}>
          Finaliser la commande
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30, alignItems: "start" }}>

          {/* Form Card */}
          <div style={{ gridColumn: "span 2", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 20, padding: 34 }}>
            <h2 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: "0 0 26px" }}>
              Vos informations
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div>
                <label style={labelStyle}>Nom complet *</label>
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  required
                  value={form.customerName}
                  onChange={e => setForm({ ...form, customerName: e.target.value })}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Numéro de téléphone *</label>
                <input
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Adresse email *</label>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  value={form.customerEmail}
                  onChange={e => setForm({ ...form, customerEmail: e.target.value })}
                  style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Wilaya *</label>
                <select
                  required
                  value={form.wilaya}
                  onChange={e => setForm({ ...form, wilaya: e.target.value, desk: "" })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={onFocus} onBlur={onBlur}
                >
                  <option value="">Choisissez votre wilaya</option>
                  {availableWilayas.map(w => (
                    <option key={w.wilaya} value={w.wilaya}>{w.wilaya}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Mode de livraison</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { value: "desk", label: "Point de retrait" },
                    { value: "home", label: "Livraison à domicile" },
                  ].map(opt => {
                    const active = form.deliveryType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm({ ...form, deliveryType: opt.value, desk: "" })}
                        style={{
                          padding: "14px 16px",
                          borderRadius: 12,
                          border: `1px solid ${active ? "rgb(var(--secondary-rgb) / .7)" : "var(--line)"}`,
                          background: active ? "rgb(var(--secondary-rgb) / .12)" : "var(--surface-soft)",
                          color: active ? "var(--primary)" : "var(--muted)",
                          fontFamily: "'Inter'",
                          fontWeight: 600,
                          fontSize: 14.5,
                          cursor: "pointer",
                          transition: "all .2s",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {form.deliveryType === "desk" && desks.length > 0 && (
                <div>
                  <label style={labelStyle}>Point de retrait *</label>
                  <select
                    required
                    value={form.desk}
                    onChange={e => setForm({ ...form, desk: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={onFocus} onBlur={onBlur}
                  >
                    <option value="">Choisissez un point de retrait</option>
                    {desks.map((d, i) => (
                      <option key={i} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {form.deliveryType === "home" && (
                <div>
                  <label style={labelStyle}>Adresse complète *</label>
                  <textarea
                    placeholder="Rue, immeuble, étage…"
                    required
                    rows={4}
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isDisabled}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: isDisabled
                    ? "var(--surface-soft)"
                    : "linear-gradient(135deg,var(--secondary),var(--primary))",
                  color: isDisabled ? "var(--muted)" : "#fff",
                  fontFamily: "'Inter'",
                  fontWeight: 700,
                  fontSize: 16.5,
                  borderRadius: 14,
                  border: isDisabled ? "1px solid var(--line)" : "none",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  boxShadow: isDisabled ? "none" : "0 14px 34px -14px rgb(var(--primary-rgb) / .5)",
                  transition: "all .25s",
                  marginTop: 8,
                }}
              >
                {loading
                  ? "Commande en cours…"
                  : `Confirmer la commande — ${totalWithDelivery.toLocaleString()} DA`}
              </button>

              <p style={{ fontFamily: "'Inter'", fontSize: 12.5, color: "var(--muted)", margin: 0, textAlign: "center" }}>
                Paiement à la livraison · Aucun paiement en ligne
              </p>
            </form>
          </div>

          {/* Order Summary Card */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 20, padding: 26, position: "sticky", top: 96 }}>
            <h2 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: "0 0 20px" }}>
              Récapitulatif
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {cartItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "16px 0",
                    borderBottom: i < cartItems.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "var(--surface-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <PlaceholderIcon />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 14.5, color: "var(--ink)", margin: "0 0 4px", lineHeight: 1.3 }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, fontFamily: "'Inter'" }}>Qté : {item.quantity}</p>
                  </div>
                  <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14.5, color: "var(--secondary)", margin: 0, whiteSpace: "nowrap" }}>
                    {(item.price * item.quantity).toLocaleString()} DA
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 12, fontFamily: "'Inter'" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, color: "var(--muted)" }}>
                <span>Sous-total</span>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{subtotal.toLocaleString()} DA</span>
              </div>

              {deliveryPrice !== null ? (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, color: "var(--muted)" }}>
                  <span>Livraison ({form.wilaya})</span>
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>{deliveryPrice.toLocaleString()} DA</span>
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>
                  Choisissez votre wilaya pour calculer les frais de livraison.
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--line)", fontSize: 19, fontWeight: 700 }}>
                <span style={{ color: "var(--ink)" }}>Total</span>
                <span style={{ color: "var(--secondary)", fontFamily: "'Fraunces'" }}>{totalWithDelivery.toLocaleString()} DA</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Simple line-art armchair — shown when a cart item has no photo.
const PlaceholderIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.3" opacity="0.5">
    <path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />
    <path d="M4 11h16v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
    <path d="M4 14a2 2 0 00-2 2v3h2M20 14a2 2 0 012 2v3h-2" />
    <path d="M6 21v-2M18 21v-2" />
  </svg>
);

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (productId, change) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.productId === productId) {
            const newQty = item.quantity + change;
            return newQty >= 1 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter(item => item.quantity >= 1)
    );
  };

  const removeItem = (productId) => {
    setCartItems(prev =>
      prev.filter(item => item.productId !== productId)
    );
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: "70vh", paddingTop: 80, paddingBottom: 80, paddingLeft: 20, paddingRight: 20, textAlign: "center", animation: "fadeIn .5s" }}>
        <Link
          to="/products"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--muted)", textDecoration: "none", marginBottom: 36, fontSize: 15, fontFamily: "'Inter'", fontWeight: 600 }}
        >
          <ArrowLeft size={20} /> Retour à la boutique
        </Link>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <PlaceholderIcon size={72} />
        </div>
        <h1 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: "clamp(28px,5vw,46px)", color: "var(--ink)", marginTop: 0, marginBottom: 32 }}>
          Votre panier est vide
        </h1>
        <Link
          to="/products"
          style={{ display: "inline-block", padding: "16px 32px", background: "linear-gradient(135deg,var(--secondary),var(--primary))", color: "#fff", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, borderRadius: 14, textDecoration: "none", boxShadow: "0 14px 32px -12px rgb(var(--primary-rgb) / .5)" }}
        >
          Découvrir nos meubles
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: 60, paddingBottom: 100, animation: "fadeIn .5s" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 34 }}>
          <Link to="/products" style={{ color: "var(--muted)", textDecoration: "none", display: "flex" }}>
            <ArrowLeft size={26} />
          </Link>
          <h1 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: "clamp(26px,5vw,44px)", color: "var(--ink)", margin: 0 }}>
            Votre panier ({cartItems.length})
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32 }}>
          {/* Cart Items */}
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 14 }}>
            {cartItems.map(item => (
              <div
                key={item.productId}
                style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20, padding: 18, flexWrap: "wrap" }}>
                  <Link to={`/products/${item.productId}`}>
                    <div style={{ width: 96, height: 96, borderRadius: 14, overflow: "hidden", flexShrink: 0, background: "var(--surface-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <PlaceholderIcon />
                      }
                    </div>
                  </Link>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 17, color: "var(--ink)", margin: "0 0 12px" }}>
                      {item.name}
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface-soft)", color: "var(--ink)", fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >−</button>
                      <span style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", width: 32, textAlign: "center", fontFamily: "'Inter'" }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface-soft)", color: "var(--ink)", fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >+</button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <p style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 20, color: "var(--secondary)", margin: 0 }}>
                        {(item.price * item.quantity).toLocaleString()} DA
                      </p>
                      <button
                        onClick={() => removeItem(item.productId)}
                        style={{ fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Inter'" }}
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 20, padding: 28, alignSelf: "start", gridColumn: "1 / -1", maxWidth: 420, marginLeft: "auto", width: "100%" }}>
            <h3 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 21, color: "var(--ink)", margin: "0 0 22px" }}>
              Récapitulatif
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15.5, color: "var(--muted)", fontFamily: "'Inter'" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Sous-total</span>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{subtotal.toLocaleString()} DA</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                Les frais de livraison sont calculés à l'étape suivante selon votre wilaya.
              </p>
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>
                <span>Total</span>
                <span style={{ color: "var(--secondary)", fontFamily: "'Fraunces'" }}>{subtotal.toLocaleString()} DA</span>
              </div>
            </div>

            <Link to="/checkout" style={{ display: "block", marginTop: 26 }}>
              <button style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,var(--secondary),var(--primary))", color: "#fff", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16.5, borderRadius: 14, border: "none", cursor: "pointer", boxShadow: "0 14px 34px -14px rgb(var(--primary-rgb) / .55)" }}>
                Passer la commande
              </button>
            </Link>

            <Link
              to="/products"
              style={{ display: "block", textAlign: "center", marginTop: 16, color: "var(--muted)", textDecoration: "none", fontSize: 14, fontFamily: "'Inter'" }}
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
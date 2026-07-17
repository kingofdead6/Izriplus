import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify";
import { store } from "../store.config.js";

const IconPhone = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
  </svg>
);
const IconMail = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" />
  </svg>
);
const IconPin = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/contact`, form);
      toast.success("Message envoyé ! Nous vous répondrons rapidement.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Échec de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    background: "var(--surface)", border: "1px solid var(--line)",
    color: "var(--ink)", fontFamily: "'Inter'", fontSize: 15, outline: "none",
    transition: "border-color .2s", boxSizing: "border-box",
  };

  const onFocus = e => (e.target.style.borderColor = "rgb(var(--secondary-rgb) / .6)");
  const onBlur = e => (e.target.style.borderColor = "var(--line)");

  return (
    <main style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "70px 26px 100px" }}>
        {/* Header */}
        <div style={{ marginBottom: 46, animation: "fadeUp .6s both" }}>
          <p style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: "var(--secondary)", margin: "0 0 14px", textTransform: "uppercase" }}>
            Contact
          </p>
          <h1 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(32px,5vw,52px)", letterSpacing: "-.01em", margin: "0 0 16px", lineHeight: 1.1, color: "var(--ink)" }}>
            Parlons de votre projet
          </h1>
          <p style={{ fontFamily: "'Inter'", fontSize: 16, color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>
            Une question sur un meuble, un devis ou une livraison ? Écrivez-nous, notre équipe vous répond rapidement.
          </p>
        </div>

        {/* Contact Info Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 38 }}>
          {[
            { Icon: IconPhone, label: "Téléphone", value: store.contact.phone, href: `tel:${store.contact.phoneHref}` },
            { Icon: IconMail, label: "Email", value: store.contact.email, href: `mailto:${store.contact.email}` },
            { Icon: IconPin, label: "Adresse", value: store.contact.address, href: null },
          ].map(({ Icon, label, value, href }) => {
            const inner = (
              <>
                <Icon />
                <div>
                  <p style={{ fontFamily: "'Inter'", fontSize: 11, color: "var(--muted)", margin: "0 0 4px", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600 }}>{label}</p>
                  <p style={{ fontFamily: "'Inter'", fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: 0 }}>{value}</p>
                </div>
              </>
            );
            const boxStyle = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start", textDecoration: "none" };
            return href
              ? <a key={label} href={href} style={boxStyle}>{inner}</a>
              : <div key={label} style={boxStyle}>{inner}</div>;
          })}
        </div>

        {/* WhatsApp shortcut — most Algerian customers prefer this over email */}
        <a
          href={`https://wa.me/${store.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "15px 24px", marginBottom: 38, borderRadius: 14,
            border: "1px solid rgba(52,163,86,.4)", background: "rgba(52,163,86,.08)",
            color: "#2d6b3a", fontFamily: "'Inter'", fontWeight: 700, fontSize: 15.5,
            textDecoration: "none", transition: "background .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(52,163,86,.15)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(52,163,86,.08)")}
        >
          Écrire directement sur WhatsApp
        </a>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 26,
            padding: "38px 34px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 16 }}>
            <input
              type="text" placeholder="Nom complet *" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle} onFocus={onFocus} onBlur={onBlur}
            />
            <input
              type="email" placeholder="Adresse email *" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle} onFocus={onFocus} onBlur={onBlur}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 16 }}>
            <input
              type="tel" placeholder="Numéro de téléphone"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              style={inputStyle} onFocus={onFocus} onBlur={onBlur}
            />
            <input
              type="text" placeholder="Objet *" required
              value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
              style={inputStyle} onFocus={onFocus} onBlur={onBlur}
            />
          </div>
          <textarea
            placeholder="Votre message *" rows={6} required
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, resize: "vertical", marginBottom: 24, lineHeight: 1.6 }}
            onFocus={onFocus} onBlur={onBlur}
          />
          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "17px 32px", borderRadius: 15, border: "none",
              background: "linear-gradient(135deg,var(--secondary),var(--primary))", color: "#fff",
              fontFamily: "'Inter'", fontWeight: 700, fontSize: 16.5,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 12px 30px -10px rgb(var(--primary-rgb) / .55)",
              transition: "transform .2s,box-shadow .2s",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading ? "Envoi en cours…" : "Envoyer le message"}
          </button>
        </form>
      </section>
    </main>
  );
}
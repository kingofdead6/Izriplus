import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify";
import { store } from "../store.config.js";
import Reveal from "../Components/Shared/Reveal";

const IconPhone = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
  </svg>
);
const IconMail = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" />
  </svg>
);
const IconPin = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconWhatsapp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.13c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99s.75-2.12 1.01-2.41c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.95 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
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
    transition: "border-color .2s, box-shadow .2s", boxSizing: "border-box",
  };

  const onFocus = e => {
    e.target.style.borderColor = "rgb(var(--secondary-rgb) / .6)";
    e.target.style.boxShadow = "0 0 0 4px rgb(var(--secondary-rgb) / .1)";
  };
  const onBlur = e => {
    e.target.style.borderColor = "var(--line)";
    e.target.style.boxShadow = "none";
  };

  const CONTACT_ITEMS = [
    { Icon: IconPhone, label: "Téléphone", value: store.contact.phone, href: `tel:${store.contact.phoneHref}` },
    { Icon: IconMail, label: "Email", value: store.contact.email, href: `mailto:${store.contact.email}` },
    { Icon: IconPin, label: "Adresse", value: store.contact.address, href: null },
  ];

  return (
    <main style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 26px 100px" }}>
        {/* Header */}
        <Reveal as="div" style={{ textAlign: "center", marginBottom: 52, maxWidth: 680, marginInline: "auto" }}>
          <span className="nv-eyebrow nv-eyebrow--center" style={{ display: "inline-flex", marginBottom: 16 }}>Contact</span>
          <h1 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(34px,5.4vw,58px)", letterSpacing: "-.02em", margin: "12px 0 18px", lineHeight: 1.06, color: "var(--ink)" }}>
            Parlons de votre <span className="nv-gradient-text italic">projet</span>
          </h1>
          <p style={{ fontFamily: "'Inter'", fontSize: 16.5, color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
            Une question sur un meuble, un devis ou une livraison ? Écrivez-nous, notre équipe vous répond rapidement.
          </p>
        </Reveal>

        {/* Split layout: info panel + form */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)", gap: 26, alignItems: "start" }} className="contact-grid">
          {/* Left — dark info panel */}
          <Reveal variant="left" as="aside"
            style={{
              position: "relative", borderRadius: 28, overflow: "hidden",
              background: "linear-gradient(160deg,#4A2F1B,#5A3A22 55%,#6B4226)",
              padding: "40px 34px",
              boxShadow: "0 40px 80px -40px rgb(var(--primary-rgb) / .7)",
            }}
          >
            <div style={{ position: "absolute", top: "-30%", right: "-20%", width: "70%", height: "80%", background: "radial-gradient(circle,rgb(var(--secondary-rgb) / .5),transparent 65%)", filter: "blur(46px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 24, color: "#fff", margin: "0 0 10px" }}>Nos coordonnées</h2>
              <p style={{ fontFamily: "'Inter'", fontSize: 14.5, color: "rgba(255,255,255,.78)", margin: "0 0 30px", lineHeight: 1.6 }}>
                Passez à l'atelier ou joignez-nous directement.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CONTACT_ITEMS.map(({ Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", shrink: 0, flexShrink: 0 }}>
                        <Icon />
                      </span>
                      <div>
                        <p style={{ fontFamily: "'Inter'", fontSize: 10.5, color: "rgba(255,255,255,.6)", margin: "0 0 4px", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>{label}</p>
                        <p style={{ fontFamily: "'Inter'", fontSize: 14.5, fontWeight: 600, color: "#fff", margin: 0 }}>{value}</p>
                      </div>
                    </>
                  );
                  const boxStyle = { display: "flex", gap: 15, alignItems: "center", padding: "13px 14px", borderRadius: 16, textDecoration: "none", transition: "background .2s" };
                  return href ? (
                    <a key={label} href={href} style={boxStyle}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.07)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >{inner}</a>
                  ) : (
                    <div key={label} style={boxStyle}>{inner}</div>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${store.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nv-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "15px 24px", marginTop: 26, borderRadius: 14,
                  background: "#25D366", color: "#0b3d1e",
                  fontFamily: "'Inter'", fontWeight: 700, fontSize: 15,
                  textDecoration: "none", boxShadow: "0 16px 30px -14px rgba(37,211,102,.7)",
                }}
              >
                <IconWhatsapp /> Écrire sur WhatsApp
              </a>

              {/* social */}
              <div style={{ display: "flex", gap: 12, marginTop: 26, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.14)" }}>
                {store.social.instagram && (
                  <a href={store.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                  </a>
                )}
                {store.social.facebook && (
                  <a href={store.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal variant="right" as="form"
            onSubmit={handleSubmit}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 28,
              padding: "38px 34px",
              boxShadow: "0 30px 70px -44px rgb(var(--primary-rgb) / .5)",
            }}
          >
            <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 24, color: "var(--ink)", margin: "0 0 6px" }}>Envoyez-nous un message</h2>
            <p style={{ fontFamily: "'Inter'", fontSize: 14, color: "var(--muted)", margin: "0 0 26px" }}>Les champs marqués d'une * sont obligatoires.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 16 }}>
              <input type="text" placeholder="Nom complet *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              <input type="email" placeholder="Adresse email *" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 16 }}>
              <input type="tel" placeholder="Numéro de téléphone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              <input type="text" placeholder="Objet *" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <textarea placeholder="Votre message *" rows={6} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", marginBottom: 24, lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />
            <button
              type="submit" disabled={loading}
              className="nv-btn"
              style={{
                width: "100%", padding: "17px 32px", borderRadius: 15, border: "none",
                background: "linear-gradient(135deg,var(--secondary),var(--primary))", color: "#fff",
                fontFamily: "'Inter'", fontWeight: 700, fontSize: 16.5,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 16px 34px -12px rgb(var(--primary-rgb) / .6)",
              }}
            >
              {loading ? "Envoi en cours…" : "Envoyer le message →"}
            </button>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

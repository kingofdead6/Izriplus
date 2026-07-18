import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api";
import { toast } from "react-toastify";
import { store } from "../store.config.js";
import Reveal from "../Components/Shared/Reveal";

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" />
  </svg>
);
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconWhatsapp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
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
    width: "100%", padding: "13px 0", borderRadius: 0,
    background: "transparent", border: "none", borderBottom: "1px solid var(--line)",
    color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 15.5, outline: "none",
    transition: "border-color .25s", boxSizing: "border-box",
  };
  const onFocus = e => (e.target.style.borderBottomColor = "var(--ink)");
  const onBlur = e => (e.target.style.borderBottomColor = "var(--line)");

  const CONTACT_ITEMS = [
    { Icon: IconPhone, label: "Téléphone", value: store.contact.phone, href: `tel:${store.contact.phoneHref}` },
    { Icon: IconMail, label: "Email", value: store.contact.email, href: `mailto:${store.contact.email}` },
    { Icon: IconPin, label: "Adresse", value: store.contact.address, href: null },
  ];

  return (
    <main style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
      {/* Header */}
      <section className="border-b border-[var(--line)]">
        <Reveal as="div" className="max-w-[1180px] mx-auto px-6 sm:px-8 pt-20 pb-16 md:pt-28 md:pb-20 max-w-[720px]">
          <span className="nv-eyebrow mb-6">Contact</span>
          <h1 className="text-ink mt-6 mb-5" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(38px,5.4vw,64px)", lineHeight: 1.03, letterSpacing: "-0.02em" }}>
            Parlons de votre <span style={{ fontStyle: "italic" }}>projet</span>
          </h1>
          <p className="text-[var(--muted)] text-[17px] leading-[1.7] m-0 max-w-[540px]">
            Une question sur un meuble, un devis ou une livraison ? Écrivez-nous, notre équipe vous répond
            rapidement.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1180px] mx-auto px-6 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-start">
          {/* Left — info panel (solid espresso) */}
          <Reveal variant="left" as="aside" className="rounded-[6px] p-8 md:p-10" style={{ background: "var(--ink)" }}>
            <h2 className="m-0 mb-2.5" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 23, color: "var(--bg)" }}>Nos coordonnées</h2>
            <p className="m-0 mb-9 text-[14.5px] leading-[1.6]" style={{ color: "rgba(243,238,230,.65)" }}>Passez à l'atelier ou joignez-nous directement.</p>

            <div className="flex flex-col">
              {CONTACT_ITEMS.map(({ Icon, label, value, href }, i) => {
                const inner = (
                  <>
                    <span className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }}><Icon /></span>
                    <div>
                      <p className="m-0 mb-1 text-[10.5px] uppercase" style={{ letterSpacing: ".14em", color: "rgba(243,238,230,.5)" }}>{label}</p>
                      <p className="m-0 text-[15px] font-medium" style={{ color: "var(--bg)" }}>{value}</p>
                    </div>
                  </>
                );
                const cls = `flex gap-4 items-start py-5 ${i > 0 ? "border-t border-white/10" : ""}`;
                return href ? (
                  <a key={label} href={href} className={cls + " no-underline transition-opacity hover:opacity-75"}>{inner}</a>
                ) : (
                  <div key={label} className={cls}>{inner}</div>
                );
              })}
            </div>

            <a
              href={`https://wa.me/${store.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="nv-btn mt-8 w-full no-underline"
              style={{ background: "#25D366", color: "#0b3d1e" }}
            >
              <IconWhatsapp /> Écrire sur WhatsApp
            </a>

            <div className="flex gap-3 mt-8 pt-7 border-t border-white/10">
              {store.social.instagram && (
                <a href={store.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors" style={{ background: "rgba(255,255,255,.08)", color: "var(--bg)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                </a>
              )}
              {store.social.facebook && (
                <a href={store.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors" style={{ background: "rgba(255,255,255,.08)", color: "var(--bg)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                </a>
              )}
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal variant="right" as="form" onSubmit={handleSubmit}>
            <h2 className="m-0 mb-1.5 text-ink" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 24 }}>Envoyez-nous un message</h2>
            <p className="m-0 mb-9 text-[14px] text-[var(--muted)]">Les champs marqués d'une * sont obligatoires.</p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              <input type="text" placeholder="Nom complet *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              <input type="email" placeholder="Adresse email *" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              <input type="tel" placeholder="Numéro de téléphone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              <input type="text" placeholder="Objet *" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <textarea placeholder="Votre message *" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", marginTop: 28, lineHeight: 1.6 }} onFocus={onFocus} onBlur={onBlur} />

            <button type="submit" disabled={loading} className="nv-btn nv-btn-solid mt-10 px-10" style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Envoi en cours…" : "Envoyer le message"}
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

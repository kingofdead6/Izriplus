import { Link } from "react-router-dom";
import { store } from "../../store.config.js";

const linkStyle = {
  fontSize: 14, color: "var(--muted)", textDecoration: "none", transition: "color .2s",
};

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
    >
      {children}
    </Link>
  );
}

// Minimal line icons — kept local so the footer has no external icon
// dependency beyond what's already in package.json.
const SocialIcon = ({ type }) => {
  if (type === "instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 8h-2a2 2 0 00-2 2v3H9v3h2v6h3v-6h2.2l.8-3H14v-2a1 1 0 011-1h2V8z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
      <path d="M15 8.5V6a3 3 0 013-3h1v3h-1a1 1 0 00-1 1v1.5h2l-.4 3H17V21h-3v-9.5H12V8.5h2z" />
    </svg>
  );
};

export default function Footer() {
  const socialLinks = [
    store.social.instagram && { type: "instagram", href: store.social.instagram },
    store.social.facebook && { type: "facebook", href: store.social.facebook },
    store.social.tiktok && { type: "tiktok", href: store.social.tiktok },
  ].filter(Boolean);

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", padding: "64px 26px 32px", marginTop: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 44, marginBottom: 56 }}>

          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,var(--secondary),var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ width: 13, height: 13, borderRadius: 3, background: "var(--surface)", transform: "rotate(45deg)", display: "block" }} />
              </span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 20, letterSpacing: "-.01em", color: "var(--ink)" }}>
                {store.brand.name}<span style={{ color: "var(--secondary)" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", margin: "0 0 18px" }}>
              {store.brand.tagline}
            </p>
            {socialLinks.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {socialLinks.map(({ type, href }) => (
                  <a
                    key={type}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: 34, height: 34, borderRadius: 10, background: "var(--surface-soft)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", cursor: "pointer" }}
                  >
                    <SocialIcon type={type} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Boutique */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", color: "var(--ink)", margin: "0 0 18px", textTransform: "uppercase" }}>Boutique</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <FooterLink to="/">Accueil</FooterLink>
              <FooterLink to="/products">Nos Meubles</FooterLink>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", color: "var(--ink)", margin: "0 0 18px", textTransform: "uppercase" }}>Services</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <FooterLink to="/contact">Nous Contacter</FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", color: "var(--ink)", margin: "0 0 18px", textTransform: "uppercase" }}>Contact</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "var(--muted)" }}>
              <a href={`tel:${store.contact.phoneHref}`} style={{ color: "var(--muted)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {store.contact.phone}
              </a>
              <a href={`mailto:${store.contact.email}`} style={{ color: "var(--muted)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {store.contact.email}
              </a>
              <span>{store.contact.address}</span>
            </div>
          </div>

          {/* CTA Card */}
          <div style={{ background: "linear-gradient(135deg,rgb(var(--primary-rgb) / .1),rgb(var(--secondary-rgb) / .08))", border: "1px solid rgb(var(--secondary-rgb) / .25)", borderRadius: 20, padding: "26px 24px" }}>
            <p style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 16, margin: "0 0 8px", color: "var(--ink)" }}>
              Besoin de conseils ?
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 18px", lineHeight: 1.5 }}>
              Contactez-nous, on vous aide à choisir le bon meuble.
            </p>
            <Link
              to="/contact"
              style={{
                display: "inline-block", padding: "11px 22px", borderRadius: 12,
                background: "linear-gradient(135deg,var(--secondary),var(--primary))", color: "#fff",
                fontFamily: "'Inter'", fontWeight: 700, fontSize: 14,
                textDecoration: "none", boxShadow: "0 8px 20px -8px rgb(var(--primary-rgb) / .55)",
              }}
            >
              Demander un devis →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'Inter'", fontSize: 12, color: "var(--muted)", margin: 0 }}>
            © {new Date().getFullYear()} {store.brand.fullName}. Tous droits réservés.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[["Confidentialité","#"],["Conditions","#"]].map(([lbl, href]) => (
              <a key={lbl} href={href} style={{ fontFamily: "'Inter'", fontSize: 12, color: "var(--muted)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >{lbl}</a>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter'", fontSize: 12, color: "var(--muted)", margin: 0 }}>
            Fabriqué en Algérie
          </p>
        </div>
      </div>
    </footer>
  );
}
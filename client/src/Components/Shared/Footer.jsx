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

const SocialIcon = ({ type }) => {
  if (type === "instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M15 8h-2a2 2 0 00-2 2v3H9v3h2v6h3v-6h2.2l.8-3H14v-2a1 1 0 011-1h2V8z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
      <path d="M15 8.5V6a3 3 0 013-3h1v3h-1a1 1 0 00-1 1v1.5h2l-.4 3H17V21h-3v-9.5H12V8.5h2z" />
    </svg>
  );
};

const headingStyle = {
  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 11.5, letterSpacing: ".16em",
  color: "var(--ink)", margin: "0 0 18px", textTransform: "uppercase",
};

export default function Footer() {
  const socialLinks = [
    store.social.instagram && { type: "instagram", href: store.social.instagram },
    store.social.facebook && { type: "facebook", href: store.social.facebook },
    store.social.tiktok && { type: "tiktok", href: store.social.tiktok },
  ].filter(Boolean);

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}>
      {/* Top invitation band */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 py-14 md:py-16 border-b border-[var(--line)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2 className="text-ink m-0" style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 520 }}>
              Un projet d'ameublement ? <span style={{ fontStyle: "italic" }}>Parlons-en.</span>
            </h2>
          </div>
          <Link to="/contact" className="nv-btn nv-btn-solid no-underline shrink-0">
            Demander un devis
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 pt-16 pb-8">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 44, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
              <span style={{ width: 34, height: 34, borderRadius: 8, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: "var(--bg)", transform: "rotate(45deg)", display: "block" }} />
              </span>
              <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 20, letterSpacing: "-.01em", color: "var(--ink)" }}>
                {store.brand.name}<span style={{ color: "var(--secondary)" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 20px", maxWidth: 280 }}>
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
                    style={{ width: 36, height: 36, borderRadius: 6, background: "transparent", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", cursor: "pointer", transition: "background .2s, color .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
                  >
                    <SocialIcon type={type} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Boutique */}
          <div>
            <h3 style={headingStyle}>Boutique</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <FooterLink to="/">Accueil</FooterLink>
              <FooterLink to="/products">Nos Meubles</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </div>
          </div>

          {/* Aide */}
          <div>
            <h3 style={headingStyle}>Aide</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <FooterLink to="/contact">Nous contacter</FooterLink>
              <FooterLink to="/products">Livraison & montage</FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={headingStyle}>Contact</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "var(--muted)" }}>
              <a href={`tel:${store.contact.phoneHref}`} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {store.contact.phone}
              </a>
              <a href={`mailto:${store.contact.email}`} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {store.contact.email}
              </a>
              <span>{store.contact.address}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)", margin: 0 }}>
            © {new Date().getFullYear()} {store.brand.fullName}. Tous droits réservés.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Confidentialité", "#"], ["Conditions", "#"]].map(([lbl, href]) => (
              <a key={lbl} href={href} style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >{lbl}</a>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)", margin: 0 }}>
            Fabriqué en Algérie
          </p>
        </div>
      </div>
    </footer>
  );
}

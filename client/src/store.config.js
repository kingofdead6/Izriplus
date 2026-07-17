// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH
// Everything brand-specific lives here. Components, Tailwind, index.html and the
// document head all read from this file. To rebrand a store, edit this file only —
// never the components.
//
// Changing the entire look of the store = editing the three `theme` hex values.
// ─────────────────────────────────────────────────────────────────────────────

export const store = {
  brand: {
    name: "IZRI+",                       // text logo / brand name shown everywhere
    fullName: "Meubles IZRI Plus",       // used in copyright / formal contexts
    tagline: "Meubles et articles d'ameublement fabriqués en Algérie. Salon, chambre, salle à manger — livrés chez vous.",
    logoText: "IZRI+",                   // text logo fallback (rendered with accent dot)
    logo: "/src/assets/Logo.png",        // optional image logo (favicon source in this demo)
    favicon: "/src/assets/Logo.png",
  },
  niche: {
    type: "furniture",
    productNoun: "meuble",
    productNounPlural: "meubles",
  },
  theme: {
    primary:   "#6B4226",   // walnut brown — buttons, headings accents, primary
    secondary: "#C1683C",   // terracotta   — gradient pair / warm CTAs
    accent:    "#B8975A",   // soft gold    — highlights, badges, dividers
  },
  contact: {
    email:    "contact@izriplus.dz",
    phone:    "+213 XXX XX XX XX",
    phoneHref: "213XXXXXXXXX",           // digits-only form used in tel: links
    whatsapp: "213XXXXXXXXX",            // digits-only form used in wa.me links
    address:  "Koléa, Tipaza, Algérie",
  },
  social: {
    instagram: "https://www.instagram.com/meubles.izriplus",
    facebook:  "https://www.facebook.com/p/Meubles-IZRI-plus-100093795253353/",
    tiktok:    "",
  },
  locale: {
    currency:       "DZD",
    currencySymbol: "DA",
    locale:         "fr-DZ",
    lang:           "fr",
  },
  seo: {
    title:       "Meubles IZRI Plus — Ameublement fabriqué en Algérie",
    description: "Meubles et articles d'ameublement fabriqués en Algérie : salon, chambre, salle à manger et décoration. Livraison partout en Algérie.",
    ogImage:     "/src/assets/Logo.png",
  },
};

export default store;
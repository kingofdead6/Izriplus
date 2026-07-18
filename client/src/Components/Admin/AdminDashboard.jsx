import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ADMIN_SECTIONS = [
  { path: "/admin/orders", title: "Commandes", description: "Consulter et mettre à jour le statut des commandes" },
  { path: "/admin/products", title: "Produits", description: "Ajouter, modifier et supprimer des meubles" },
  { path: "/admin/contacts", title: "Messages", description: "Consulter les messages reçus via le formulaire de contact" },
];

const SUPERADMIN_EXTRA = [
  { path: "/admin/users", title: "Utilisateurs", description: "Créer, modifier et supprimer les comptes administrateurs" },
  { path: "/admin/categories", title: "Catégories", description: "Ajouter et gérer les catégories de meubles" },
  { path: "/admin/delivery-areas", title: "Zones de livraison", description: "Ajouter et modifier les tarifs de livraison par wilaya" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Veuillez vous connecter pour accéder au tableau de bord.");
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.usertype === "admin" || decoded.usertype === "superadmin") {
        setUserType(decoded.usertype);
      } else {
        toast.error("Accès non autorisé.");
        navigate("/login");
      }
    } catch {
      toast.error("Session invalide. Veuillez vous reconnecter.");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Déconnexion réussie.");
    navigate("/login");
  };

  const sections = userType === "superadmin"
    ? [...ADMIN_SECTIONS, ...SUPERADMIN_EXTRA]
    : ADMIN_SECTIONS;

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--muted)", fontSize: 20 }}>Chargement du tableau de bord…</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{ minHeight: "100vh", padding: "80px 24px 60px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "-.03em", color: "var(--ink)", margin: 0 }}
          >
            {userType === "superadmin" ? "Super Admin" : "Tableau de bord"}
          </motion.h1>
        </div>

        {/* Grid */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 28 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.path}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link to={section.path} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 20, padding: "36px 28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backdropFilter: "blur(16px)", transition: "border-color .25s", boxSizing: "border-box" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgb(var(--secondary-rgb) / .4)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
                >
                  <div>
                    <h2 style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: "0 0 12px" }}>
                      {section.title}
                    </h2>
                    <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                      {section.description}
                    </p>
                  </div>
                  <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ fontFamily: "'Inter'", fontSize: 13, fontWeight: 600, color: "var(--secondary)", letterSpacing: ".04em" }}>
                      GÉRER →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Logout */}
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <button
            onClick={handleLogout}
            style={{ padding: "14px 40px", background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#b91c1c", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16, borderRadius: 14, cursor: "pointer", transition: "all .25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,.25)"; e.currentTarget.style.borderColor = "rgba(239,68,68,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,.15)"; e.currentTarget.style.borderColor = "rgba(239,68,68,.3)"; }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </motion.section>
  );
}
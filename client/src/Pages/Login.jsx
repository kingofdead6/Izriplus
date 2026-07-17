import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../api";
import { store } from "../store.config.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Veuillez saisir votre email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Format d'email invalide.";
    if (!password) e.password = "Veuillez saisir votre mot de passe.";
    else if (password.length < 6) e.password = "Le mot de passe doit contenir au moins 6 caractères.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        const { token, usertype } = response.data;

        if (remember) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        window.dispatchEvent(new Event("authChanged"));
        setErrors({});
        toast.success("Connexion réussie !");

        if (usertype === "admin" || usertype === "superadmin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        const message = error.response?.data?.message || "Échec de la connexion.";
        setErrors({ form: message });
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
  };

  const inputBase = {
    width: "100%", paddingTop: 14, paddingBottom: 14, borderRadius: 12,
    background: "var(--surface-soft)", color: "var(--ink)", fontSize: 15.5,
    outline: "none", fontFamily: "'Inter'", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontSize: 12, fontWeight: 700, color: "var(--muted)",
    marginBottom: 10, fontFamily: "'Inter'", letterSpacing: ".06em", textTransform: "uppercase",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 42, letterSpacing: "-.01em", color: "var(--ink)", margin: 0 }}
          >
            {store.brand.name}<span style={{ color: "var(--secondary)" }}>.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 12, fontSize: 16, color: "var(--muted)", fontFamily: "'Inter'" }}
          >
            Connexion à l'espace d'administration
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 24, padding: "38px", boxShadow: "0 24px 60px -30px rgba(43,33,24,.25)" }}
        >
          {errors.form && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: 24, padding: "16px 20px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.3)", color: "#b91c1c", borderRadius: 12, textAlign: "center", fontSize: 14, fontFamily: "'Inter'" }}
            >
              {errors.form}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Email */}
            <div>
              <label style={labelStyle}>Adresse email</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", insetBlock: 0, left: 16, display: "flex", alignItems: "center", color: "var(--muted)", pointerEvents: "none" }}>
                  <FaUser />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ ...inputBase, paddingLeft: 44, paddingRight: 16, border: `1px solid ${errors.email ? "rgba(239,68,68,.5)" : "var(--line)"}` }}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && <p style={{ marginTop: 8, fontSize: 13, color: "#b91c1c", fontFamily: "'Inter'" }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Mot de passe</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", insetBlock: 0, left: 16, display: "flex", alignItems: "center", color: "var(--muted)", pointerEvents: "none" }}>
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputBase, paddingLeft: 44, paddingRight: 48, border: `1px solid ${errors.password ? "rgba(239,68,68,.5)" : "var(--line)"}` }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", insetBlock: 0, right: 16, display: "flex", alignItems: "center", color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p style={{ marginTop: 8, fontSize: 13, color: "#b91c1c", fontFamily: "'Inter'" }}>{errors.password}</p>}
            </div>

            {/* Remember me */}
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: "var(--muted)", fontFamily: "'Inter'" }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: "var(--secondary)" }} />
              Rester connecté
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{ width: "100%", padding: "16px", background: loading ? "var(--surface-soft)" : "linear-gradient(135deg,var(--secondary),var(--primary))", color: loading ? "var(--muted)" : "#fff", fontSize: 16.5, fontWeight: 700, borderRadius: 14, border: loading ? "1px solid var(--line)" : "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter'", boxShadow: loading ? "none" : "0 18px 40px -16px rgb(var(--primary-rgb) / .55)" }}
            >
              {loading ? "Connexion en cours…" : "Se connecter"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
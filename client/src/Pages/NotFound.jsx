"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 lg:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ fontFamily: "'Fraunces'", fontSize: "clamp(96px,18vw,180px)", fontWeight: 700, letterSpacing: "-.03em", color: "rgb(var(--secondary-rgb) / .3)", lineHeight: 1, marginBottom: 20 }}
      >
        404
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ fontFamily: "'Fraunces'", fontWeight: 700, fontSize: "clamp(28px,5vw,48px)", letterSpacing: "-.01em", color: "var(--ink)", marginBottom: 16 }}
      >
        Page introuvable
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ fontFamily: "'Inter'", fontSize: 17, lineHeight: 1.6, color: "var(--muted)", maxWidth: 520, marginBottom: 36 }}
      >
        La page que vous cherchez n'existe pas ou a été déplacée. Retournons à la boutique.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link
          to="/products"
          style={{ display: "inline-flex", alignItems: "center", padding: "16px 32px", background: "linear-gradient(135deg,var(--secondary),var(--primary))", color: "#fff", fontFamily: "'Inter'", fontWeight: 700, fontSize: 16.5, borderRadius: 15, textDecoration: "none", boxShadow: "0 18px 40px -16px rgb(var(--primary-rgb) / .55)" }}
        >
          Retour à la boutique
        </Link>
      </motion.div>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";

/**
 * Reveal — lightweight scroll-in animation wrapper.
 *
 * Fades/slides its children into view the first time they enter the viewport,
 * using a single IntersectionObserver (no external deps). The animation itself
 * lives in index.css (`.nv-reveal` + `.is-visible`), so this component only
 * toggles the class. Honors prefers-reduced-motion via the CSS layer.
 *
 * Props:
 *   variant  — "up" (default) | "scale" | "left" | "right"
 *   delay    — ms before the transition starts (for staggered groups)
 *   as       — element/tag to render (default "div")
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  style = {},
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const variantClass =
    variant === "scale"
      ? "nv-reveal-scale"
      : variant === "left"
      ? "nv-reveal-left"
      : variant === "right"
      ? "nv-reveal-right"
      : "";

  return (
    <Tag
      ref={ref}
      className={`nv-reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

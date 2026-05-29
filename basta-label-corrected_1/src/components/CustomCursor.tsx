import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Set up springs for lag effect
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const auraX = useSpring(cursorX, springConfig);
  const auraY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect of device has touch capabilities or is small screen
    const detectDevice = () => {
      const mobileStatus = 
        window.matchMedia("(max-width: 900px)").matches || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobileStatus);
      
      if (!mobileStatus) {
        document.body.classList.add("custom-cursor-enabled");
      } else {
        document.body.classList.remove("custom-cursor-enabled");
      }
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "A" ||
        target?.tagName === "BUTTON" ||
        target?.closest("button") ||
        target?.closest("a") ||
        target?.classList.contains("product-card") ||
        target?.classList.contains("clickable-element")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Tiny solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#0d0d0b] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Outer elegant aura circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#0d0d0b]/35 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: auraX,
          y: auraY,
        }}
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: isHovered ? "#0d0d0b" : "rgba(13,13,11,0.35)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}

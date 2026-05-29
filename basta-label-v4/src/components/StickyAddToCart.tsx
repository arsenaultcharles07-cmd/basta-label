import React, { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";

interface StickyAddToCartProps {
  product: Product;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  onAddToBag: () => void;
}

export default function StickyAddToCart({
  product,
  selectedSize,
  onSizeSelect,
  onAddToBag
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 1400px (roughly past hero & intro parts)
      if (window.scrollY > 1500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100px", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-[900] bg-[#ede9df]/95 backdrop-blur-md border-t border-[#ccc9c1]/60 px-4 py-3 sm:py-4 shadow-xl flex items-center justify-between"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            {/* Left Block: Thumbnail + Title + Price */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-13 bg-[#f4f1ea] border border-[#ccc9c1]/35 overflow-hidden hidden sm:block">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[1.05rem] font-medium text-[#0d0d0b]">
                    {product.name}
                  </span>
                  <span className="text-[0.6rem] font-sans uppercase tracking-widest text-[#888580]">
                    ({product.variantName})
                  </span>
                </div>
                <div className="text-[0.68rem] text-[#2b2b27] tracking-wider mt-0.5">
                  <span className="font-medium font-mono">${product.price.toFixed(2)} CAD</span>
                  <span className="text-[#888580] ml-2">Livraison Gratuite +$200</span>
                </div>
              </div>
            </div>

            {/* Right block: Quick size swapper + instant Action */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Size helper bar */}
              <div className="flex items-center gap-1.5 hidden md:flex">
                <span className="text-[0.55rem] font-medium tracking-[0.15em] text-[#888580] uppercase">
                  Taille:
                </span>
                <div className="flex gap-1">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onSizeSelect(sz)}
                      className={`w-7 h-7 text-[0.58rem] font-sans border transition-all flex items-center justify-center font-normal ${
                        selectedSize === sz
                          ? "bg-[#0d0d0b] text-[#f4f1ea] border-[#0d0d0b]"
                          : "border-[#ccc9c1]/50 text-[#888580] hover:border-[#0d0d0b] hover:text-[#0d0d0b]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant purchase buttons */}
              <button
                onClick={onAddToBag}
                className="px-5 sm:px-8 py-3 bg-[#0d0d0b] text-[#f4f1ea] text-[0.58rem] font-sans font-light tracking-[0.2em] uppercase hover:bg-[#2b2b27] transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ajouter &middot; Taille {selectedSize}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

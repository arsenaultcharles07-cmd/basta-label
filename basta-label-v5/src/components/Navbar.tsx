import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ cartCount, onCartClick, onScrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        id="nav"
        className={`sticky top-0 z-[500] w-full border-b border-[#E5DED2]/15 transition-all duration-300 px-6 sm:px-12 py-3.5 sm:py-5 ${
          scrolled
            ? "bg-[#685D54]/96 backdrop-blur-md shadow-xs py-3 sm:py-4"
            : "bg-[#685D54]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Left Block: Nav Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            <li>
              <button
                onClick={() => onScrollToSection("collection")}
                className="text-[0.62rem] font-sans font-light tracking-[0.2em] uppercase text-[#E5DED2] hover:opacity-50 transition-opacity"
              >
                Collection
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("philosophy")}
                className="text-[0.62rem] font-sans font-light tracking-[0.2em] uppercase text-[#E5DED2] hover:opacity-50 transition-opacity"
              >
                Philosophie
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("fabric")}
                className="text-[0.62rem] font-sans font-light tracking-[0.2em] uppercase text-[#E5DED2] hover:opacity-50 transition-opacity"
              >
                Matières
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("faq")}
                className="text-[0.62rem] font-sans font-light tracking-[0.2em] uppercase text-[#E5DED2] hover:opacity-50 transition-opacity"
              >
                Soutien / FAQ
              </button>
            </li>
          </ul>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col items-center group/logo focus:outline-none"
            >
              <span className="logo-basta text-[1.4rem] text-[#E5DED2] group-hover:opacity-75 transition-opacity">
                BASTA
              </span>
              <span className="logo-label text-[#7d6e62] mt-0.5 group-hover:opacity-75 transition-opacity">
                LABEL
              </span>
            </button>
          </div>

          {/* Mobile hamburger placeholder menu descriptor / Minimal indicator */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => onScrollToSection("collection")}
              className="text-[0.55rem] font-sans font-medium tracking-widest uppercase text-[#E5DED2]/55"
            >
              Shop
            </button>
          </div>

          {/* Right Block: Actions */}
          <div className="flex items-center gap-5 sm:gap-7">
            {/* Minimal Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[0.62rem] tracking-[0.15em] uppercase text-[#E5DED2] hover:opacity-40 transition-opacity flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Shopping Bag Button with real state badge count */}
            <button
              onClick={onCartClick}
              className="text-[0.62rem] tracking-[0.15em] uppercase text-[#E5DED2] hover:opacity-40 transition-opacity flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
              <span className="inline-flex items-center justify-center w-4 h-4 bg-[#232323] text-[#E5DED2] rounded-full text-[0.52rem] font-medium font-sans px-1">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Minimalism Search Drawer/Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1500] bg-[#685D54]/98 backdrop-blur-md flex flex-col pt-24 px-6 sm:px-12"
          >
            <div className="max-w-3xl mx-auto w-full">
              {/* Top Row */}
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif italic text-base text-[#E5DED2]/55">
                  Recherche Intentionnelle &middot; Search
                </span>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1 px-3 border border-[#E5DED2]/20 hover:border-[#E5DED2]/30 text-[#E5DED2]/55 hover:text-[#E5DED2] transition-all flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest font-sans"
                >
                  Fermer <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* TextInput wrapper */}
              <div className="border-b border-[#E5DED2]/30 pb-4 flex items-center justify-between mb-8">
                <input
                  type="text"
                  placeholder="Écrivez le modèle, la capsule, ou le tissu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-xl sm:text-2xl font-serif text-[#E5DED2] focus:outline-none placeholder-[#A39382] w-full"
                  autoFocus
                />
                <Search className="w-6 h-6 text-[#E5DED2]/55" />
              </div>

              {/* Suggestions */}
              <div>
                <span className="text-[0.55rem] font-medium tracking-[0.22em] text-[#E5DED2]/55 uppercase block mb-4">
                  Sujets Communs / Popular Searches
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {["The Trouser", "Wide leg", "Espresso Trouser", "Bordeaux Henley", "Supima Henley"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 border border-[#E5DED2]/20/50 hover:border-[#E5DED2]/30 text-xs font-sans text-[#E5DED2] transition-all bg-[#574e46]/40"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Preview (Filter Mock) */}
              <div className="mt-12">
                {searchQuery && (
                  <div className="space-y-4">
                    <span className="text-[0.55rem] font-medium tracking-[0.22em] text-[#E5DED2]/55 uppercase block">
                      Résultats Estimés (Estimated Matches)
                    </span>
                    <div className="p-6 border border-[#E5DED2]/20/40 bg-[#574e46]/40 flex justify-between items-center hover:border-[#E5DED2]/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-[#A39382]/40 aspect-[3/4]" />
                        <div>
                          <h4 className="font-serif text-sm font-medium">Capsule 01: Minimal Wardrobe</h4>
                          <p className="text-[0.62rem] text-[#E5DED2]/55 uppercase tracking-widest mt-0.5">
                            Navy, Espresso & Bordeaux Knitwear
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                          onScrollToSection("collection");
                        }}
                        className="text-[0.58rem] tracking-[0.18em] uppercase border-b border-[#E5DED2]/30 font-medium"
                      >
                        Acheter / Shop
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

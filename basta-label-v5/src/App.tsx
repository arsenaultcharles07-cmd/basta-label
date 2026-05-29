import React, { useState, useEffect, useRef } from "react";
import { 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  Ruler, 
  ShieldCheck, 
  Sparkles, 
  Maximize2, 
  Info,
  CheckCircle,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Product, CartItem } from "./types";
import { PRODUCTS, FAQS, SOCIALS, BRAND_VALUES } from "./data";

// Sub Components
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import StickyAddToCart from "./components/StickyAddToCart";
import SizeGuideModal from "./components/SizeGuideModal";

export default function App() {
  // --- STATES & REFS ---
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Active product on detail section (defaults to signature Navy Trouser)
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Accordion toggle status on product description
  const [activeAccordion, setActiveAccordion] = useState<string | null>("comp");

  // FAQ accordion tracking (pre-open first FAQ)
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-size");

  // Newsletter Success state
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const detailSectionRef = useRef<HTMLDivElement>(null);

  // --- LOCAL STORAGE CART PERSISTENCE ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem("basta-cart-v1");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load cart items:", e);
    }
  }, []);

  const saveCartToStorage = (updated: CartItem[]) => {
    try {
      localStorage.setItem("basta-cart-v1", JSON.stringify(updated));
    } catch (e) {
      console.error("Could not preserve cart items:", e);
    }
  };

  // --- CART OPERATIONS ---
  const handleAddToBag = (product: Product, size: string) => {
    // Unique ID combining product code and size
    const itemId = `${product.id}-${size}`;
    
    let updatedCart = [...cartItems];
    const existingIndex = cartItems.findIndex((it) => it.id === itemId);

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: itemId,
        product,
        selectedSize: size,
        quantity: 1
      });
    }

    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
    setCartOpen(true); // Open drawer instantly for immediate purchase confirmation
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // --- SCROLL TO ---
  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleProductCardClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize("M"); // reset selection to default M
    if (detailSectionRef.current) {
      const offset = 120;
      const elementPosition = detailSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Switch image gallery focus if any secondary image exists
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  useEffect(() => {
    setActivePhotoIndex(0); // reset when product changes
  }, [selectedProduct]);

  // Newsletter handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#685D54] text-[#E5DED2] font-sans selection:bg-[#232323]/10 selection:text-[#E5DED2] overflow-x-hidden pb-12 sm:pb-20">
      {/* Dynamic Ambient Noise Texture layering overall screen depth */}
      <div className="grain-overlay" />
      
      {/* High-fidelity custom trailing cursor */}
      <CustomCursor />
      <div className="bg-[#232323] text-[#E5DED2]/80 text-center py-2 px-4 text-[0.62rem] font-sans font-light tracking-[0.25em] uppercase">
        <span>Drop 01 &mdash; Disponible en tirage restreint. </span>
        <span className="text-[#E5DED2] font-normal transition-all hover:text-[#E5DED2] ml-1">
          Livraison gratuite au-dessus de $200 CAD &middot; Free worldwide shipping
        </span>
      </div>
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* ============ ③ HERO SECTION ============ */}
      <span id="hero-section" />
      <section className="relative h-[85vh] sm:h-[90vh] min-h-[600px] w-full flex items-end overflow-hidden bg-[#574e46]">
        {/* Cinematic Widescreen Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/basta_hero_banner_1779996826682.png"
            alt="Basta Label Editorial Modeling setting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.88] transition-transform duration-[4000ms] ease-out hover:scale-105"
          />
          {/* Subtle premium shadow vignettes built-in */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0b]/75 via-[#0d0d0b]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b]/35 via-transparent to-[#0d0d0b]/15" />
        </div>

        {/* Content Box */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 pb-12 sm:pb-20 z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[0.62rem] font-sans font-medium tracking-[0.35em] text-[#E5DED2]/60 uppercase block mb-3 animate-fadeIn">
              Capsule 01 &mdash; 2026
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#E5DED2] leading-[0.95] tracking-tight">
              Basta.<br />
              <span className="font-serif italic text-[#E5DED2]/75 font-normal tracking-wide text-[0.85em] lg:text-[0.82em]">
                to excess.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 sm:gap-8 md:text-right">
            <p className="text-[0.68rem] sm:text-xs font-sans font-light tracking-[0.2em] text-[#E5DED2]/80 leading-relaxed uppercase max-w-sm">
              Quiet confidence.<br />
              Deux silhouettes signatures.<br />
              Zéro compromis.
            </p>
            <button
              onClick={() => handleScrollToSection("collection")}
              className="group px-8 py-4 bg-[#685D54] text-[#E5DED2] text-[0.6rem] sm:text-[0.65rem] font-sans font-light tracking-[0.25em] uppercase hover:bg-[#3a3330] active:scale-98 transition-all flex items-center gap-3 shadow-md"
            >
              <span>Découvrir la collection</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Floating scroll indicator */}
        <button onClick={() => handleScrollToSection("collection")} className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none" aria-label="Scroll to collection">
          <span className="text-[0.48rem] font-sans uppercase tracking-[0.3em] text-[#E5DED2]/55">Scroll</span>
          <div className="w-[1px] h-10 bg-[#FBF7F4]/20 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-[#FBF7F4]/60 animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
        </button>
      </section>
      <div className="border-y border-[#E5DED2]/12 bg-[#3a3330] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 w-max animate-infinite-scroll">
          {/* Looping twice for seamless continuation */}
          {[1, 2].map((loopIdx) => (
            <div key={loopIdx} className="flex gap-12 items-center">
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                Silence is luxury <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                Capsule 01 Disponible <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                No logos. No noise. <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                80% Cotton &middot; 20% Lin &middot; 300GSM <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                Confidence doesn't speak <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                Livraison gratuite +$200 CAD <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
              <span className="text-[0.58rem] font-sans uppercase text-[#A39382] tracking-[0.22em] flex items-center gap-4">
                Understated. Undeniable. <span className="w-1.5 h-1.5 rounded-full bg-[#c4b9aa] inline-block" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ ⑤ GRILLE PRODUIT VEDETTE ============ */}
      <section id="collection" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[0.58rem] font-sans tracking-[0.25em] text-[#E5DED2]/50 uppercase block mb-3">
              Garde-robe Sélectionnée
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#E5DED2] leading-tight">
              The <span className="font-serif italic font-normal text-[#A39382]">Essential</span> Wardrobe.
            </h2>
          </div>
          <div>
            <span className="text-[0.62rem] font-sans font-light text-[#E5DED2]/80 uppercase tracking-[0.2em] border-b border-[#E5DED2]/20 pb-1 cursor-pointer hover:border-[#232323] transition-all">
              4 silhouettes exclusives
            </span>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleProductCardClick(prod)}
              className="group cursor-pointer flex flex-col focus:outline-none"
            >
              {/* Image Container with Custom Aspect */}
              <div className="relative aspect-[3/4] w-full bg-[#3a3330] overflow-hidden mb-5">
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-104 select-none"
                />
                
                {/* Visual texture shadow overlays */}
                <div className="absolute inset-0 bg-[#232323]/2 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Elegant Centered Hover Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      handleAddToBag(prod, "M");
                    }}
                    className="px-6 py-3 bg-[#232323] hover:bg-[#3a3330] text-[#E5DED2] text-[0.58rem] font-sans tracking-[0.22em] uppercase transition-all shadow-xl font-light active:scale-95"
                  >
                    Ajout Rapide &middot; Standard M
                  </button>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex justify-between items-start mt-1">
                <div>
                  <h3 className="font-serif text-md font-medium text-[#E5DED2] tracking-wide">
                    {prod.name}
                  </h3>
                  <p className="text-[0.6rem] font-sans uppercase tracking-[0.15em] text-[#A39382] mt-1 flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-[#E5DED2]/20"
                      style={{ backgroundColor: prod.variantColorCode }}
                    />
                    {prod.variantName} &mdash; {prod.fabricSpecs.composition.split("·")[0]}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-sans text-[#E5DED2] tracking-wider font-medium">
                    ${prod.price.toFixed(0)} CAD
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ⑥ SECTION MANIFESTE ============ */}
      <section id="philosophy" className="bg-[#232323] text-[#E5DED2] py-16 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Block */}
          <div className="border-r border-[#E5DED2]/10 pr-0 lg:pr-12 md:py-6">
            <span className="text-[0.55rem] font-sans tracking-[0.3em] text-[#A39382] uppercase block mb-6">
              La Philosophie Basta Label
            </span>
            <blockquote className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-[#E5DED2]">
              "Silence is the<br />
              highest form of<br />
              <span className="font-serif italic text-[#A39382]">presence & power.</span>"
            </blockquote>
          </div>

          {/* Right Block */}
          <div className="space-y-8 lg:pl-4">
            <p className="text-[0.72rem] sm:text-xs font-sans font-light tracking-[0.08em] text-[#A39382] leading-[2.1] max-w-lg">
              Nous façonnons des lignes sobres et épurées pour l'homme qui a cessé de quémander l'approbation du regard d'autrui. Pas de logos bruyants. Pas de graphismes éphémères. Pas de tapage médiatique.<br /><br />
              Juste des coupes au tombé d'une justesse irréprochable. Des matières lourdes qui maintiennent leur posture organique lavage après lavage. Des essentiels intemporels pensés pour résister au cycle incessant de la mode saisonnière.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <button
                onClick={() => handleScrollToSection("fabric")}
                className="px-6 py-3 border border-[#E5DED2]/15 text-[#E5DED2] text-[0.58rem] font-sans font-light tracking-[0.2em] uppercase hover:bg-[#3a3330]/5 hover:border-[#f4f1ea] transition-all"
              >
                Nos principes de sourcing
              </button>
              <span className="text-serif italic text-6xl opacity-[0.04] select-none font-light absolute right-12 bottom-6 pointer-events-none text-right">
                01
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ⑦ MAIN MATIÈRE (FABRIC) ============ */}
      <section id="fabric" className="bg-[#3a3330] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[0.55rem] font-sans tracking-[0.22em] text-[#E5DED2]/80 uppercase block mb-1">
              Origine de Tissage
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E5DED2] leading-tight">
              Un textile qui méritait d'exister. <br />
              <span className="font-serif italic text-[#A39382] font-normal">Structure & Souffle.</span>
            </h3>

            <p className="text-[0.72rem] sm:text-xs font-sans font-light text-[#E5DED2]/80 leading-[2.1] tracking-wide">
              La Capsule 01 utilise une combinaison brevetée de coton de qualité supérieure et de lin organique. Le lin apporte sa texture vivante et un tombé asymétrique fluide reconnaissable à l'œil, tandis que le coton retient la douceur essentielle sur la peau et une imperméabilité aux déformations.
            </p>

            {/* Micro-specs grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#E5DED2]/15">
              <div>
                <span className="block text-[0.52rem] font-sans uppercase tracking-widest text-[#A39382] mb-0.5">
                  Composition
                </span>
                <span className="text-xs font-serif italic text-[#E5DED2]">80% Cotton · 20% Organic Lin</span>
              </div>
              <div>
                <span className="block text-[0.52rem] font-sans uppercase tracking-widest text-[#A39382] mb-0.5">
                  Densité de Fibre
                </span>
                <span className="text-xs font-sans font-medium text-[#E5DED2]">300 GSM Heavyweight</span>
              </div>
              <div>
                <span className="block text-[0.52rem] font-sans uppercase tracking-widest text-[#A39382] mb-0.5">
                  Drap / Tombé
                </span>
                <span className="text-xs font-serif italic text-[#E5DED2]">Rigide Structuré Flou</span>
              </div>
              <div>
                <span className="block text-[0.52rem] font-sans uppercase tracking-widest text-[#A39382] mb-0.5">
                  Certifications
                </span>
                <span className="text-xs font-sans font-medium text-[#E5DED2]">GOTS Bio certifié</span>
              </div>
            </div>
          </div>

          {/* Luxury fabric image gallery blocks */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
            <div className="col-span-8 aspect-[4/5] bg-[#c4b9aa]/40 overflow-hidden shadow-sm relative">
              <img
                src="/images/basta_fabric_detail_1779996918283.png"
                alt="Basta luxury macro cotton linen textile weaver"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute bottom-4 left-4 bg-[#685D54] px-3.5 py-1 text-[0.52rem] font-sans tracking-widest uppercase font-mono text-[#E5DED2]">
                Macro Tissage 300GSM
              </div>
            </div>
            
            <div className="col-span-4 aspect-[3/4] self-end bg-[#3a3330] overflow-hidden shadow-md hidden sm:block relative">
              {/* Secondary fabric angle / contrast */}
              <div className="absolute inset-0 bg-[#232323]/40 mix-blend-overlay z-10" />
              <img
                src="/images/basta_navy_trouser_1779996846955.png"
                alt="Fabric structure styling"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] select-none"
              />
              <div className="absolute top-4 left-4 bg-[#232323] px-3 py-1 text-[0.45rem] tracking-[0.2em] uppercase font-sans text-[#E5DED2]">
                Fibre Teinte
              </div>
            </div>
          </div>
        </div>
      </section>


            {/* ============ ⑧ PAGE PRODUIT INTÉGRÉE (INTERACTIVE PRODUCT GRID DETAIL) ============ */}
      <section 
        ref={detailSectionRef}
        id="product-detail-area" 
        className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 border-t border-[#E5DED2]/15 scroll-mt-24"
      >
      {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Column 1: Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[0.55rem] font-sans tracking-[0.2em] text-[#A39382] uppercase block">
              Explorateur Visual-Hub (Angle {activePhotoIndex + 1}/2)
            </span>
            
            {/* Main Picture box with custom loader preview */}
            <div className="aspect-[3/4] w-full bg-[#3a3330] overflow-hidden rounded-xs relative group/detail">
              <img
                src={selectedProduct.secondaryImages[activePhotoIndex]}
                alt={`${selectedProduct.name} main view`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 select-none"
              />
              <div className="absolute top-4 right-4 bg-[#232323]/30 backdrop-blur-md px-2.5 py-1 text-[0.55rem] font-mono text-[#E5DED2] rounded-full uppercase tracking-widest flex items-center gap-1">
                <span>Zoom actif</span>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-2 gap-4">
              {selectedProduct.secondaryImages.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`aspect-[4/3] bg-[#3a3330] overflow-hidden border transition-all ${
                    activePhotoIndex === idx
                      ? "border-[#232323] scale-[0.98] opacity-100 shadow-sm"
                      : "border-[#E5DED2]/12 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="Sub view" referrerPolicy="no-referrer" className="w-full h-full object-cover object-top select-none" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Checkout / Customization Console */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <span className="text-[0.6rem] font-sans font-medium tracking-[0.25em] text-[#A39382] uppercase block mb-2">
                Basta Label &middot; Drop 01 Essentials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#E5DED2] tracking-wide leading-tight">
                {selectedProduct.name} &mdash; <span className="font-serif italic font-normal text-[#A39382]">{selectedProduct.variantName}</span>
              </h2>
              
              {/* Product Price Tag */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-xl font-sans text-[#E5DED2] font-medium tracking-wide">
                  ${selectedProduct.price.toFixed(2)} CAD
                </span>

                <span className="px-2.5 py-0.5 border border-[#7d6e62]/20 bg-[#3a3330]/5 text-[#A39382] rounded-xs text-[0.55rem] font-sans font-medium tracking-widest uppercase">
                  Finitudes Limite
                </span>
              </div>
            </div>

            <p className="text-[0.72rem] sm:text-xs font-sans font-light text-[#E5DED2]/80 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Selection Color Swappable */}
            <div>
              <span className="text-[0.55rem] font-medium tracking-[0.18em] text-[#A39382] uppercase block mb-2.5">
                Couleur / Color Capsule
              </span>
              <div className="flex gap-3">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`px-3 py-2 border flex items-center gap-2 text-[0.62rem] font-sans uppercase tracking-widest transition-all ${
                      selectedProduct.id === prod.id
                        ? "border-[#232323] bg-[#3a3330]"
                        : "border-[#E5DED2]/12 hover:border-[#232323]"
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-[#E5DED2]/20"
                      style={{ backgroundColor: prod.variantColorCode }}
                    />
                    <span>{prod.variantName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector block */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[0.55rem] font-medium tracking-[0.18em] text-[#A39382] uppercase">
                  Taille / Select Size
                </span>
                
                {/* Size guide trigger is real */}
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[0.55rem] font-sans font-light tracking-[0.15em] text-[#E5DED2]/80 uppercase underline hover:opacity-75 flex items-center gap-1.5"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#A39382]" />
                  <span>Guide des Tailles</span>
                </button>
              </div>

              {/* Sizes row */}
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-11 text-xs border tracking-wider font-sans transition-all flex items-center justify-center ${
                      selectedSize === sz
                        ? "bg-[#232323] text-[#E5DED2] border-[#232323] font-medium"
                        : "border-[#E5DED2]/20 text-[#E5DED2]/80 hover:border-[#232323] hover:text-[#E5DED2]"
                    }`}
                  >
                    {sz}
                    {sz === "M" && (
                      <span className="absolute text-[0.38rem] translate-y-3.5 text-[#A39382] font-mono leading-none">Std</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkout CTAs with sliding Drawer binding */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleAddToBag(selectedProduct, selectedSize)}
                className="w-full py-4.5 bg-[#232323] hover:bg-[#3a3330] text-[#E5DED2] text-[0.68rem] font-sans font-light tracking-[0.25em] uppercase transition-all shadow-md active:scale-99 flex items-center justify-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au Panier &middot; Taille {selectedSize}</span>
              </button>

              <button
                onClick={() => setSizeGuideOpen(true)}
                className="w-full py-4 border border-[#E5DED2]/20 text-[#E5DED2]/80 hover:border-[#232323] hover:text-[#E5DED2] text-[0.62rem] font-sans font-light tracking-[0.22em] uppercase transition-all"
              >
                Consulter les mesures détaillées (Fit Check)
              </button>
            </div>

            {/* Custom Interactive Accordions */}
            <div className="border-t border-[#E5DED2]/15 pt-4 space-y-2">
              {/* Composition & Care */}
              <div className="border-b border-[#E5DED2]/20/20 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "comp" ? null : "comp")}
                  className="w-full flex justify-between items-center py-2 text-xs font-sans font-medium text-[#E5DED2] tracking-wider uppercase"
                >
                  <span>Composition & Entretien / Care</span>
                  <span className={`text-[0.9rem] font-light transition-transform duration-300 ${activeAccordion === "comp" ? "rotate-90 text-[#A39382]" : "text-[#A39382]"}`}>
                    &middot;
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccordion === "comp" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[0.72rem] text-[#A39382] leading-[1.8] font-sans space-y-1.5 py-1"
                    >
                      <p><strong>Composition:</strong> {selectedProduct.fabricSpecs.composition}</p>
                      <p><strong>Entretien:</strong> {selectedProduct.fabricSpecs.care}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Fit Description */}
              <div className="border-b border-[#E5DED2]/20/20 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "fit" ? null : "fit")}
                  className="w-full flex justify-between items-center py-2 text-xs font-sans font-medium text-[#E5DED2] tracking-wider uppercase"
                >
                  <span>Coupe & Spécifications / Fit</span>
                  <span className={`text-[0.9rem] font-light transition-transform duration-300 ${activeAccordion === "fit" ? "rotate-90 text-[#A39382]" : "text-[#A39382]"}`}>
                    &middot;
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccordion === "fit" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[0.72rem] text-[#A39382] leading-[1.8] font-sans space-y-2 py-1"
                    >
                      <ul className="list-disc pl-4 space-y-1">
                        {selectedProduct.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                      <p className="pt-2 text-[0.68rem] italic text-[#E5DED2]/80">Coupe: {selectedProduct.fabricSpecs.fit}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Delivery info */}
              <div className="border-b border-[#E5DED2]/20/20 pb-2">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === "ship" ? null : "ship")}
                  className="w-full flex justify-between items-center py-2 text-xs font-sans font-medium text-[#E5DED2] tracking-wider uppercase"
                >
                  <span>Livraison & Retours / Eco Shipping</span>
                  <span className={`text-[0.9rem] font-light transition-transform duration-300 ${activeAccordion === "ship" ? "rotate-90 text-[#A39382]" : "text-[#A39382]"}`}>
                    &middot;
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccordion === "ship" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[0.72rem] text-[#A39382] leading-[1.8] font-sans py-1"
                    >
                      <p>Expédié sous boîte étanche cartonnée brute sans agent de blanchiment et sous papier d'emballage organique neutre en carbone. Les retours sont offerts gracieusement sous un délai de 14 jours si les sceaux de fermeture n'ont pas été dégradés.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ⑨ VALUES STRIP (BANDE DE VALEURS) ============ */}
      <section className="bg-[#3a3330] border-y border-[#E5DED2]/10 text-[#E5DED2]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#ccc9c1]/10">
          {BRAND_VALUES.map((val) => (
            <div key={val.num} className="p-8 sm:p-12 space-y-4">
              <span className="font-serif text-3xl font-light text-[#A39382]/30 select-none block leading-none">
                {val.num}
              </span>
              <h4 className="font-serif italic text-base lg:text-lg text-[#E5DED2] leading-tight">
                {val.title}
              </h4>
              <p className="text-[0.68rem] font-sans font-light text-[#A39382]/60 leading-[1.85] tracking-wide">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ⑩ SOCIAL PROOF UGC ============ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[0.55rem] font-sans tracking-[0.25em] text-[#E5DED2]/50 uppercase block mb-3">
              Cercle Basta Label
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#E5DED2] leading-[1.12]">
              The <span className="font-serif italic font-normal text-[#A39382]">quiet few.</span>
            </h2>
          </div>
          <div>
            <a 
              href="#instagram-link" 
              className="text-[0.62rem] font-sans uppercase tracking-[0.2em] font-medium text-[#E5DED2] border-b border-[#232323] pb-0.5 hover:border-[#888580] hover:text-[#A39382] transition-colors"
            >
              @bastalabel
            </a>
          </div>
        </div>

        {/* Instawall Grid with Fallback placeholders styled with luxurious gradients */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIALS.map((soc) => (
            <div
              key={soc.id}
              className="group relative aspect-square bg-[#3a3330] overflow-hidden rounded-xs cursor-pointer"
            >
              {/* Luxurious abstract textured gradient as layout backdrop for social UGC */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ccc9c1] via-[#e4dfd3] to-[#888580] ring-1 ring-[#0d0d0b]/5" />
              
              {/* Overlaid abstract fashion lighting details */}
              <div className="absolute inset-x-2 bottom-2 top-10 bg-[#232323]/10 blur-xl rounded-full" />
              
              {/* Fine subtle overlay text framing human identity */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 bg-black/0 group-hover:bg-[#232323]/65 transition-all duration-300">
                <div className="self-end text-[0.45rem] font-mono uppercase tracking-[0.2em] text-[#E5DED2]/0 group-hover:text-[#E5DED2]/40 transition-colors">
                  Verified Fit
                </div>
                <div>
                  <h4 className="text-[0.72rem] font-serif font-light text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                    {soc.username}
                  </h4>
                  <p className="text-[0.58rem] font-sans uppercase tracking-widest text-[#c4b89e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    {soc.handle}
                  </p>
                  <p className="text-[0.52rem] font-sans text-white/70 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 leading-relaxed">
                    "{soc.caption}"
                  </p>
                </div>
              </div>

              {/* Little icon marker on bottom right */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#FBF7F4]/20 select-none group-hover:bg-[#c4b89e] group-hover:scale-125 transition-all" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-serif italic text-3xl opacity-[0.06] text-[#E5DED2] tracking-widest select-none">Basta.</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ⑪ NEWSLETTER COMTEMPLATEUR ============ */}
      <section className="bg-[#232323] text-[#E5DED2] py-20 sm:py-32 border-t border-[#E5DED2]/10 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 relative z-10">
          <span className="text-[0.52rem] font-sans tracking-[0.35em] text-[#A39382] uppercase block mb-4">
            Registre de Priorité &middot; Newsletter
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#E5DED2] tracking-tight leading-none mb-3">
            Rejoins <span className="font-serif italic font-normal text-[#A39382]">les rares.</span>
          </h2>
          <p className="text-[0.68rem] sm:text-xs font-sans font-light tracking-[0.1em] text-[#A39382]/75 leading-relaxed max-w-md mx-auto mb-10 sm:mb-12">
            Soyez notifié en priorité du drop de la Capsule 02 en automne. Aucun bruit promotionnel. Désistement possible en un clic depuis le pied de boîte.
          </p>

          <AnimatePresence mode="wait">
            {!newsletterSubscribed ? (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleNewsletterSubmit}
                className="max-w-md mx-auto flex items-center border-b border-[#E5DED2]/20 pb-2.5 focus-within:border-white transition-colors"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Inscrivez votre adresse e-mail"
                  className="bg-transparent border-none text-xs sm:text-sm font-sans tracking-wide text-white focus:outline-none placeholder-white/20 w-full"
                />
                <button
                  type="submit"
                  className="p-1 px-4 text-[0.55rem] sm:text-[0.6rem] font-sans uppercase tracking-[0.25em] text-[#E5DED2] hover:text-[#E5DED2] transition-colors shrink-0"
                >
                  S'enregistrer &rarr;
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-5 border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 rounded-sm inline-flex items-center gap-3 text-left"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-[0.72rem] font-bold uppercase tracking-wider text-white">Inclusion validée.</h4>
                  <p className="text-[0.62rem] text-emerald-400/80 leading-relaxed mt-0.5">
                    Votre adresse figure désormais au registre Basta Label. Vous recevrez l'invitation cryptée à la Capsule 02 en exclusivité.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============ ⑫ SECTION FAQ ============ */}
      <section id="faq" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
      {/* Left Col */}
        <div className="lg:col-span-4">
          <span className="text-[0.55rem] font-sans tracking-[0.22em] text-[#E5DED2]/50 uppercase block mb-3">
            Soutien à la décision
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E5DED2] leading-tight">
            Questions<br />
            <span className="font-serif italic font-normal text-[#A39382]">fréquentes.</span>
          </h3>
          <p className="text-[0.72rem] text-[#A39382] mt-4 leading-relaxed max-w-xs font-light">
            Une hésitation relative à la matière de coton-lin ou au drapé du pantalon ? Nos équipes de couturiers sont rattachées en continu via <span className="font-medium underline hover:text-[#E5DED2] cursor-pointer">hello@bastalabel.com</span>
          </p>
        </div>

        {/* Right Col: Interactive expanding lists */}
        <div className="lg:col-span-8 divide-y divide-[#ccc9c1]/35">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className="py-5 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left flex justify-between items-center gap-4 group/faq"
                >
                  <span className="text-xs sm:text-sm font-sans font-medium text-[#E5DED2]/80 group-hover/faq:text-[#E5DED2] tracking-wide transition-colors">
                    {faq.question}
                  </span>
                  <span className={`text-[1.2rem] font-light transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45 text-[#A39382]" : "text-[#A39382]"}`}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[0.72rem] sm:text-[0.75rem] text-[#A39382] leading-[1.9] tracking-wide pt-4 pb-1 select-text">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ ⑬ FOOTER ============ */}
      <footer className="bg-[#232323] text-[#E5DED2] pt-16 sm:pt-24 pb-12 px-6 sm:px-12 border-t border-[#E5DED2]/10">
      <div className="max-w-7xl mx-auto space-y-16">
          {/* Main Footer blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex flex-col items-start select-none">
                <span className="logo-basta text-[1.6rem] text-white block">
                  BASTA
                </span>
                <span className="logo-label text-[#A39382] block -mt-0.5">
                  LABEL
                </span>
              </div>
              <p className="text-[0.62rem] text-[#A39382]/50 leading-[1.95] tracking-[0.08em] uppercase max-w-sm">
                Quiet confidence.<br />
                Capsule 01 en tirage exclusif limitée.<br />
                Capsule 02 &mdash; En phase de confection automne 2026.
              </p>
            </div>

            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="text-[0.55rem] font-sans tracking-[0.25em] text-[#A39382] uppercase">
                Acheter / Shop
              </h4>
              <ul className="space-y-2.5 list-none text-[0.65rem] tracking-wider text-[#A39382]/60 font-light uppercase">
                <li>
                  <button onClick={() => { setSelectedProduct(PRODUCTS[0]); handleScrollToSection("product-detail-area"); }} className="hover:text-white transition-colors">
                    The Trouser &mdash; Navy
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedProduct(PRODUCTS[1]); handleScrollToSection("product-detail-area"); }} className="hover:text-white transition-colors">
                    The Trouser &mdash; Bordeaux
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedProduct(PRODUCTS[2]); handleScrollToSection("product-detail-area"); }} className="hover:text-white transition-colors">
                    The Henley &mdash; Off-white
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="text-[0.55rem] font-sans tracking-[0.25em] text-[#A39382] uppercase">
                La Marque / Brand
              </h4>
              <ul className="space-y-2.5 list-none text-[0.65rem] tracking-wider text-[#A39382]/60 font-light uppercase">
                <li><a href="#about" className="hover:text-white transition-colors">À Propos</a></li>
                <li><button onClick={() => handleScrollToSection("fabric")} className="hover:text-white transition-colors">Sourcing Éthique</button></li>
                <li><button onClick={() => handleScrollToSection("philosophy")} className="hover:text-white transition-colors">Politique de Silence</button></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Couture Service</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-[0.55rem] font-sans tracking-[0.25em] text-[#A39382] uppercase">
                Aide & Support
              </h4>
              <ul className="space-y-2.5 list-none text-[0.65rem] tracking-wider text-[#A39382]/60 font-light uppercase">
                <li><button onClick={() => setSizeGuideOpen(true)} className="hover:text-white transition-colors">Guide des Tailles</button></li>
                <li><button onClick={() => handleScrollToSection("faq")} className="hover:text-white transition-colors">Consignes de Livraison</button></li>
                <li><button onClick={() => handleScrollToSection("faq")} className="hover:text-white transition-colors">Politique d'Échange</button></li>
                <li><button onClick={() => handleScrollToSection("faq")} className="hover:text-white transition-colors">Entretien des Fibres</button></li>
              </ul>
            </div>
          </div>

          {/* Understated terms block */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-[#E5DED2]/10 text-[#A39382]/30">
            <span className="text-[0.55rem] font-sans tracking-[0.1em] uppercase">
              &copy; 2026 Basta Label. Tous droits de design réservés. Conçu sur le canevas de quiet luxury.
            </span>
            <div className="flex gap-6">
              <a href="#insta" className="text-[0.55rem] font-sans tracking-widest uppercase hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#tk" className="text-[0.55rem] font-sans tracking-widest uppercase hover:text-white transition-colors">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ MODERN SLIDING SHOPPING CART DRAWER ============ */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* ============ SIZE GUIDE MODAL POPUP ============ */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productName={selectedProduct.name}
      />

      {/* ============ PERSISTENT SCREEN CONVERSION OPTIMIZED STICKY ADD TO CART ============ */}
      <StickyAddToCart
        product={selectedProduct}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
        onAddToBag={() => handleAddToBag(selectedProduct, selectedSize)}
      />
    </div>
  );
}

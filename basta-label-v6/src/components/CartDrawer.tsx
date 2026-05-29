import React, { useState } from "react";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Truck, Package } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkedOutSuccess, setCheckedOutSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const isFreeShipping = remainingForFreeShipping <= 0;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleCheckoutMock = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckedOutSuccess(true);
    }, 2200);
  };

  const handleResetCheckout = () => {
    setCheckedOutSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1a1614]/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-screen max-w-md bg-[#f0ece3] border-l border-[#C8BDB1]/30/60 flex flex-col shadow-2xl text-[#1a1614] relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#C8BDB1]/30/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#A89982]" />
                  <h3 className="font-serif text-lg tracking-wide uppercase font-light text-[#1a1614]">
                    Mon Panier ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 px-2.5 -mr-2 text-[#A89982] hover:text-[#1a1614] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[0.55rem] uppercase tracking-widest font-sans font-light">Fermer</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Checkout Status Swapper */}
              {checkedOutSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#E5DED2]/20/40">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[0.55rem] font-medium tracking-[0.22em] text-[#A89982] uppercase block mb-1">
                    Paiement Réussi · Basta Label
                  </span>
                  <h4 className="font-serif text-2xl font-light text-[#1a1614] leading-tight mb-3">
                    Votre commande est réservée.
                  </h4>
                  <p className="text-[0.72rem] text-[#A89982] max-w-xs leading-relaxed mb-6">
                    Merci pour votre achat hautement intentionnel. Un e-mail de confirmation avec votre facture et code de suivi crypté a été dépêché à l'instant.
                  </p>
                  <p className="text-[0.65rem] text-[#1a1614] font-mono mb-8 bg-[#f0ece3] p-3 px-4 border border-[#C8BDB1]/30/40 rounded-sm">
                    No. Ref: BST-2026-{(Math.random() * 89999 + 10000).toFixed(0)}
                  </p>
                  <button
                    onClick={() => {
                      handleResetCheckout();
                      onClose();
                    }}
                    className="w-full max-w-xs py-3.5 bg-[#1a1614] text-[#C8BDB1] text-[0.6rem] font-sans font-light tracking-[0.2em] uppercase hover:bg-[#60544D] transition-all"
                  >
                    Retourner au Hub
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Body */}
                  <div className="flex-grow overflow-y-auto p-6 focus:outline-none">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-80 py-12">
                        <ShoppingBag className="w-12 h-12 text-[#ccc9c1] stroke-[1] mb-4" />
                        <p className="font-serif italic text-base text-[#A89982] mb-2">
                          Votre panier est silencieux.
                        </p>
                        <p className="text-[0.68rem] text-[#A89982] max-w-[240px] leading-relaxed mb-6">
                          Prenez le temps d'explorer la Capsule 01 et de sélectionner des silhouettes faites pour durer.
                        </p>
                        <button
                          onClick={onClose}
                          className="px-6 py-2.5 bg-[#1a1614] text-[#C8BDB1] text-[0.55rem] uppercase tracking-widest font-light hover:bg-[#60544D] transition-all"
                        >
                          Découvrir la collection
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Free Shipping Tracker */}
                        <div className="bg-[#E5DED2]/20 p-4.5 border border-[#C8BDB1]/30/35 rounded-sm">
                          <div className="flex items-center gap-2 mb-2 text-[#1a1614]">
                            <Truck className="w-3.5 h-3.5 text-[#A89982]" />
                            <span className="text-[0.65rem] tracking-wide font-light">
                              {isFreeShipping ? (
                                <span>Félicitations! Vous bénéficiez de la <strong>livraison express gratuite</strong>.</span>
                              ) : (
                                <span>
                                  Plus que <strong className="font-semibold">${remainingForFreeShipping.toFixed(0)} CAD</strong> avant la <strong>livraison gratuite</strong>.
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="w-full bg-[#ccc9c1]/30 h-[3px] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercent}%` }}
                              transition={{ duration: 0.6 }}
                              className="h-full bg-[#1a1614]"
                            />
                          </div>
                        </div>

                        {/* Items Stack */}
                        <div className="divide-y divide-[#ccc9c1]/30">
                          {cartItems.map((item) => (
                            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                              {/* Product miniature with nice background aspect ratio */}
                              <div className="w-20 h-26 bg-[#E5DED2]/20 border border-[#C8BDB1]/30/30 overflow-hidden flex-shrink-0 relative">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Item Description block */}
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-serif text-sm font-medium text-[#1a1614]">
                                      {item.product.name}
                                    </h4>
                                    <button
                                      onClick={() => onRemoveItem(item.id)}
                                      className="text-[0.55rem] uppercase tracking-wider text-[#A89982] hover:text-[#1a1614] transition-colors pl-2"
                                    >
                                      Enlever
                                    </button>
                                  </div>
                                  <p className="text-[0.62rem] text-[#A89982] tracking-wide uppercase mt-0.5">
                                    {item.product.variantName} &middot; Taille {item.selectedSize}
                                  </p>
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                  {/* Quantity adjusters */}
                                  <div className="flex items-center border border-[#C8BDB1]/30 rounded-sm bg-[#f0ece3] px-1">
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      className="p-1 px-1.5 text-[#A89982] hover:text-[#1a1614] transition-colors"
                                    >
                                      <Minus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="px-2 text-[0.68rem] font-mono font-medium">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      className="p-1 px-1.5 text-[#A89982] hover:text-[#1a1614] transition-colors"
                                    >
                                      <Plus className="w-2.5 h-2.5" />
                                    </button>
                                  </div>

                                  {/* Item Subtotal */}
                                  <span className="text-xs font-sans text-[#1a1614] tracking-wider">
                                    ${(item.product.price * item.quantity).toFixed(2)} {item.product.currency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cart Footer Panel */}
                  {cartItems.length > 0 && (
                    <div className="p-6 border-t border-[#C8BDB1]/30/50 bg-[#E5DED2]/20/50 space-y-4">
                      {/* Subtotal */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-sans text-[#ccc9c1] tracking-wider uppercase font-light">
                          <span>Livraison estimée</span>
                          <span className="text-[#1a1614] font-normal">
                            {isFreeShipping ? "Gratuite / Free" : "$15.00 CAD"}
                          </span>
                        </div>
                        <div className="flex justify-between text-base font-serif text-[#1a1614] tracking-wide pt-1 border-t border-[#C8BDB1]/30/20">
                          <span>Sous-total / Subtotal</span>
                          <span className="font-sans text-[0.95rem] font-normal">
                            ${subtotal.toFixed(2)} CAD
                          </span>
                        </div>
                      </div>

                      {/* Editorial prompt */}
                      <p className="text-[0.58rem] text-[#A89982] leading-relaxed text-center italic">
                        Chaque vêtement est inspecté individuellement, plié à l'aide de gants en coton, et expédié sous emballage kraft compostable sans plastique.
                      </p>

                      {/* Action Button */}
                      <div className="pt-2">
                        <button
                          disabled={isCheckingOut}
                          onClick={handleCheckoutMock}
                          className="w-full py-4 bg-[#1a1614] text-[#C8BDB1] text-[0.62rem] font-sans font-light tracking-[0.25em] uppercase hover:bg-[#60544D] transition-all disabled:opacity-75 relative flex items-center justify-center overflow-hidden"
                        >
                          {isCheckingOut ? (
                            <span className="flex items-center gap-2">
                              <span className="inline-block w-3.5 h-3.5 border-2 border-t-transparent border-[#f4f1ea]/80 rounded-full animate-spin" />
                              Traitement hautement sécurisé...
                            </span>
                          ) : (
                            <span>Procéder au paiement &middot; Checkout</span>
                          )}
                        </button>
                      </div>

                      {/* Secure guidelines */}
                      <div className="flex justify-center items-center gap-4 pt-1.5 text-[#A89982]">
                        <div className="flex items-center gap-1 text-[0.55rem] uppercase tracking-widest font-light">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Chiffrement SSL</span>
                        </div>
                        <div className="flex items-center gap-1 text-[0.55rem] uppercase tracking-widest font-light">
                          <Package className="w-3.5 h-3.5" />
                          <span>Emballage premium</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

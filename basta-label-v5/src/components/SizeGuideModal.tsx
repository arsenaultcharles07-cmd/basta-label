import React from "react";
import { X, Ruler, ClipboardList, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function SizeGuideModal({ isOpen, onClose, productName }: SizeGuideModalProps) {
  const isTrouser = productName.toLowerCase().includes("trouser");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#232323]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#FBF7F4] border border-[#A39382]/30 text-[#232323] p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] z-10"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1 text-[#E5DED2] hover:text-[#232323] transition-colors"
              aria-label="Cerrar size guide"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[0.55rem] font-medium tracking-[0.22em] text-[#A39382] uppercase block mb-1">
                Basta Label · Guide de Tailles
              </span>
              <h3 className="font-serif text-2xl font-light text-[#232323] tracking-wide flex items-center gap-3">
                <Ruler className="w-5 h-5 text-[#A39382]" />
                {isTrouser ? "The Trouser — Coupe & Mesures" : "The Henley — Coupe & Mesures"}
              </h3>
            </div>

            {/* Content Swapper */}
            {isTrouser ? (
              <div>
                <p className="text-xs text-[#A39382] leading-relaxed mb-6">
                  Nos pantalons en coton-lin subissent un procédé spécial d'adoucissement thermique en atelier pour un tombé lourd mais confortable dès le premier jour. Ils présentent une taille standard et un bas de jambe large contrôlé (Wide leg).
                </p>

                {/* Sizing Table */}
                <div className="overflow-x-auto border-t border-b border-[#A39382]/30/50 py-2 mb-6">
                  <table className="w-full text-left text-xs text-[#E5DED2]">
                    <thead>
                      <tr className="border-b border-[#A39382]/30/30 font-medium text-[#A39382] uppercase tracking-wider">
                        <th className="py-2.5">Taille (Size)</th>
                        <th className="py-2.5">Taille / Waist (cm)</th>
                        <th className="py-2.5 font-sans">Hanches / Hips (cm)</th>
                        <th className="py-2.5">Longueur / Inseam (cm)</th>
                        <th className="py-2.5">Bas / Leg Opening (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ccc9c1]/20 font-sans">
                      <tr>
                        <td className="py-3 font-semibold text-[#232323]">XS</td>
                        <td className="py-3">72 - 76</td>
                        <td className="py-3">94 - 98</td>
                        <td className="py-3">79</td>
                        <td className="py-3">25.5</td>
                      </tr>
                      <tr className="bg-[#574e46]/30/30">
                        <td className="py-3 font-semibold text-[#232323]">S</td>
                        <td className="py-3">77 - 81</td>
                        <td className="py-3">99 - 103</td>
                        <td className="py-3">80</td>
                        <td className="py-3">26.0</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-[#232323] font-medium text-black">M (Standard)</td>
                        <td className="py-3 font-medium">82 - 86</td>
                        <td className="py-3">104 - 108</td>
                        <td className="py-3">81</td>
                        <td className="py-3">26.5</td>
                      </tr>
                      <tr className="bg-[#574e46]/30/30">
                        <td className="py-3 font-semibold text-[#232323]">L</td>
                        <td className="py-3">87 - 91</td>
                        <td className="py-3">109 - 113</td>
                        <td className="py-3">81</td>
                        <td className="py-3">27.0</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-[#232323]">XL</td>
                        <td className="py-3">92 - 97</td>
                        <td className="py-3">114 - 119</td>
                        <td className="py-3">82</td>
                        <td className="py-3">27.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[#A39382] leading-relaxed mb-6">
                  Le Henley est tissé en interlock de Supima coton haut grammage, sculpté près des épaules et de la poitrine, s'élargissant doucement pour marquer la prestance. Rétrécissement négligeable après lavage à l'eau froide.
                </p>

                {/* Sizing Table */}
                <div className="overflow-x-auto border-t border-b border-[#A39382]/30/50 py-2 mb-6">
                  <table className="w-full text-left text-xs text-[#E5DED2]">
                    <thead>
                      <tr className="border-b border-[#A39382]/30/30 font-medium text-[#A39382] uppercase tracking-wider">
                        <th className="py-2.5">Taille (Size)</th>
                        <th className="py-2.5">Poitrine / Chest (cm)</th>
                        <th className="py-2.5">Épaules / Shoulder (cm)</th>
                        <th className="py-2.5">Manches / Sleeves (cm)</th>
                        <th className="py-2.5">Longueur / Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ccc9c1]/20 font-sans">
                      <tr>
                        <td className="py-3 font-semibold text-[#232323]">XS</td>
                        <td className="py-3">90 - 95</td>
                        <td className="py-3">42</td>
                        <td className="py-3">63</td>
                        <td className="py-3">67</td>
                      </tr>
                      <tr className="bg-[#574e46]/30/30">
                        <td className="py-3 font-semibold text-[#232323]">S</td>
                        <td className="py-3">96 - 101</td>
                        <td className="py-3">44</td>
                        <td className="py-3">64</td>
                        <td className="py-3">69</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-[#232323] font-medium text-black">M (Standard)</td>
                        <td className="py-3 font-medium">102 - 107</td>
                        <td className="py-3">46</td>
                        <td className="py-3">65</td>
                        <td className="py-3">71</td>
                      </tr>
                      <tr className="bg-[#574e46]/30/30">
                        <td className="py-3 font-semibold text-[#232323]">L</td>
                        <td className="py-3">108 - 113</td>
                        <td className="py-3">48</td>
                        <td className="py-3">66</td>
                        <td className="py-3">73</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-[#232323]">XL</td>
                        <td className="py-3">114 - 120</td>
                        <td className="py-3">50</td>
                        <td className="py-3">67</td>
                        <td className="py-3">75</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Measurement Tips */}
            <div className="bg-[#574e46]/30 p-4 border-l-2 border-[#888580] mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#232323] flex items-center gap-1.5 mb-1.5">
                <Info className="w-3.5 h-3.5" />
                Conseil de notre styliste (Fit Counsel)
              </h4>
              <p className="text-[0.7rem] text-[#E5DED2] leading-relaxed">
                {isTrouser 
                  ? "Nos pantalons tombent naturellement à la perfection pour un look décontracté haut de gamme. Nous vous recommandons de choisir votre taille habituelle d'après la grille ci-dessus. Si vous êtes entre deux tailles d'entrejambe, prenez la taille supérieure pour maximiser le glissement fluide du lin." 
                  : "Le Henley est coupé légèrement sculpté au niveau des bras. Si vous pratiquez l'entraînement physique intensif et préférez un ajustement ample, n'hésitez pas à surtailler de un niveau pour libérer les mouvements."}
              </p>
            </div>

            {/* Packaging Narrative */}
            <div className="text-center font-serif italic text-xs text-[#A39382] py-1 border-t border-[#A39382]/30/30">
              Chaque pièce est pliée à la main et emballée dans notre boîte étanche parfumée à la cire organique.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { Product, FAQItem, SocialProof } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "bast-01-navy-trouser",
    name: "The Trouser",
    variantName: "Navy",
    variantColorCode: "#1c2438",
    price: 145,
    currency: "CAD",
    description: "A single-pleat, clean-waisted trouser with a perfectly balanced wide-leg silhouette. Constructed with a mid-rise fit that sits comfortably both with and without a belt.",
    details: [
      "Custom single-pleat front panel for an elegant masculine drape",
      "Tailor-finished blind hem for refined minimalist lines",
      "Subtle side-seam pockets and double-welt rear pockets",
      "Authentic tortoise-shell look resin buttons with internal anchor stitch",
      "Comfort mid-rise with reinforced canvas waist structure"
    ],
    fabricSpecs: {
      composition: "80% Long-staple Cotton · 20% Organic Flax Linen",
      weight: "300 GSM (Luxuriously heavy yet breathable)",
      fit: "Wide Leg · Relaxed Tailored Fit",
      care: "Cold gentle wash, reshape, flat dry in shade. Warm iron if desired."
    },
    image: "/images/basta_navy_trouser_1779996846955.png",
    secondaryImages: [
      "/images/basta_navy_trouser_1779996846955.png",
      "/images/basta_fabric_detail_1779996918283.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "bast-01-bordeaux-trouser",
    name: "The Trouser",
    variantName: "Bordeaux",
    variantColorCode: "#3d1a18",
    price: 145,
    currency: "CAD",
    description: "Our signature wide-leg single-pleat trouser rendered in a deep, desaturated bordeaux. Designed with clean side pockets and a robust drape that ages beautifully.",
    details: [
      "Single-pleat front panel for timeless structured presence",
      "Finished internals with customized brand bias piping",
      "Reinforced heavy pocket bags engineered to prevent external bloating",
      "Slightly heavier organic cotton-linen blend displaying beautiful color slubs",
      "Refined zip closure with a secure double-bar sliding waist hook"
    ],
    fabricSpecs: {
      composition: "80% Long-staple Cotton · 20% Organic Flax Linen",
      weight: "300 GSM (Highly textured, structured drape)",
      fit: "Wide Leg · Relaxed Custom Tailored Fit",
      care: "Machine wash cold inside out, cycle délicat, line dry."
    },
    image: "/images/basta_bordeaux_trouser_1779996873619.png",
    secondaryImages: [
      "/images/basta_bordeaux_trouser_1779996873619.png",
      "/images/basta_fabric_detail_1779996918283.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "bast-01-cream-henley",
    name: "The Henley",
    variantName: "Off-white",
    variantColorCode: "#ede9df",
    price: 98,
    currency: "CAD",
    description: "A meticulously patterned short-sleeve henley with a 3-button sculpted placket. Features a subtle, high-density minimal print of the 'BASTA LABEL' logo underneath the rear neckline.",
    details: [
      "Premium interlock double-knit pique structure that retains shape",
      "Curated 3-button neckline finished with heavy herringbone placket tape",
      "Short-sleeve silhouette with fine flatlock stitched sleeve cuffs",
      "Authentic signature BASTA logo imprint centered on the upper outer back neck",
      "Fishtail hem to guarantee a clean hang when styled untucked"
    ],
    fabricSpecs: {
      composition: "100% California-grown Supima Cotton",
      weight: "260 GSM (Extremely dense structure, ultra-soft touch)",
      fit: "Relaxed Athletic · Tailored Neckline and Chest",
      care: "Cold wash with like colors, air dry or tumble dry low."
    },
    image: "/images/basta_cream_henley_1779996901259.png",
    secondaryImages: [
      "/images/basta_cream_henley_1779996901259.png",
      "/images/basta_fabric_detail_1779996918283.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "bast-01-bordeaux-henley",
    name: "The Henley",
    variantName: "Bordeaux",
    variantColorCode: "#7a1a1c",
    price: 98,
    currency: "CAD",
    description: "Our signature short-sleeve henley presented in a rich, desaturated garnet red. Featuring a 3-button placket and the minimal high-density logo signature printed below the back neck collar.",
    details: [
      "Richly dyed luxury red yarn utilizing an organic low-impact color process",
      "Distinctive 3-button placket designed for high postural versatility",
      "Slightly ribbed comfort collar designed to resist collapsing",
      "Authentic signature BASTA logo imprint centered on the upper outer back neck",
      "Breathable interlock weave offering high heat-regulation properties"
    ],
    fabricSpecs: {
      composition: "100% California-grown Supima Cotton",
      weight: "260 GSM (Dense knit structure, luxurious drape)",
      fit: "Relaxed Athletic · Tailored Neckline and Chest",
      care: "Wash inside out cold with like colors, air dry."
    },
    image: "/images/basta_bordeaux_henley_1779997542427.png",
    secondaryImages: [
      "/images/basta_bordeaux_henley_1779997542427.png",
      "/images/basta_fabric_detail_1779996918283.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-size",
    question: "Comment choisir ma taille / How do I select my size?",
    answer: "The Trouser est conçu avec une taille standard mais une jambe large épurée. Nos pièces respectent la taille idéale du corps standard nord-américain. Si vous préférez une esthétique plus fluide et relaxée avec plus de longueur sur la cheville, nous vous recommandons de prendre votre taille habituelle. Pour une silhouette plus ajustée, prenez une taille en-dessous."
  },
  {
    id: "faq-shipping",
    question: "Quels sont les délais de livraison / What are the shipping times?",
    answer: "Toutes les capsules de Basta Label sont minutieusement emballées et expédiées depuis nos centres. Pour le Canada, comptez 2 à 5 jours ouvrables. Pour les États-Unis et l'Europe, comptez 5 à 9 jours ouvrables. Vous recevrez un numéro de suivi immédiatement après l'expédition."
  },
  {
    id: "faq-wash",
    question: "Le tissu coton-lin rétrécira-t-il au lavage / Will the fabric shrink?",
    answer: "Notre mélange unique coton-lin 300GSM subit un cycle de pré-rétrécissement thermique spécialisé en atelier avant la phase finale de confection. Le rétrécissement résiduel est ainsi inférieur à 1.5%. Veuillez utiliser un lavage à froid délicat (30° maximum) et laisser sécher à plat à l'air libre pour préserver la structure naturelle du lin."
  },
  {
    id: "faq-returns",
    question: "Puis-je retourner ou échanger ma commande / Can I return items?",
    answer: "Nous militons pour une consommation consciente. Cependant, si la coupe ne correspond pas parfaitement à votre prestance, vous pouvez retourner ou échanger vos articles non portés, non lavés, dans un délai de 14 jours suivant la réception."
  },
  {
    id: "faq-international",
    question: "Livrez-vous en dehors du Canada / International Shipping?",
    answer: "Absolument. Nous expédions dans le monde entier (États-Unis, Europe, Royaume-Uni, Japon, Corée). Notre système intègre automatiquement le calcul des taxes douanières sans mauvaise surprise lors de la livraison finale de votre colis."
  }
];

export const SOCIALS: SocialProof[] = [
  {
    id: "sc-1",
    username: "Marcus Sterling",
    handle: "@marcus.v",
    image: "sc-bg-1",
    caption: "The fit is immaculate. No logos, just perfect natural flow."
  },
  {
    id: "sc-2",
    username: "Kenji Sato",
    handle: "@kenji_minimalist",
    image: "sc-bg-2",
    caption: "The 300GSM linen trouser holds structure extremely well on warm nights."
  },
  {
    id: "sc-3",
    username: "Alexei Petrov",
    handle: "@alexei.style",
    image: "sc-bg-3",
    caption: "Off-white Supima Henley. Finally a t-shirt that sits heavy on the chest."
  },
  {
    id: "sc-4",
    username: "Julien Moreau",
    handle: "@julien.basta",
    image: "sc-bg-4",
    caption: "Scandinavian editorial look. Elegant masculinity in the stone-arched city."
  }
];

export const BRAND_VALUES = [
  {
    num: "01",
    title: "Aucun excès.",
    desc: "Nous concevons uniquement 3 à 5 pièces intemporelles par drop. Chaque silhouette est étudiée pour garantir une présence indiscutable sans encombrement inutile."
  },
  {
    num: "02",
    title: "Silhouettes éternelles.",
    desc: "Le vacarme des tendances saisonnières ne nous concerne pas. Nous façonnons des lignes pures et architecturales faites pour traverser les générations."
  },
  {
    num: "03",
    title: "Sourcing sans compromis.",
    desc: "Coton Supima de Californie, Lin biologique. Nous connaissons le producteur de chaque bobine."
  },
  {
    num: "04",
    title: "Zéro logo.",
    desc: "Les vêtements de luxe parlent à voix basse. La confiance en soi réside dans la coupe, pas l'enseigne."
  }
];

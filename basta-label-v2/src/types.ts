export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  originalPrice?: number;
  variantName: string;
  variantColorCode: string;
  description: string;
  details: string[];
  fabricSpecs: {
    composition: string;
    weight: string;
    fit: string;
    care: string;
  };
  image: string;
  secondaryImages: string[];
  sizes: string[];
}

export interface CartItem {
  id: string; // unique hash of product + size
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SocialProof {
  id: string;
  username: string;
  handle: string;
  image: string;
  caption: string;
}

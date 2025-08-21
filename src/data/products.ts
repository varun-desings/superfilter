export type Product = {
  slug: string;
  name: string;
  category?: string;
  cover?: string;
  images?: string[];
  description?: string;
  specs?: {
    width_mm?: number;
    height_mm?: number;
    depth_mm?: number;
    thickness_mm?: number;
    weight_kg?: number;
    techniques?: string;
    dimensions_text?: string;
  };
};

// Minimal stub to keep the app working without products.json.
// Add/adjust items as needed. Order matches Products.tsx desiredOrder.
export const products: Product[] = [
  {
    slug: "bibi",
    name: "Huile Moteur SHELL Helix HX7 10W40",
    category: "bibi",
    cover: "/placeholder.svg",
    images: [],
  },
  { slug: "square", name: "Huile Moteur KENNOL XTURBO 15W50", category: "square", cover: "/placeholder.svg" },
  { slug: "victoria", name: "Huile Moteur ACCOR HUSYNN 10W40", category: "victoria", cover: "/placeholder.svg" },
  { slug: "done3d", name: "Huile Moteur YACCO VX 600 5W30", category: "done3d", cover: "/placeholder.svg" },
  { slug: "done", name: "Huile Moteur YACCO VX 1000 LE 5W30 C2/C3", category: "done", cover: "/placeholder.svg" },
  { slug: "mezzo", name: "Huile Moteur SHELL HELIX ULTRA PRO AV-L 0W20", category: "mezzo", cover: "/placeholder.svg" },
  { slug: "trap", name: "Huile Moteur SHELL Helix HX5 15W40", category: "trap", cover: "/placeholder.svg" },
  { slug: "trapx", name: "Huile Moteur YACCO VX 1000 LL 0W40", category: "trapx", cover: "/placeholder.svg" },
  { slug: "fino", name: "Huile Moteur Motul 8100 X-cess Gen2 5W-40 – Bidon 5 L", category: "fino", cover: "/placeholder.svg" }
];

export default products;
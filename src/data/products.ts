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
  { slug: "square", name: "square", category: "square", cover: "/placeholder.svg" },
  { slug: "victoria", name: "victoria", category: "victoria", cover: "/placeholder.svg" },
  { slug: "done3d", name: "Done 3D", category: "Done 3D", cover: "/placeholder.svg" },
  { slug: "done", name: "DONE", category: "DONE", cover: "/placeholder.svg" },
  { slug: "mezzo", name: "Mezzo", category: "Mezzo", cover: "/placeholder.svg" },
  { slug: "trap", name: "Trap", category: "Trap", cover: "/placeholder.svg" },
  { slug: "trapx", name: "Trap X", category: "Trap X", cover: "/placeholder.svg" },
  { slug: "fino", name: "Fino", category: "Fino", cover: "/placeholder.svg" },
  { slug: "fleur", name: "Fleur", category: "Fleur", cover: "/placeholder.svg" },
  { slug: "petal", name: "Petal", category: "Petal", cover: "/placeholder.svg" },
  { slug: "45", name: "45", category: "45", cover: "/placeholder.svg" },
  { slug: "jk1", name: "JK1", category: "JK1", cover: "/placeholder.svg" },
  { slug: "jk2", name: "JK2", category: "JK2", cover: "/placeholder.svg" },
  { slug: "scarpa", name: "Scarpa", category: "Scarpa", cover: "/placeholder.svg" },
  { slug: "jk3", name: "JK3", category: "JK3", cover: "/placeholder.svg" },
  { slug: "jk4", name: "JK4", category: "JK4", cover: "/placeholder.svg" },
  { slug: "jk30", name: "JK30", category: "JK30", cover: "/placeholder.svg" },
  { slug: "jk25", name: "JK25", category: "JK25", cover: "/placeholder.svg" },
  { slug: "tozeur", name: "Tozeur", category: "Tozeur", cover: "/placeholder.svg" },
  { slug: "triangle", name: "Triangle", category: "Triangle", cover: "/placeholder.svg" },
  { slug: "venicien", name: "Venicien", category: "Venicien", cover: "/placeholder.svg" },
  { slug: "delta", name: "Delta", category: "Delta", cover: "/placeholder.svg" },
  { slug: "telga", name: "Telga", category: "Telga", cover: "/placeholder.svg" },
];

export default products;
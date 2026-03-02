export interface Category {
  id: string;
  name: string;
  gender: "women" | "men";
  image: string;
  designCount: number;
}

export interface Design {
  id: string;
  name: string;
  categoryId: string;
  gender: "women" | "men";
  colors: { body: string; sleeve: string; border: string };
  pattern: string;
  fabric: string;
  image: string;
}

export interface SavedDesign {
  id: string;
  designId: string;
  name: string;
  colors: { body: string; sleeve: string; border: string };
  pattern: string;
  measurements: Measurements | null;
  fabricInfo: FabricInfo | null;
}

export interface Measurements {
  chest: number;
  waist: number;
  hips: number;
  shoulder: number;
  armLength: number;
  height: number;
  inseam: number;
}

export interface FabricInfo {
  fabricType: string;
  totalMeters: number;
  breakdown: { part: string; meters: number }[];
}

export const categories: Category[] = [
  // Women
  { id: "blouses", name: "Blouses", gender: "women", image: "https://images.unsplash.com/photo-1595777229583-94d988f4b6b8?auto=format&fit=crop&w=1200&q=80", designCount: 12 },
  { id: "sarees", name: "Sarees", gender: "women", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80", designCount: 18 },
  { id: "kurthi", name: "Kurthi", gender: "women", image: "https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=1200&q=80", designCount: 15 },
  { id: "lehenga", name: "Lehenga", gender: "women", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=80", designCount: 10 },
  { id: "sharara", name: "Sharara", gender: "women", image: "https://images.unsplash.com/photo-1626208189674-ddba8eb92f2f?auto=format&fit=crop&w=1200&q=80", designCount: 8 },
  { id: "western-tops", name: "Western Tops", gender: "women", image: "https://images.unsplash.com/photo-1505299726314-52581002a659?auto=format&fit=crop&w=1200&q=80", designCount: 14 },
  { id: "crop-tops", name: "Crop Tops", gender: "women", image: "https://images.unsplash.com/photo-1516762689617-e1cffff0bdf5?auto=format&fit=crop&w=1200&q=80", designCount: 11 },
  { id: "w-jeans", name: "Jeans", gender: "women", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80", designCount: 9 },
  { id: "w-pants", name: "Pants", gender: "women", image: "https://images.unsplash.com/photo-1506629082632-11c92a3fcba3?auto=format&fit=crop&w=1200&q=80", designCount: 7 },
  // Men
  { id: "m-shirts", name: "Shirts", gender: "men", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80", designCount: 16 },
  { id: "m-tshirts", name: "T-Shirts", gender: "men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80", designCount: 14 },
  { id: "m-kurtas", name: "Kurtas", gender: "men", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1200&q=80", designCount: 12 },
  { id: "m-pants", name: "Pants", gender: "men", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80", designCount: 12 },
  { id: "m-jeans", name: "Jeans", gender: "men", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80", designCount: 11 },
  { id: "m-dhoti", name: "Dhoti", gender: "men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80", designCount: 8 },
];

const colorSets = [
  { body: "#8B1A4A", sleeve: "#A0285C", border: "#D4A853" },
  { body: "#1A3A5C", sleeve: "#1E4670", border: "#C0C0C0" },
  { body: "#2D5016", sleeve: "#3A6B1E", border: "#D4A853" },
  { body: "#5C1A1A", sleeve: "#7A2222", border: "#F0C674" },
  { body: "#1A1A5C", sleeve: "#28287A", border: "#E8D5B7" },
  { body: "#5C3A1A", sleeve: "#7A4E22", border: "#F5E6D0" },
  { body: "#800020", sleeve: "#990033", border: "#FFD700" },
  { body: "#2E0854", sleeve: "#3D0B6E", border: "#C0A0D0" },
  { body: "#004D40", sleeve: "#00695C", border: "#A0D6B4" },
  { body: "#BF360C", sleeve: "#D84315", border: "#FFE0B2" },
  { body: "#E91E63", sleeve: "#F06292", border: "#FCE4EC" },
  { body: "#FF6F00", sleeve: "#FF8F00", border: "#FFF8E1" },
];

const patterns = ["solid", "stripes", "dots", "checks", "floral", "paisley"];
const fabrics = ["Silk", "Cotton", "Chiffon", "Georgette", "Linen", "Velvet", "Satin", "Crepe"];

export const designs: Design[] = [];

categories.forEach((cat) => {
  for (let i = 0; i < cat.designCount; i++) {
    const colorSet = colorSets[i % colorSets.length];
    designs.push({
      id: `${cat.id}-${i + 1}`,
      name: `${cat.name} Design ${i + 1}`,
      categoryId: cat.id,
      gender: cat.gender,
      colors: { ...colorSet },
      pattern: patterns[i % patterns.length],
      fabric: fabrics[i % fabrics.length],
      image: cat.image,
    });
  }
});

export const availablePatterns = [
  { id: "solid", name: "Solid", className: "" },
  { id: "stripes", name: "Stripes", className: "pattern-stripes" },
  { id: "dots", name: "Polka Dots", className: "pattern-dots" },
  { id: "checks", name: "Checks", className: "pattern-checks" },
  { id: "floral", name: "Floral", className: "pattern-floral" },
  { id: "paisley", name: "Paisley", className: "pattern-paisley" },
  { id: "zigzag", name: "Zigzag", className: "pattern-zigzag" },
];

export const availableColors = [
  "#8B1A4A", "#B71C1C", "#880E4F", "#4A148C", "#1A237E",
  "#0D47A1", "#006064", "#1B5E20", "#33691E", "#F57F17",
  "#E65100", "#BF360C", "#3E2723", "#212121", "#CFB53B",
  "#D4A853", "#FFD700", "#C0C0C0", "#F5E6D0", "#FFFFFF",
  "#E91E63", "#9C27B0", "#673AB7", "#2196F3", "#009688",
  "#4CAF50", "#CDDC39", "#FF9800", "#FF5722", "#795548",
];

export function calculateFabric(measurements: Measurements, categoryId: string): FabricInfo {
  const isTop = ["blouses", "kurthi", "western-tops", "crop-tops", "m-shirts", "m-tshirts", "m-kurtas"].includes(categoryId);
  const isBottom = ["w-pants", "w-jeans", "m-pants", "m-jeans", "m-dhoti"].includes(categoryId);
  const isFull = ["sarees", "lehenga", "sharara"].includes(categoryId);

  let fabricType = "Cotton";
  let breakdown: { part: string; meters: number }[] = [];

  if (isFull) {
    fabricType = "Silk";
    breakdown = [
      { part: "Main Body", meters: +(measurements.height * 0.04 + 2).toFixed(1) },
      { part: "Border", meters: 1.5 },
      { part: "Pleats/Drape", meters: 2.0 },
    ];
  } else if (isTop) {
    fabricType = "Cotton";
    breakdown = [
      { part: "Body", meters: +((measurements.chest / 100) * 1.5 + 0.5).toFixed(1) },
      { part: "Sleeves", meters: +((measurements.armLength / 100) * 2 + 0.3).toFixed(1) },
      { part: "Collar/Neck", meters: 0.3 },
    ];
  } else if (isBottom) {
    fabricType = "Cotton";
    breakdown = [
      { part: "Front Panels", meters: +((measurements.inseam / 100) + 0.5).toFixed(1) },
      { part: "Back Panels", meters: +((measurements.inseam / 100) + 0.5).toFixed(1) },
      { part: "Waistband", meters: 0.3 },
    ];
  }

  const totalMeters = breakdown.reduce((sum, b) => sum + b.meters, 0);

  return { fabricType, totalMeters: +totalMeters.toFixed(1), breakdown };
}


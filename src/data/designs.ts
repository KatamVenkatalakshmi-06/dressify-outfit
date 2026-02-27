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
  { id: "blouses", name: "Blouses", gender: "women", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop", designCount: 50 },
  { id: "sarees", name: "Sarees", gender: "women", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop", designCount: 50 },
  { id: "kurthi", name: "Kurthi", gender: "women", image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop", designCount: 50 },
  { id: "lehenga", name: "Lehenga", gender: "women", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop", designCount: 50 },
  { id: "sharara", name: "Sharara", gender: "women", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop", designCount: 50 },
  { id: "western-tops", name: "Western Tops", gender: "women", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=800&fit=crop", designCount: 50 },
  { id: "crop-tops", name: "Crop Tops", gender: "women", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop", designCount: 50 },
  { id: "w-jeans", name: "Jeans", gender: "women", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop", designCount: 50 },
  { id: "w-pants", name: "Pants", gender: "women", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop", designCount: 50 },
  // Men
  { id: "m-pants", name: "Pants", gender: "men", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop", designCount: 50 },
  { id: "short-kurthi", name: "Short Kurthi", gender: "men", image: "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&h=800&fit=crop", designCount: 50 },
  { id: "long-kurthi", name: "Long Kurthi", gender: "men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop", designCount: 50 },
  { id: "shirts", name: "Shirts", gender: "men", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop", designCount: 50 },
  { id: "m-jeans", name: "Jeans", gender: "men", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop", designCount: 50 },
  { id: "dhoti", name: "Dhoti", gender: "men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", designCount: 50 },
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

// Design image pools per category
const designImages: Record<string, string[]> = {
  blouses: [
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop",
  ],
  sarees: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop",
  ],
  kurthi: [
    "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop",
  ],
  lehenga: [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop",
  ],
  sharara: [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=500&fit=crop",
  ],
  "western-tops": [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop",
  ],
  "crop-tops": [
    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop",
  ],
  "w-jeans": [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=500&fit=crop",
  ],
  "w-pants": [
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=500&fit=crop",
  ],
  "m-pants": [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=500&fit=crop",
  ],
  "short-kurthi": [
    "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop",
  ],
  "long-kurthi": [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop",
  ],
  shirts: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop",
  ],
  "m-jeans": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=500&fit=crop",
  ],
  dhoti: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop",
  ],
};

const designNames: Record<string, string[]> = {
  blouses: ["Classic Silk", "Embroidered", "Brocade", "Zari Work", "Mirror Work", "Boat Neck", "Backless", "Puff Sleeve", "Halter", "Princess Cut"],
  sarees: ["Banarasi", "Kanjeevaram", "Chiffon", "Georgette", "Tussar", "Patola", "Bandhani", "Chanderi", "Mysore Silk", "Paithani"],
  kurthi: ["Anarkali", "A-Line", "Straight Cut", "Asymmetric", "Layered", "Angrakha", "Shirt Style", "Kaftan", "Floor Length", "Jacket Style"],
  lehenga: ["Bridal", "A-Line", "Circular", "Mermaid", "Paneled", "Tiered", "Ruffled", "Cape", "Indo-Western", "Sharara Lehenga"],
  sharara: ["Classic", "Gharara", "Palazzo", "Flared", "Pleated", "Embroidered", "Printed", "Layered", "Indo-Western", "Festive"],
  "western-tops": ["Peplum", "Off-Shoulder", "Wrap", "Blazer", "Corset", "Tube", "Bodysuit", "Crop Blazer", "Ruched", "Asymmetric"],
  "crop-tops": ["Bandeau", "Halter", "Tied", "Bralette", "Mesh", "Sequin", "Ribbed", "Cutout", "Ruffle", "Strappy"],
  "w-jeans": ["Skinny", "Bootcut", "Wide Leg", "Mom Jeans", "Boyfriend", "Flared", "Straight", "Cropped", "High Rise", "Distressed"],
  "w-pants": ["Palazzo", "Cigarette", "Culottes", "Jogger", "Cargo", "Pleated", "Paper Bag", "Wide Leg", "Tapered", "Harem"],
  "m-pants": ["Chinos", "Formal", "Cargo", "Jogger", "Pleated", "Slim Fit", "Regular", "Tapered", "Cropped", "Linen"],
  "short-kurthi": ["Pathani", "Angrakha", "Chinese Collar", "Nehru", "Printed", "Embroidered", "Plain", "Asymmetric", "Layered", "Jacket"],
  "long-kurthi": ["Classic", "Achkan", "Sherwani Style", "A-Line", "Layered", "Embroidered", "Printed", "Festive", "Wedding", "Casual"],
  shirts: ["Oxford", "Linen", "Denim", "Formal", "Casual", "Hawaiian", "Mandarin", "Slim Fit", "Regular", "Checkered"],
  "m-jeans": ["Slim", "Straight", "Bootcut", "Relaxed", "Skinny", "Tapered", "Regular", "Distressed", "Dark Wash", "Light Wash"],
  dhoti: ["Classic", "Festive", "Silk", "Cotton", "Printed", "Embroidered", "Wedding", "Casual", "Pleated", "Modern"],
};

export const designs: Design[] = [];

categories.forEach((cat) => {
  const catImages = designImages[cat.id] || [];
  const catNames = designNames[cat.id] || [];
  for (let i = 0; i < cat.designCount; i++) {
    const colorSet = colorSets[i % colorSets.length];
    const nameBase = catNames[i % catNames.length];
    const nameNum = Math.floor(i / catNames.length) + 1;
    designs.push({
      id: `${cat.id}-${i + 1}`,
      name: nameNum > 1 ? `${nameBase} ${nameNum}` : nameBase,
      categoryId: cat.id,
      gender: cat.gender,
      colors: { ...colorSet },
      pattern: patterns[i % patterns.length],
      fabric: fabrics[i % fabrics.length],
      image: catImages[i % catImages.length],
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
  const isTop = ["blouses", "kurthi", "western-tops", "crop-tops", "shirts", "short-kurthi", "long-kurthi"].includes(categoryId);
  const isBottom = ["w-pants", "w-jeans", "m-pants", "m-jeans", "dhoti"].includes(categoryId);
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

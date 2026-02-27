import blouseImg from "@/assets/categories/blouse.jpg";
import blouseImg2 from "@/assets/categories/blouse-2.jpg";
import blouseImg3 from "@/assets/categories/blouse-3.jpg";
import sareeImg from "@/assets/categories/saree.jpg";
import sareeImg2 from "@/assets/categories/saree-2.jpg";
import sareeImg3 from "@/assets/categories/saree-3.jpg";
import kurthiImg from "@/assets/categories/kurthi.jpg";
import kurthiImg2 from "@/assets/categories/kurthi-2.jpg";
import kurthiImg3 from "@/assets/categories/kurthi-3.jpg";
import lehengaImg from "@/assets/categories/lehenga.jpg";
import lehengaImg2 from "@/assets/categories/lehenga-2.jpg";
import lehengaImg3 from "@/assets/categories/lehenga-3.jpg";
import shararaImg from "@/assets/categories/sharara.jpg";
import shararaImg2 from "@/assets/categories/sharara-2.jpg";
import shararaImg3 from "@/assets/categories/sharara-3.jpg";
import westernTopImg from "@/assets/categories/western-top.jpg";
import westernTopImg2 from "@/assets/categories/western-top-2.jpg";
import westernTopImg3 from "@/assets/categories/western-top-3.jpg";
import cropTopImg from "@/assets/categories/crop-top.jpg";
import cropTopImg2 from "@/assets/categories/crop-top-2.jpg";
import cropTopImg3 from "@/assets/categories/crop-top-3.jpg";
import wJeansImg from "@/assets/categories/w-jeans.jpg";
import wJeansImg2 from "@/assets/categories/w-jeans-2.jpg";
import wJeansImg3 from "@/assets/categories/w-jeans-3.jpg";
import wPantsImg from "@/assets/categories/w-pants.jpg";
import wPantsImg2 from "@/assets/categories/w-pants-2.jpg";
import wPantsImg3 from "@/assets/categories/w-pants-3.jpg";
import mPantsImg from "@/assets/categories/m-pants.jpg";
import mPantsImg2 from "@/assets/categories/m-pants-2.jpg";
import mPantsImg3 from "@/assets/categories/m-pants-3.jpg";
import shortKurthiImg from "@/assets/categories/short-kurthi.jpg";
import shortKurthiImg2 from "@/assets/categories/short-kurthi-2.jpg";
import shortKurthiImg3 from "@/assets/categories/short-kurthi-3.jpg";
import longKurthiImg from "@/assets/categories/long-kurthi.jpg";
import longKurthiImg2 from "@/assets/categories/long-kurthi-2.jpg";
import longKurthiImg3 from "@/assets/categories/long-kurthi-3.jpg";
import shirtImg from "@/assets/categories/shirt.jpg";
import shirtImg2 from "@/assets/categories/shirt-2.jpg";
import shirtImg3 from "@/assets/categories/shirt-3.jpg";
import mJeansImg from "@/assets/categories/m-jeans.jpg";
import mJeansImg2 from "@/assets/categories/m-jeans-2.jpg";
import mJeansImg3 from "@/assets/categories/m-jeans-3.jpg";
import dhotiImg from "@/assets/categories/dhoti.jpg";
import dhotiImg2 from "@/assets/categories/dhoti-2.jpg";
import dhotiImg3 from "@/assets/categories/dhoti-3.jpg";

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
  { id: "blouses", name: "Blouses", gender: "women", image: blouseImg, designCount: 50 },
  { id: "sarees", name: "Sarees", gender: "women", image: sareeImg, designCount: 50 },
  { id: "kurthi", name: "Kurthi", gender: "women", image: kurthiImg, designCount: 50 },
  { id: "lehenga", name: "Lehenga", gender: "women", image: lehengaImg, designCount: 50 },
  { id: "sharara", name: "Sharara", gender: "women", image: shararaImg, designCount: 50 },
  { id: "western-tops", name: "Western Tops", gender: "women", image: westernTopImg, designCount: 50 },
  { id: "crop-tops", name: "Crop Tops", gender: "women", image: cropTopImg, designCount: 50 },
  { id: "w-jeans", name: "Jeans", gender: "women", image: wJeansImg, designCount: 50 },
  { id: "w-pants", name: "Pants", gender: "women", image: wPantsImg, designCount: 50 },
  // Men
  { id: "m-pants", name: "Pants", gender: "men", image: mPantsImg, designCount: 50 },
  { id: "short-kurthi", name: "Short Kurthi", gender: "men", image: shortKurthiImg, designCount: 50 },
  { id: "long-kurthi", name: "Long Kurthi", gender: "men", image: longKurthiImg, designCount: 50 },
  { id: "shirts", name: "Shirts", gender: "men", image: shirtImg, designCount: 50 },
  { id: "m-jeans", name: "Jeans", gender: "men", image: mJeansImg, designCount: 50 },
  { id: "dhoti", name: "Dhoti", gender: "men", image: dhotiImg, designCount: 50 },
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

// 3 images per category for design variety
const categoryImages: Record<string, string[]> = {
  blouses: [blouseImg, blouseImg2, blouseImg3],
  sarees: [sareeImg, sareeImg2, sareeImg3],
  kurthi: [kurthiImg, kurthiImg2, kurthiImg3],
  lehenga: [lehengaImg, lehengaImg2, lehengaImg3],
  sharara: [shararaImg, shararaImg2, shararaImg3],
  "western-tops": [westernTopImg, westernTopImg2, westernTopImg3],
  "crop-tops": [cropTopImg, cropTopImg2, cropTopImg3],
  "w-jeans": [wJeansImg, wJeansImg2, wJeansImg3],
  "w-pants": [wPantsImg, wPantsImg2, wPantsImg3],
  "m-pants": [mPantsImg, mPantsImg2, mPantsImg3],
  "short-kurthi": [shortKurthiImg, shortKurthiImg2, shortKurthiImg3],
  "long-kurthi": [longKurthiImg, longKurthiImg2, longKurthiImg3],
  shirts: [shirtImg, shirtImg2, shirtImg3],
  "m-jeans": [mJeansImg, mJeansImg2, mJeansImg3],
  dhoti: [dhotiImg, dhotiImg2, dhotiImg3],
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
  const images = categoryImages[cat.id] || [cat.image];
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
      image: images[i % images.length],
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

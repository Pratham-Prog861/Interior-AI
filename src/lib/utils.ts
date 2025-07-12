import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data for construction materials
export const constructionMaterials = [
  { name: "Bricks", unit: "pieces", pricePerUnit: 8, category: "masonry" },
  { name: "Cement", unit: "bags", pricePerUnit: 350, category: "masonry" },
  { name: "Sand", unit: "cubic meters", pricePerUnit: 1200, category: "masonry" },
  { name: "Steel", unit: "kg", pricePerUnit: 65, category: "structural" },
  { name: "Concrete", unit: "cubic meters", pricePerUnit: 4500, category: "structural" },
  { name: "Paint", unit: "liters", pricePerUnit: 180, category: "finishing" },
  { name: "Tiles", unit: "sq ft", pricePerUnit: 45, category: "finishing" },
  { name: "Electrical Wiring", unit: "meters", pricePerUnit: 25, category: "electrical" },
  { name: "Plumbing Pipes", unit: "meters", pricePerUnit: 120, category: "plumbing" },
  { name: "Windows", unit: "pieces", pricePerUnit: 2500, category: "fixtures" },
  { name: "Doors", unit: "pieces", pricePerUnit: 3500, category: "fixtures" },
];

// Mock data for interior items
export const interiorItems = [
  { name: "Bed", category: "furniture", priceRange: { min: 8000, max: 25000 }, placement: "bedroom" },
  { name: "Sofa", category: "furniture", priceRange: { min: 15000, max: 45000 }, placement: "living room" },
  { name: "Dining Table", category: "furniture", priceRange: { min: 12000, max: 35000 }, placement: "dining room" },
  { name: "Wardrobe", category: "storage", priceRange: { min: 18000, max: 50000 }, placement: "bedroom" },
  { name: "Kitchen Cabinet", category: "storage", priceRange: { min: 25000, max: 80000 }, placement: "kitchen" },
  { name: "Ceiling Fan", category: "appliances", priceRange: { min: 2000, max: 8000 }, placement: "all rooms" },
  { name: "Air Conditioner", category: "appliances", priceRange: { min: 25000, max: 60000 }, placement: "bedroom/living room" },
  { name: "Refrigerator", category: "appliances", priceRange: { min: 20000, max: 50000 }, placement: "kitchen" },
  { name: "Washing Machine", category: "appliances", priceRange: { min: 15000, max: 40000 }, placement: "utility area" },
  { name: "Television", category: "electronics", priceRange: { min: 15000, max: 80000 }, placement: "living room" },
];

// Mock analysis function
export async function analyzeImage(imageFile: File, type: 'construction' | 'interior') {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const roomArea = Math.floor(Math.random() * 200) + 100; // 100-300 sq ft
  const roomType = type === 'construction' ? 'new construction' : 'interior renovation';
  
  // Generate construction materials estimate
  const constructionEstimate = constructionMaterials.map(material => {
    const quantity = Math.floor(Math.random() * 100) + 10;
    const totalCost = quantity * material.pricePerUnit;
    return {
      ...material,
      quantity,
      totalCost,
    };
  });
  
  // Generate interior items estimate
  const interiorEstimate = interiorItems.map(item => {
    const quantity = Math.floor(Math.random() * 3) + 1;
    const avgPrice = (item.priceRange.min + item.priceRange.max) / 2;
    const totalCost = quantity * avgPrice;
    return {
      ...item,
      quantity,
      estimatedPrice: avgPrice,
      totalCost,
    };
  });
  
  // Calculate totals
  const constructionTotal = constructionEstimate.reduce((sum, item) => sum + item.totalCost, 0);
  const interiorTotal = interiorEstimate.reduce((sum, item) => sum + item.totalCost, 0);
  const grandTotal = constructionTotal + interiorTotal;
  
  return {
    roomArea,
    roomType,
    constructionEstimate,
    interiorEstimate,
    constructionTotal,
    interiorTotal,
    grandTotal,
    suggestions: [
      "Consider adding more natural lighting with larger windows",
      "Optimize space utilization with built-in storage solutions",
      "Use energy-efficient appliances to reduce long-term costs",
      "Consider sustainable materials for better environmental impact",
      "Add proper ventilation systems for better air quality"
    ]
  };
} 
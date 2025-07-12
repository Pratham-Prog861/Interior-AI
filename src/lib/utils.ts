import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai"

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

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function analyzeImage(imageFile: File, type: 'construction' | 'interior') {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not set");
  }

  // Validate image file
  if (!imageFile || !imageFile.type.startsWith('image/')) {
    throw new Error("Invalid image file provided");
  }

  // Convert File to base64
  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Extract base64 data without the data URL prefix
        const base64 = result.split(',')[1];
        if (!base64) {
          reject(new Error("Failed to convert image to base64"));
        } else {
          resolve(base64);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });

  try {
    const base64Image = await fileToBase64(imageFile);

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prompt for Gemini
    const prompt = `
      You are an expert in construction and interior design. Analyze the provided image of a ${type === "construction" ? "construction blueprint" : "room interior"}.
      Return a JSON object with:
      - roomArea (number, in sq ft)
      - roomType (string)
      - constructionEstimate (array of { name, unit, quantity, totalCost })
      - interiorEstimate (array of { name, category, placement, quantity, estimatedPrice, totalCost })
      - constructionTotal (number)
      - interiorTotal (number)
      - grandTotal (number)
      - suggestions (array of string)
      Only return valid JSON.
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType: imageFile.type, data: base64Image } }
          ]
        }
      ],
      generationConfig: { temperature: 0.2, maxOutputTokens: 2048 },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
      ]
    });

    // Parse Gemini's response
    const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let parsed;
    try {
      // Handle responses wrapped in markdown code blocks
      let jsonText = text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      parsed = JSON.parse(jsonText);
    } catch {
      throw new Error("Failed to parse Gemini response: " + text);
    }
    return parsed;
  } catch (error) {
    console.error("Gemini API error, using mock data:", error);
    
    // Fallback to mock data if Gemini fails
    const roomArea = Math.floor(Math.random() * 200) + 100; // 100-300 sq ft
    const roomType = type === 'construction' ? 'new construction' : 'interior renovation';
    
    const constructionEstimate = constructionMaterials.map(material => {
      const quantity = Math.floor(Math.random() * 100) + 10;
      const totalCost = quantity * material.pricePerUnit;
      return {
        ...material,
        quantity,
        totalCost,
      };
    });
    
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
} 
// Currency utility functions for LKR (Sri Lankan Rupees)

export const formatLKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatLKRWithoutDecimals = (amount: number): string => {
  return `Rs. ${Math.round(amount).toLocaleString('en-LK')}`;
};

// Convert USD to LKR (approximate rate: 1 USD = 300 LKR)
export const usdToLKR = (usdAmount: number): number => {
  return usdAmount * 300;
};

// LKR Pricing constants
export const LKR_PRICES = {
  // Home page featured products
  geometricVase: 13500, // $45.00 * 300
  industrialGear: 7500,  // $25.00 * 300
  honeycombTiles: 5400,  // $18.00 * 300
  customHousing: 18000,  // $60.00 * 300
  
  // Pricing tiers
  prototypeBase: 14700,     // $49 * 300
  productionBase: 149700,   // $499 * 300
  
  // Material costs per cm³
  materials: {
    pla: 15,        // $0.05 * 300
    nylonCf: 45,    // $0.15 * 300
    ultem: 135,     // $0.45 * 300
    bioResin: 105   // $0.35 * 300
  }
};
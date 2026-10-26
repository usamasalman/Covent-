import { Product, PriceTier, CartItem, QuoteItem } from '../types';

/**
 * Pure calculation logic for tiered wholesale pricing.
 * Authoritative on server and client.
 */
export function calculateTierPrice(
  product: Product,
  quantity: number,
  customerDiscountPercent: number = 0
): {
  unitPrice: number;
  originalTierPrice: number;
  activeTier: PriceTier;
  isBelowMoq: boolean;
  savingsVsBase: number;
} {
  const isBelowMoq = quantity < product.moq;
  
  // Sort tiers ascending by minQty
  const sortedTiers = [...product.tiers].sort((a, b) => a.minQty - b.minQty);
  const baseTier = sortedTiers[0] || { minQty: 1, maxQty: null, unitPrice: 85 };

  let matchingTier: PriceTier = baseTier;

  for (const tier of sortedTiers) {
    if (quantity >= tier.minQty) {
      if (tier.maxQty === null || quantity <= tier.maxQty) {
        matchingTier = tier;
        break;
      }
      // If quantity exceeds this tier, remember it as progressive candidate
      matchingTier = tier;
    }
  }

  const originalTierPrice = matchingTier.unitPrice;
  // Apply company-specific discount if negotiated
  const discountMultiplier = Math.max(0, 1 - (customerDiscountPercent / 100));
  const unitPrice = Number((originalTierPrice * discountMultiplier).toFixed(2));
  const baseUnitPrice = baseTier.unitPrice;
  const savingsVsBase = Math.max(0, Number((baseUnitPrice - unitPrice).toFixed(2)));

  return {
    unitPrice,
    originalTierPrice,
    activeTier: matchingTier,
    isBelowMoq,
    savingsVsBase
  };
}

/**
 * Validates whether order quantity complies with standard case/carton pack size.
 */
export function validateCartonMultiple(
  quantity: number,
  cartonMultiple: number
): {
  isValid: boolean;
  recommendedQuantity: number;
  cartons: number;
  remainder: number;
} {
  if (cartonMultiple <= 0) {
    return { isValid: true, recommendedQuantity: quantity, cartons: 1, remainder: 0 };
  }

  const remainder = quantity % cartonMultiple;
  const isValid = remainder === 0;
  const cartons = Math.ceil(quantity / cartonMultiple);
  const recommendedQuantity = isValid ? quantity : cartons * cartonMultiple;

  return {
    isValid,
    recommendedQuantity,
    cartons,
    remainder
  };
}

/**
 * Computes cart line items, total pairs, carton count, and subtotal.
 */
export function calculateCartSummary(items: CartItem[]): {
  totalPairs: number;
  subtotal: number;
  estimatedCartons: number;
  allMeetMoq: boolean;
} {
  let totalPairs = 0;
  let subtotal = 0;
  let estimatedCartons = 0;
  let allMeetMoq = true;

  for (const item of items) {
    const qty = item.totalQuantity;
    totalPairs += qty;
    subtotal += item.subtotal;
    const cartonSize = item.product.cartonMultiple || 12;
    estimatedCartons += Math.ceil(qty / cartonSize);
    if (qty < item.product.moq) {
      allMeetMoq = false;
    }
  }

  return {
    totalPairs,
    subtotal: Number(subtotal.toFixed(2)),
    estimatedCartons,
    allMeetMoq
  };
}

/**
 * Calculates authoritative quote totals.
 */
export function calculateQuoteTotals(
  items: QuoteItem[],
  freightPerPair: number = 3.5
): {
  subtotal: number;
  totalPairs: number;
  freight: number;
  grandTotal: number;
} {
  let subtotal = 0;
  let totalPairs = 0;

  for (const item of items) {
    subtotal += item.lineTotal;
    totalPairs += item.totalQuantity;
  }

  const freight = Number((totalPairs * freightPerPair).toFixed(2));
  const grandTotal = Number((subtotal + freight).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    totalPairs,
    freight,
    grandTotal
  };
}

/**
 * Format currency helper
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

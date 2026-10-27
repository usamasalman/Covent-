export interface PriceTier {
  minQty: number;
  maxQty: number | null; // null means Infinity (e.g. 250+)
  unitPrice: number;
  label?: string;
}

export interface SizeVariant {
  us: string;
  uk: string;
  eu: string;
  stock: number;
}

export interface ColorVariant {
  name: string;
  hex: string;
  code: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug: string;
  subCategory?: string;
  gender: 'Men' | 'Women' | 'Unisex';
  style: 'Chelsea' | 'Lace-Up' | 'Chukka' | 'Dress' | 'Work & Safety' | 'Outdoor & Hiking' | 'Custom / OEM' | 'Western & Cowboy';
  tagline: string;
  description: string;
  leatherType: string;
  leatherGrade: string;
  upperMaterial: string;
  liningMaterial: string;
  outsoleMaterial: string;
  construction: 'Goodyear Welted (360°)' | 'Goodyear Welted (270°)' | 'Blake Stitched' | 'Norwegian Welt' | 'Veldtschoen';
  countryOfOrigin: string;
  careInstructions: string;
  weightGrams: number;
  featured: boolean;
  leadTimeWeeks: string;
  moq: number; // Minimum Order Quantity in pairs
  cartonMultiple: number; // e.g. 12 pairs per shipping carton
  images: string[];
  colors: ColorVariant[];
  sizes: SizeVariant[];
  tiers: PriceTier[];
  sampleAvailable: boolean;
  samplePrice: number;
  isCustomizable: boolean;
  status: 'active' | 'draft' | 'archived';
  videoUrl?: string;
  createdAt: string;
}

export interface CartItemAssortment {
  sizeUs: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorVariant;
  assortment: CartItemAssortment[]; // size breakdown
  totalQuantity: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
}

export type QuoteStatus = 
  | 'New'
  | 'Under Review'
  | 'Clarification'
  | 'Quotation Prepared'
  | 'Sent to Buyer'
  | 'Negotiation'
  | 'Accepted'
  | 'Rejected'
  | 'Expired'
  | 'Converted to Order';

export interface QuoteItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  color: string;
  assortment: { size: string; quantity: number }[];
  totalQuantity: number;
  indicativeUnitPrice: number;
  proposedUnitPrice: number; // Staff can adjust
  lineTotal: number;
  customBrandingNote?: string;
  packagingSpec?: string;
}

export interface QuoteRequest {
  id: string; // e.g. RFQ-2026-8812
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  businessType: 'Retail Boutique' | 'Footwear Chain' | 'Distributor' | 'Private Label / OEM' | 'Corporate / Workwear';
  website?: string;
  items: QuoteItem[];
  destinationPort: string;
  targetDeliveryDate: string;
  preferredCurrency: 'USD' | 'EUR' | 'GBP';
  incoterms: 'FOB' | 'CIF' | 'EXW' | 'DDP';
  targetBudget?: number;
  requestedSamples: boolean;
  additionalNotes: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  validUntil: string;
  salesRepAssigned?: string;
  internalNotes?: string;
  subtotal: number;
  estimatedFreight: number;
  grandTotal: number;
  buyerFeedback?: string;
  convertedOrderId?: string;
}

export type OrderStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Confirmed'
  | 'In Production'
  | 'Ready to Dispatch'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  color: string;
  assortment: { size: string; quantity: number }[];
  totalQuantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string; // e.g. ORD-2026-4401
  poReference: string;
  quoteReference?: string;
  companyName: string;
  contactName: string;
  email: string;
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  totalQuantity: number;
  subtotal: number;
  shippingAmount: number;
  taxAmount: number;
  grandTotal: number;
  currency: string;
  paymentStatus: 'Pending Verification' | 'Authorized' | 'Paid (Net-30)' | 'Paid (Wire Transfer)' | 'Refunded';
  paymentMethod: 'Wire Transfer / T/T' | 'Letter of Credit (L/C)' | 'Net-30 Trade Credit' | 'Credit Card';
  fulfillmentStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  productionEstCompletion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerApplication {
  id: string;
  companyName: string;
  tradingName?: string;
  businessNumber: string; // VAT / Tax ID
  contactName: string;
  email: string;
  phone: string;
  annualVolumeEst: string;
  businessType: string;
  status: 'Pending Review' | 'Approved' | 'Declined';
  assignedTier: 'Standard Wholesale' | 'Gold Volume Partner' | 'Enterprise OEM';
  notes?: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'sales_rep' | 'catalog_manager' | 'buyer_owner' | 'buyer_procurement';
  companyName?: string;
  phone?: string;
  isApproved: boolean;
}

export interface CMSContent {
  heroHeadline: string;
  heroSubheadline: string;
  announcementBar: string;
  aboutStory: string;
  craftsmanshipTitle: string;
  craftsmanshipText: string;
  qcGuaranteeText: string;
  contactEmail: string;
  contactPhone: string;
  showroomAddress: string;
}

export interface SiteSettings {
  brandName: string;
  defaultCurrency: string;
  defaultMoq: number;
  allowSampleOrdering: boolean;
  leadTimeWeeksDefault: number;
  autoQuoteExpiryDays: number;
}

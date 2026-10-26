import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTierPrice, validateCartonMultiple, calculateCartSummary, calculateQuoteTotals } from './pricingEngine';
import { Product } from '../types';

const mockProduct: Product = {
  id: 'prod-01',
  name: 'Heritage Chelsea Boot',
  slug: 'heritage-chelsea-boot',
  sku: 'CST-CHL-001',
  category: 'Chelsea Boots',
  categorySlug: 'chelsea-boots',
  gender: 'Men',
  style: 'Chelsea',
  tagline: 'Full-grain Italian pull-up leather with 360° Goodyear welt',
  description: 'Detailed boot description',
  leatherType: 'Italian Veg-Tan Calfskin',
  leatherGrade: 'Grade A Full Grain',
  upperMaterial: '100% Full-Grain Calfskin (1.8mm)',
  liningMaterial: 'Full Glove Leather Lining',
  outsoleMaterial: 'Goodyear Leather Outsole + Rubber Island Heel',
  construction: 'Goodyear Welted (360°)',
  countryOfOrigin: 'Portugal',
  careInstructions: 'Condition every 3 months with beeswax cream',
  weightGrams: 640,
  featured: true,
  leadTimeWeeks: '3-4 Weeks',
  moq: 24,
  cartonMultiple: 12,
  images: ['/src/assets/images/chelsea_boot_walnut_1793033837576.jpg'],
  colors: [
    { name: 'Espresso Walnut', hex: '#3B2F2F', code: 'ESP' },
    { name: 'Cognac Saddle', hex: '#8B4513', code: 'COG' }
  ],
  sizes: [
    { us: '8.0', uk: '7.0', eu: '41', stock: 120 },
    { us: '9.0', uk: '8.0', eu: '42', stock: 180 },
    { us: '10.0', uk: '9.0', eu: '43', stock: 240 },
    { us: '11.0', uk: '10.0', eu: '44', stock: 150 }
  ],
  tiers: [
    { minQty: 24, maxQty: 49, unitPrice: 65, label: '24–49 pairs' },
    { minQty: 50, maxQty: 99, unitPrice: 58, label: '50–99 pairs' },
    { minQty: 100, maxQty: 249, unitPrice: 52, label: '100–249 pairs' },
    { minQty: 250, maxQty: null, unitPrice: 48, label: '250+ pairs' }
  ],
  sampleAvailable: true,
  samplePrice: 95,
  isCustomizable: true,
  status: 'active',
  createdAt: '2026-01-15'
};

test('Pricing Engine: below MOQ flag is set when quantity is under 24', () => {
  const result = calculateTierPrice(mockProduct, 12);
  assert.equal(result.isBelowMoq, true);
  assert.equal(result.unitPrice, 65);
});

test('Pricing Engine: exact MOQ boundary selects first tier ($65)', () => {
  const result = calculateTierPrice(mockProduct, 24);
  assert.equal(result.isBelowMoq, false);
  assert.equal(result.unitPrice, 65);
});

test('Pricing Engine: intermediate tier boundaries correctly resolve', () => {
  // 50 pairs should trigger tier 2 ($58)
  const tier2 = calculateTierPrice(mockProduct, 50);
  assert.equal(tier2.unitPrice, 58);
  assert.equal(tier2.savingsVsBase, 7);

  // 100 pairs should trigger tier 3 ($52)
  const tier3 = calculateTierPrice(mockProduct, 100);
  assert.equal(tier3.unitPrice, 52);
  assert.equal(tier3.savingsVsBase, 13);

  // 250 pairs should trigger tier 4 ($48)
  const tier4 = calculateTierPrice(mockProduct, 250);
  assert.equal(tier4.unitPrice, 48);
  assert.equal(tier4.savingsVsBase, 17);

  // 1,000 pairs (above highest tier) retains tier 4 ($48)
  const volumeHigh = calculateTierPrice(mockProduct, 1000);
  assert.equal(volumeHigh.unitPrice, 48);
});

test('Pricing Engine: company-specific discount is applied accurately', () => {
  // 10% negotiated discount on 100 pairs ($52 base tier -> $46.80)
  const discounted = calculateTierPrice(mockProduct, 100, 10);
  assert.equal(discounted.unitPrice, 46.80);
});

test('Carton Packing Rules: carton multiples validation and suggestion', () => {
  // Carton multiple is 12
  const valid = validateCartonMultiple(24, 12);
  assert.equal(valid.isValid, true);
  assert.equal(valid.cartons, 2);

  const invalid = validateCartonMultiple(26, 12);
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.remainder, 2);
  assert.equal(invalid.recommendedQuantity, 36);
  assert.equal(invalid.cartons, 3);
});

test('Quote Totals: subtotal, freight, and grand total calculations', () => {
  const quoteItems = [
    {
      productId: 'prod-01',
      productName: 'Heritage Chelsea Boot',
      sku: 'CST-CHL-001',
      image: '/test.jpg',
      color: 'Espresso Walnut',
      assortment: [{ size: '9.0', quantity: 60 }],
      totalQuantity: 60,
      indicativeUnitPrice: 58,
      proposedUnitPrice: 58,
      lineTotal: 3480
    },
    {
      productId: 'prod-02',
      productName: 'Classic Work Boot',
      sku: 'CST-WRK-002',
      image: '/test2.jpg',
      color: 'Cognac',
      assortment: [{ size: '10.0', quantity: 40 }],
      totalQuantity: 40,
      indicativeUnitPrice: 62,
      proposedUnitPrice: 62,
      lineTotal: 2480
    }
  ];

  const totals = calculateQuoteTotals(quoteItems, 4);
  assert.equal(totals.totalPairs, 100);
  assert.equal(totals.subtotal, 5960);
  assert.equal(totals.freight, 400); // 100 * 4
  assert.equal(totals.grandTotal, 6360);
});

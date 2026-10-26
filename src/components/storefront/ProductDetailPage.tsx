import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateTierPrice, validateCartonMultiple } from '../../utils/pricingEngine';
import { ArrowLeft, Check, ShieldCheck, Box, Download, FileText, ChevronRight, Layers, Sparkles } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, routeParam, navigateTo, addToCart, currentUser, addToast } = useApp();

  // Find product by slug
  const product = useMemo(() => {
    return products.find((p) => p.slug === routeParam) || products[0];
  }, [products, routeParam]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#3B2A1E', code: 'STD' });

  // Size assortment quantities keyed by sizeUs
  const [assortment, setAssortment] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    product.sizes.forEach((s, idx) => {
      // Seed default run meeting MOQ
      if (idx >= 1 && idx <= 4) {
        initial[s.us] = Math.floor(product.moq / 4);
      } else {
        initial[s.us] = 0;
      }
    });
    return initial;
  });

  const totalQuantity = useMemo(() => {
    return Object.values(assortment).reduce((sum, q) => sum + (q || 0), 0);
  }, [assortment]);

  const discount = currentUser.isApproved ? 5 : 0;
  const tierCalculation = calculateTierPrice(product, totalQuantity, discount);
  const cartonValidation = validateCartonMultiple(totalQuantity, product.cartonMultiple);
  const subtotal = Number((tierCalculation.unitPrice * totalQuantity).toFixed(2));

  const handleSizeQtyChange = (sizeUs: string, val: string) => {
    const qty = Math.max(0, parseInt(val) || 0);
    setAssortment((prev) => ({ ...prev, [sizeUs]: qty }));
  };

  const handleAddAssortmentToCart = () => {
    if (totalQuantity <= 0) {
      addToast('Please enter footwear quantities for at least one size variant.', 'error');
      return;
    }

    const assortmentList = Object.entries(assortment)
      .filter(([_, q]) => q > 0)
      .map(([sizeUs, quantity]) => ({ sizeUs, quantity }));

    addToCart({
      product,
      selectedColor,
      assortment: assortmentList,
      totalQuantity
    });
  };

  const handleOrderSample = () => {
    addToast(`Sample request initiated for ${product.name} (${selectedColor.name}). Sample unit price: ${formatCurrency(product.samplePrice)}. Our sample desk will confirm dispatch.`, 'info');
    navigateTo('request-quote');
  };

  const handleDownloadSpecSheet = () => {
    // Generate text/csv spec summary
    const specData = `
COVENT & STONE SPECIFICATION SHEET
Product: ${product.name}
SKU: ${product.sku}
Category: ${product.category}
Construction: ${product.construction}
Leather Type: ${product.leatherType} (${product.leatherGrade})
Upper Material: ${product.upperMaterial}
Lining: ${product.liningMaterial}
Outsole: ${product.outsoleMaterial}
Origin: ${product.countryOfOrigin}
Standard MOQ: ${product.moq} pairs
Lead Time: ${product.leadTimeWeeks}
Carton Multiple: ${product.cartonMultiple} pairs/case
Weight: ${product.weightGrams}g / half-pair (Size US 9)
    `.trim();

    const blob = new Blob([specData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.sku}-Tech-Specs.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Technical specification sheet downloaded.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#8C7A6B]">
        <button onClick={() => navigateTo('home')} className="hover:text-[#241B16]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('products')} className="hover:text-[#241B16]">
          Master Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#241B16] font-medium truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Left Gallery + Right Purchase & Tier Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Gallery Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="relative aspect-4/3 bg-[#F4EFEB] rounded-lg border border-[#E5DDD2] overflow-hidden shadow-xs">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#241B16]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
              MOQ: {product.moq} pairs
            </div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#241B16] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded border border-[#DDD3C5]">
              {product.construction}
            </div>
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#4A3728] ring-2 ring-[#4A3728]/20'
                      : 'border-[#E5DDD2] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Technical Highlights */}
          <div className="p-4 bg-white rounded-lg border border-[#E5DDD2] space-y-2 text-xs">
            <span className="font-semibold text-[#241B16] uppercase tracking-wider block">
              Factory Specifications
            </span>
            <div className="grid grid-cols-2 gap-2 text-[#7A6C5F]">
              <div>Leather: <strong className="text-[#241B16] block">{product.leatherType}</strong></div>
              <div>Grade: <strong className="text-[#241B16] block">{product.leatherGrade}</strong></div>
              <div>Sole: <strong className="text-[#241B16] block">{product.outsoleMaterial}</strong></div>
              <div>Origin: <strong className="text-[#241B16] block">{product.countryOfOrigin}</strong></div>
            </div>
            <div className="pt-2 border-t border-[#F0E9DF]">
              <button
                onClick={handleDownloadSpecSheet}
                className="inline-flex items-center gap-1.5 text-xs text-[#8A5A2B] hover:text-[#4A3728] font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Full Technical Spec Sheet (.txt)
              </button>
            </div>
          </div>
        </div>

        {/* Purchase & Pricing Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-xs text-[#8C7A6B] uppercase tracking-[0.15em] mb-1 font-semibold">
              {product.category} · SKU: {product.sku}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16] leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-[#5C4E43] mt-2 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Tiered Pricing Interactive Table */}
          <div className="p-5 bg-white rounded-lg border border-[#E0D5C7] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#241B16]">
                Volume-Based Wholesale Pricing Tiers
              </span>
              <span className="text-[11px] text-[#8C7A6B]">
                Incoterms FOB Porto / Leon
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.tiers.map((t, idx) => {
                const isSelected = tierCalculation.activeTier.minQty === t.minQty;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded border text-center transition-all ${
                      isSelected
                        ? 'bg-[#2E221B] text-[#FAF7F2] border-[#2E221B] shadow-sm'
                        : 'bg-[#FAF7F2] border-[#E8E1D7] text-[#241B16]'
                    }`}
                  >
                    <span className={`text-[10px] uppercase tracking-wider block font-medium ${isSelected ? 'text-[#D8B47E]' : 'text-[#7A6C5F]'}`}>
                      {t.label || `${t.minQty}${t.maxQty ? `–${t.maxQty}` : '+'} pairs`}
                    </span>
                    <span className="font-serif text-xl font-bold block tabular-nums mt-0.5">
                      {formatCurrency(t.unitPrice)}
                    </span>
                    <span className={`text-[9px] block ${isSelected ? 'text-[#FAF7F2]/80' : 'text-[#8C7A6B]'}`}>
                      per pair
                    </span>
                  </div>
                );
              })}
            </div>

            {currentUser.isApproved && (
              <div className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 flex items-center justify-between">
                <span>Gold Volume Partner discount applied (-5%)</span>
                <strong>Active rate: {formatCurrency(tierCalculation.unitPrice)} / pair</strong>
              </div>
            )}
          </div>

          {/* Color Variant Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3728] block">
              Select Leather Finish & Colorway: <strong className="text-[#241B16] normal-case">{selectedColor.name}</strong>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                    selectedColor.code === c.code
                      ? 'border-[#2E221B] bg-white ring-1 ring-[#2E221B] text-[#241B16] font-semibold'
                      : 'border-[#DDD3C5] bg-[#FAF7F2] text-[#6B5E53] hover:bg-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Assortment Matrix Input */}
          <div className="space-y-3 p-5 bg-white rounded-lg border border-[#E0D5C7]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241B16] block">
                  Wholesale Size Assortment Breakdown
                </span>
                <span className="text-[11px] text-[#7A6C5F]">
                  Enter pair quantities for each size run (US / UK / EU equivalencies)
                </span>
              </div>
              <button
                onClick={() => {
                  // Distribute evenly to 24 pairs
                  const distributed: Record<string, number> = {};
                  product.sizes.forEach((s, idx) => {
                    distributed[s.us] = idx >= 1 && idx <= 4 ? 6 : 0;
                  });
                  setAssortment(distributed);
                }}
                className="text-xs text-[#8A5A2B] hover:text-[#4A3728] underline"
              >
                Reset to Standard Curve (24 prs)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {product.sizes.map((s) => (
                <div key={s.us} className="p-2.5 bg-[#FAF7F2] rounded border border-[#EAE3DA] flex flex-col justify-between">
                  <div className="text-[11px] text-[#6B5D52] mb-1">
                    <strong className="text-[#241B16]">US {s.us}</strong>
                    <span className="text-[10px] text-[#8C7A6B] block">
                      UK {s.uk} · EU {s.eu}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="number"
                      min="0"
                      value={assortment[s.us] || 0}
                      onChange={(e) => handleSizeQtyChange(s.us, e.target.value)}
                      className="w-full text-center text-sm font-bold bg-white border border-[#DDD3C5] rounded py-1 text-[#241B16] focus:outline-none focus:border-[#4A3728]"
                    />
                    <span className="text-[10px] text-[#8C7A6B]">prs</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Run Summary Bar */}
            <div className="pt-3 border-t border-[#F0E9DF] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7A6C5F]">
                  Total Run: <strong className="text-base text-[#241B16] tabular-nums font-bold">{totalQuantity} pairs</strong>
                </span>
                {cartonValidation.isValid ? (
                  <span className="text-xs text-emerald-800 block">
                    ✓ Packed into {cartonValidation.cartons} complete cartons ({product.cartonMultiple} prs/ctn)
                  </span>
                ) : (
                  <span className="text-xs text-amber-800 block">
                    Case rule: {product.cartonMultiple} pairs/carton. Current remainder: {cartonValidation.remainder} pairs.
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-xs text-[#7A6C5F] block">
                  Calculated Batch Subtotal:
                </span>
                <span className="font-serif text-2xl font-bold text-[#241B16] tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Purchasing & Quote CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddAssortmentToCart}
              className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Add {totalQuantity} Pairs to Wholesale Inquiry Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  handleAddAssortmentToCart();
                  navigateTo('request-quote');
                }}
                className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#2E221B] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded-md transition-colors border border-[#DDD3C5] text-center"
              >
                Request Custom Quotation
              </button>

              {product.sampleAvailable && (
                <button
                  onClick={handleOrderSample}
                  className="py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#6B5038] bg-white hover:bg-[#FAF7F2] rounded-md transition-colors border border-[#DDD3C5] text-center"
                >
                  Order Prototype Sample ({formatCurrency(product.samplePrice)})
                </button>
              )}
            </div>
          </div>

          {/* Long Description & Care Instructions */}
          <div className="pt-6 border-t border-[#EAE3D9] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#241B16]">
              Atelier Engineering & Material Integrity
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4E43] leading-relaxed">
              {product.description}
            </p>
            <div className="p-4 bg-[#F4EFEB] rounded border border-[#E0D5C7] space-y-1 text-xs text-[#6B5E53]">
              <strong className="block text-[#241B16] font-semibold">Tannery Care Protocol:</strong>
              {product.careInstructions}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

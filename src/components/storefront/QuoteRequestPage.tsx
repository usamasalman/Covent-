import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateQuoteTotals } from '../../utils/pricingEngine';
import { QuoteItem } from '../../types';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, FileText, CheckCircle2, Box, Sparkles } from 'lucide-react';

export const QuoteRequestPage: React.FC = () => {
  const { products, cart, submitQuoteRequest, navigateTo, currentUser } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedRfqId, setSubmittedRfqId] = useState<string | null>(null);

  // Step 1: Business Information
  const [companyName, setCompanyName] = useState(currentUser.companyName || '');
  const [contactName, setContactName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [country, setCountry] = useState('United States');
  const [website, setWebsite] = useState('https://');
  const [businessType, setBusinessType] = useState<any>('Retail Boutique');

  // Step 2: Items
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    if (cart.length > 0) {
      return cart.map((ci) => ({
        productId: ci.product.id,
        productName: ci.product.name,
        sku: ci.product.sku,
        image: ci.product.images[0],
        color: ci.selectedColor.name,
        assortment: ci.assortment.map((a) => ({ size: a.sizeUs, quantity: a.quantity })),
        totalQuantity: ci.totalQuantity,
        indicativeUnitPrice: ci.unitPrice,
        proposedUnitPrice: ci.unitPrice,
        lineTotal: ci.subtotal,
        customBrandingNote: 'Gold foil stamp on heel sock liner',
        packagingSpec: 'Custom matte slide drawer shoebox + cotton dust bags'
      }));
    }
    // Default to first product if cart was empty
    const first = products[0];
    return [
      {
        productId: first.id,
        productName: first.name,
        sku: first.sku,
        image: first.images[0],
        color: first.colors[0]?.name || 'Walnut Espresso',
        assortment: [
          { size: '8.5', quantity: 12 },
          { size: '9.0', quantity: 12 },
          { size: '9.5', quantity: 12 },
          { size: '10.0', quantity: 12 }
        ],
        totalQuantity: 48,
        indicativeUnitPrice: 65,
        proposedUnitPrice: 65,
        lineTotal: 3120,
        customBrandingNote: 'Embossed brand logo on collar',
        packagingSpec: 'Standard rigid shoe carton with dust covers'
      }
    ];
  });

  // Step 3: Commercial Logistics
  const [destinationPort, setDestinationPort] = useState('Port of Los Angeles / Long Beach');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('2026-12-15');
  const [preferredCurrency, setPreferredCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [incoterms, setIncoterms] = useState<'FOB' | 'CIF' | 'EXW' | 'DDP'>('FOB');
  const [targetBudget, setTargetBudget] = useState<number | undefined>(undefined);
  const [requestedSamples, setRequestedSamples] = useState(true);
  const [additionalNotes, setAdditionalNotes] = useState('Interested in seasonal repeat ordering terms for AW26.');

  const totals = calculateQuoteTotals(quoteItems, 3.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rfqId = submitQuoteRequest({
      companyName,
      contactName,
      email,
      phone,
      country,
      website,
      businessType,
      items: quoteItems,
      destinationPort,
      targetDeliveryDate,
      preferredCurrency,
      incoterms,
      targetBudget,
      requestedSamples,
      additionalNotes
    });
    setSubmittedRfqId(rfqId);
  };

  if (submittedRfqId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A2B]">
            Quotation Dossier Received
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
            Reference #{submittedRfqId}
          </h1>
          <p className="text-sm text-[#6B5E53] leading-relaxed max-w-md mx-auto">
            Thank you, {contactName}. Your bulk quotation request for {companyName} has been transmitted to our trade desk in Porto and SoHo.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] text-left text-xs space-y-3">
          <div className="flex justify-between py-1 border-b border-[#F0E9DF]">
            <span className="text-[#7A6C5F]">Company / Account:</span>
            <strong className="text-[#241B16]">{companyName} ({country})</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F0E9DF]">
            <span className="text-[#7A6C5F]">Footwear Total:</span>
            <strong className="text-[#241B16] tabular-nums">{totals.totalPairs} pairs across {quoteItems.length} style(s)</strong>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F0E9DF]">
            <span className="text-[#7A6C5F]">Indicative Subtotal:</span>
            <strong className="text-[#241B16] tabular-nums">{formatCurrency(totals.subtotal, preferredCurrency)}</strong>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#7A6C5F]">Incoterms / Target Date:</span>
            <strong className="text-[#241B16]">{incoterms} · {targetDeliveryDate}</strong>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => navigateTo('account')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded-md transition-colors"
          >
            Track in Buyer Portal
          </button>
          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#2E221B] bg-[#EFE9DF] hover:bg-[#E5DDD2] rounded-md transition-colors"
          >
            Continue Catalog Browsing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
          Enterprise & Custom Purchasing
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
          Request Customized Wholesale Quotation
        </h1>
        <p className="text-xs sm:text-sm text-[#736458]">
          Specify exact size breakdowns, leather grades, private-label branding, and destination trade terms.
        </p>
      </div>

      {/* 4-Step Progress Indicator */}
      <div className="grid grid-cols-4 gap-2 border-b border-[#E8E1D7] pb-4 text-center">
        {[
          { step: 1, label: 'Company Profile' },
          { step: 2, label: 'Styles & Sizes' },
          { step: 3, label: 'Trade Terms' },
          { step: 4, label: 'Review & Submit' }
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setCurrentStep(s.step as any)}
            className={`pb-2 border-b-2 text-xs font-semibold transition-all cursor-pointer ${
              currentStep === s.step
                ? 'border-[#2E221B] text-[#241B16]'
                : currentStep > s.step
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-[#9E8F82]'
            }`}
          >
            <span className="block font-serif text-sm">Step {s.step}</span>
            <span className="hidden sm:inline text-[11px] font-normal">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg border border-[#E5DDD2] shadow-sm space-y-6">
        
        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-2">
              Step 1: Registered Business Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Company / Trading Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Nordic Heritage Footwear ApS"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Contact Person & Title *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Henrik Lindqvist, Purchasing Director"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="h.lindqvist@nordicheritage.dk"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Phone Number (with Country Code) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+45 31 44 28 90"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Country of Registration *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Denmark"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Business Nature</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728] text-[#241B16]"
                >
                  <option value="Retail Boutique">Independent Menswear / Footwear Boutique</option>
                  <option value="Footwear Chain">Footwear Chain Store (5+ Doors)</option>
                  <option value="Distributor">Wholesale Distributor / Importer</option>
                  <option value="Private Label / OEM">Private Label Brand / OEM Program</option>
                  <option value="Corporate / Workwear">Corporate Workwear Supplier</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded-md transition-colors flex items-center gap-1.5"
              >
                <span>Continue to Styles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Product & Custom Branding Requirements */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-2">
              Step 2: Footwear Models, Quantities & Custom Branding
            </h3>

            {quoteItems.map((item, idx) => (
              <div key={idx} className="p-4 bg-[#FAF7F2] rounded border border-[#E5DDD2] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#241B16]">
                    {item.productName} ({item.color})
                  </h4>
                  <span className="text-xs font-mono text-[#8C7A6B]">{item.sku}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#7A6C5F] block">Total Run Pairs</label>
                    <input
                      type="number"
                      min="1"
                      value={item.totalQuantity}
                      onChange={(e) => {
                        const newQty = parseInt(e.target.value) || 0;
                        setQuoteItems((prev) =>
                          prev.map((it, i) =>
                            i === idx
                              ? {
                                  ...it,
                                  totalQuantity: newQty,
                                  lineTotal: Number((it.proposedUnitPrice * newQty).toFixed(2))
                                }
                              : it
                          )
                        );
                      }}
                      className="w-full px-2 py-1 text-xs font-semibold bg-white border border-[#DDD3C5] rounded"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#7A6C5F] block">Indicative Unit Price</label>
                    <input
                      type="number"
                      value={item.proposedUnitPrice}
                      onChange={(e) => {
                        const price = parseFloat(e.target.value) || 0;
                        setQuoteItems((prev) =>
                          prev.map((it, i) =>
                            i === idx
                              ? {
                                  ...it,
                                  proposedUnitPrice: price,
                                  lineTotal: Number((price * it.totalQuantity).toFixed(2))
                                }
                              : it
                          )
                        );
                      }}
                      className="w-full px-2 py-1 text-xs font-semibold bg-white border border-[#DDD3C5] rounded"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-[#7A6C5F] block">Custom Branding Specification</label>
                    <input
                      type="text"
                      value={item.customBrandingNote || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQuoteItems((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, customBrandingNote: val } : it))
                        );
                      }}
                      placeholder="e.g. Gold foil logo stamped insole"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#DDD3C5] rounded"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3728] bg-[#EFE9DF] rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded flex items-center gap-1.5"
              >
                <span>Continue to Logistics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Logistics & Commercial Requirements */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-2">
              Step 3: Commercial & Freight Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                  Destination Port / City of Entry *
                </label>
                <input
                  type="text"
                  required
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  placeholder="e.g. Port of Rotterdam / Hamburg / Long Beach"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                  Target In-Store / Delivery Date *
                </label>
                <input
                  type="date"
                  required
                  value={targetDeliveryDate}
                  onChange={(e) => setTargetDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Preferred Currency</label>
                <select
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                >
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Incoterms 2020</label>
                <select
                  value={incoterms}
                  onChange={(e) => setIncoterms(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                >
                  <option value="FOB">FOB (Free On Board - Factory Port)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid to Warehouse)</option>
                  <option value="EXW">EXW (Ex Works - Factory Gate)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 p-3 bg-[#FAF7F2] rounded border border-[#E5DDD2] cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={requestedSamples}
                    onChange={(e) => setRequestedSamples(e.target.checked)}
                    className="rounded text-[#4A3728]"
                  />
                  <div>
                    <strong className="block text-[#241B16]">Request Pre-Production Prototype Sample Ahead of Batch</strong>
                    <span className="text-[#7A6C5F]">Sample costs are 100% credited against confirmed production invoice.</span>
                  </div>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                  Additional Technical or Logistics Notes
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Include any barcode SKU requirements, special labeling, pallet heights, etc."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3728] bg-[#EFE9DF] rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded flex items-center gap-1.5"
              >
                <span>Review Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review and Submission */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#241B16] border-b border-[#F0E9DF] pb-2">
              Step 4: Commercial Review & Dossier Transmission
            </h3>

            <div className="p-4 bg-[#FAF7F2] rounded border border-[#E5DDD2] space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>Company: <strong className="text-[#241B16] block">{companyName}</strong></div>
                <div>Contact: <strong className="text-[#241B16] block">{contactName} ({email})</strong></div>
                <div>Destination: <strong className="text-[#241B16] block">{destinationPort}</strong></div>
                <div>Terms: <strong className="text-[#241B16] block">{incoterms} · Target {targetDeliveryDate}</strong></div>
              </div>
            </div>

            {/* Line items summary */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A3728]">
                Requested Styles & Quantities:
              </span>
              {quoteItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#E8E1D7] rounded flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-[#241B16] block">{item.productName} ({item.color})</strong>
                    <span className="text-[#7A6C5F]">SKU: {item.sku} · {item.customBrandingNote}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#241B16] block tabular-nums">
                      {item.totalQuantity} pairs @ {formatCurrency(item.proposedUnitPrice, preferredCurrency)}
                    </span>
                    <span className="text-[#7A6C5F] tabular-nums">
                      {formatCurrency(item.lineTotal, preferredCurrency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Authoritative Calculation Breakdown */}
            <div className="p-4 bg-[#F4EFEB] rounded border border-[#DDD3C5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Total Pairs:</span>
                <strong className="text-[#241B16] tabular-nums">{totals.totalPairs} pairs</strong>
              </div>
              <div className="flex justify-between">
                <span>Indicative Production Subtotal:</span>
                <strong className="text-[#241B16] tabular-nums">{formatCurrency(totals.subtotal, preferredCurrency)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Estimated Freight ({incoterms}):</span>
                <strong className="text-[#241B16] tabular-nums">{formatCurrency(totals.freight, preferredCurrency)}</strong>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#241B16] pt-2 border-t border-[#D5C9BB]">
                <span>Indicative Total:</span>
                <span className="tabular-nums font-serif text-lg">{formatCurrency(totals.grandTotal, preferredCurrency)}</span>
              </div>
              <p className="text-[10px] text-[#7A6C5F] italic pt-1">
                * Note: Indicative pricing is based on standard published volume tiers. Final commercial rates, freight insurance, and dispatch timelines are ratified in our formal quotation response.
              </p>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3728] bg-[#EFE9DF] rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded shadow-md cursor-pointer flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#D8B47E]" />
                <span>Submit Quotation Dossier</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

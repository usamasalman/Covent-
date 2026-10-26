import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/pricingEngine';
import { ArrowRight, ShieldCheck, Box, Layers, Factory, CheckCircle2, ChevronRight, HelpCircle, FileText, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo, cms, addToCart } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredBoots = products.filter((p) => p.featured).slice(0, 3);

  const faqs = [
    {
      q: 'What is the standard Minimum Order Quantity (MOQ)?',
      a: 'Our standard production MOQ is 24 pairs per style, which may be apportioned across any standard size distribution. For custom OEM developments requiring proprietary lasts or bespoke sole molds, the initial run is 50 pairs.'
    },
    {
      q: 'Can we order pre-production samples before placing a bulk run?',
      a: 'Yes. Prototype samples are available for all in-catalog styles at our sample surcharge rate. Sample fees are 100% credited against your initial bulk production invoice exceeding 50 pairs.'
    },
    {
      q: 'What leather varieties and construction methods are verified?',
      a: 'We bench-craft strictly with Grade-A European vegetable-tanned calfskin, French box calf, and Horween cowhides. Primary construction is authentic 360° or 270° Goodyear Welted with cork cavity filling and genuine storm welts.'
    },
    {
      q: 'What are typical production lead times and shipping terms?',
      a: 'Standard catalog runs dispatch within 3 to 5 weeks from leather cutting approval. We ship under Incoterms 2020 (FOB, CIF, or DDP) via major ocean freight forwarders or express air courier.'
    },
    {
      q: 'How do tiered wholesale price breaks apply to multiple models?',
      a: 'Tiered price breaks calculate dynamically per style run. For enterprise distributors booking quarterly runs exceeding 250 pairs across combined styles, negotiated contract rates are assigned to your corporate buyer account.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section - Cinematic Luxury Wholesale */}
      <section className="relative overflow-hidden bg-[#201814] text-[#FAF7F2] py-20 lg:py-28">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img
            src="/src/assets/images/hero_leather_boots_1793033837355.jpg"
            alt="Artisanal Goodyear Welted Leather Boots Workshop"
            className="w-full h-full object-cover scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1511] via-[#1C1511]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D8B47E] font-semibold">
              <span className="w-8 h-px bg-[#D8B47E]" />
              Direct European & American Bench-Craft
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#FAF7F2] text-balance">
              {cms.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-[#C7B9AD] leading-relaxed font-light">
              {cms.heroSubheadline}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigateTo('products')}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C1613] bg-[#C8A265] hover:bg-[#D8B47E] rounded-md transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Explore Master Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('request-quote')}
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#D8B47E]" />
                <span>Request Volume Quotation</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-xs text-[#A89A8E]">
              <div>
                <span className="block font-serif text-xl font-bold text-[#FAF7F2] tabular-nums">24 Pairs</span>
                <span className="text-[11px]">Low MOQ per style</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#FAF7F2] tabular-nums">360° Welt</span>
                <span className="text-[11px]">Authentic Goodyear craft</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-[#FAF7F2] tabular-nums">22 Countries</span>
                <span className="text-[11px]">Worldwide freight ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Boots Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E1D7]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
              Curated Wholesale Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
              Signature Wholesale Boots
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A3728] hover:text-[#1F1712] transition-colors"
          >
            <span>View All Models ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBoots.map((boot) => (
            <div
              key={boot.id}
              className="group bg-white rounded-lg border border-[#E5DDD2] overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div
                className="relative aspect-4/3 bg-[#F4EFEB] overflow-hidden cursor-pointer"
                onClick={() => navigateTo('products', boot.slug)}
              >
                <img
                  src={boot.images[0]}
                  alt={boot.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#241B16]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                  MOQ: {boot.moq} pairs
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[#827265] uppercase tracking-wider mb-1">
                    {boot.category} · {boot.construction}
                  </div>
                  <h3
                    onClick={() => navigateTo('products', boot.slug)}
                    className="font-serif text-xl font-bold text-[#241B16] group-hover:text-[#684F3B] transition-colors cursor-pointer"
                  >
                    {boot.name}
                  </h3>
                  <p className="text-xs text-[#6B5E53] mt-2 line-clamp-2 leading-relaxed">
                    {boot.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0E9DF]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider block">
                        Wholesale Tier 1 (24-49):
                      </span>
                      <span className="text-base font-bold text-[#241B16] tabular-nums">
                        {formatCurrency(boot.tiers[0].unitPrice)} <span className="text-xs font-normal text-[#8C7A6B]">/ pair</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider block">
                        High Volume (250+):
                      </span>
                      <span className="text-base font-bold text-emerald-800 tabular-nums">
                        {formatCurrency(boot.tiers[boot.tiers.length - 1].unitPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => navigateTo('products', boot.slug)}
                      className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-[#241B16] bg-[#F4EFEB] hover:bg-[#EAE2D7] rounded transition-colors text-center"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          product: boot,
                          selectedColor: boot.colors[0],
                          assortment: boot.sizes.slice(0, 4).map((s) => ({
                            sizeUs: s.us,
                            quantity: Math.floor(boot.moq / 4)
                          })),
                          totalQuantity: boot.moq
                        })
                      }
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors"
                      title="Add standard MOQ pack to inquiry list"
                    >
                      + Quick MOQ ({boot.moq})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Wholesale Volume Pricing Engine Breakdown */}
      <section className="bg-[#F4EFEB] border-y border-[#E2D8CC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
              Transparent Commercial Economics
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#241B16]">
              Volume-Based Wholesale Pricing Architecture
            </h2>
            <p className="text-sm text-[#6E6054] mt-2">
              Our direct-from-bench production eliminates middleman importer margins. Standard tiers reflect factory batch efficiencies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg border border-[#DDD3C5] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] block mb-2">
                Tier 1 · Boutique Run
              </span>
              <div className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mb-1">
                24 – 49 <span className="text-sm font-sans text-[#7E6F63]">pairs</span>
              </div>
              <div className="text-lg font-bold text-[#4A3728] tabular-nums mb-3">
                $65.00 <span className="text-xs font-normal text-[#8A7A6E]">base illustrative</span>
              </div>
              <p className="text-xs text-[#7A6C5F] leading-relaxed">
                Ideal for independent luxury menswear boutiques testing silhouettes with minimal inventory exposure.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#DDD3C5] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] block mb-2">
                Tier 2 · Retail Door
              </span>
              <div className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mb-1">
                50 – 99 <span className="text-sm font-sans text-[#7E6F63]">pairs</span>
              </div>
              <div className="text-lg font-bold text-[#4A3728] tabular-nums mb-3">
                $58.00 <span className="text-xs font-normal text-emerald-700">Save ~11%</span>
              </div>
              <p className="text-xs text-[#7A6C5F] leading-relaxed">
                Optimal full-size run (US 8 to 12) across multi-colorway assortments for regional multi-store retailers.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#DDD3C5] shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B] block mb-2">
                Tier 3 · Regional Chain
              </span>
              <div className="font-serif text-3xl font-bold text-[#241B16] tabular-nums mb-1">
                100 – 249 <span className="text-sm font-sans text-[#7E6F63]">pairs</span>
              </div>
              <div className="text-lg font-bold text-[#4A3728] tabular-nums mb-3">
                $52.00 <span className="text-xs font-normal text-emerald-700">Save ~20%</span>
              </div>
              <p className="text-xs text-[#7A6C5F] leading-relaxed">
                Includes complimentary private-label insole debossing and consolidated palletized sea freight preparation.
              </p>
            </div>

            <div className="p-6 bg-[#261E1A] text-[#FAF7F2] rounded-lg border border-[#3E322A] shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D8B47E] block mb-2">
                Tier 4 · Enterprise & OEM
              </span>
              <div className="font-serif text-3xl font-bold text-[#FAF7F2] tabular-nums mb-1">
                250+ <span className="text-sm font-sans text-[#B3A497]">pairs</span>
              </div>
              <div className="text-lg font-bold text-[#D8B47E] tabular-nums mb-3">
                $48.00 <span className="text-xs font-normal text-emerald-400">Save ~26%</span>
              </div>
              <p className="text-xs text-[#B8ACA1] leading-relaxed">
                Bespoke carton printing, custom lasts, dedicated account manager, and reserved production line slotting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Craftsmanship & Materials Editorial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden border border-[#E5DDD2] shadow-lg">
            <img
              src="/src/assets/images/craftsmanship_workshop_1793033838284.jpg"
              alt="Artisan hand-stitching footwear upper in traditional atelier"
              className="w-full h-[460px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#1F1713]/85 backdrop-blur-md rounded border border-white/10 text-xs text-[#EAE2D7]">
              <strong className="block text-[#FAF7F2] font-semibold text-sm">
                Master Bench-Stitching · Over 200 Hand Steps
              </strong>
              Each shoe is conditioned with organic tallow and beeswax before passing our 3-stage QA protocol.
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block">
              Heritage Shoemaking Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16] leading-tight">
              {cms.craftsmanshipTitle}
            </h2>
            <p className="text-sm text-[#5C4E43] leading-relaxed">
              {cms.craftsmanshipText}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#241C16]">Authentic 360° Goodyear Welt</h4>
                  <p className="text-xs text-[#78695E]">Fully resolable structure ensuring boots can be rebuilt for decades.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#241C16]">Granulated Natural Cork Bed</h4>
                  <p className="text-xs text-[#78695E]">Conforms directly to the buyer's foot anatomy while providing thermal isolation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#241C16]">Traceable European Tanneries</h4>
                  <p className="text-xs text-[#78695E]">REACH-compliant vegetable-tanned hides free from toxic chromium runoff.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3D2C20] hover:text-[#1F1712] underline"
              >
                Read Atelier Heritage & Tannery Specifications <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How Wholesale Ordering Works (4 Steps) */}
      <section className="bg-[#FAF7F2] border-t border-[#E8E0D5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
              Streamlined B2B Workflow
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#241B16]">
              How Wholesale Purchasing Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg border border-[#E5DCD0] shadow-xs relative">
              <span className="text-2xl font-serif font-bold text-[#8A5A2B] block mb-3">01</span>
              <h3 className="text-sm font-bold text-[#241B16] mb-2">Assemble Styles</h3>
              <p className="text-xs text-[#736458] leading-relaxed">
                Select styles from our catalog, configure colorways, and establish your size breakdown.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#E5DCD0] shadow-xs relative">
              <span className="text-2xl font-serif font-bold text-[#8A5A2B] block mb-3">02</span>
              <h3 className="text-sm font-bold text-[#241B16] mb-2">Request Quote or Sample</h3>
              <p className="text-xs text-[#736458] leading-relaxed">
                Submit your target delivery date, port of entry, and custom branding requirements.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#E5DCD0] shadow-xs relative">
              <span className="text-2xl font-serif font-bold text-[#8A5A2B] block mb-3">03</span>
              <h3 className="text-sm font-bold text-[#241B16] mb-2">Commercial Review</h3>
              <p className="text-xs text-[#736458] leading-relaxed">
                Our sales desk reviews logistics, confirms batch pricing, and issues a formal PDF quotation.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#E5DCD0] shadow-xs relative">
              <span className="text-2xl font-serif font-bold text-[#8A5A2B] block mb-3">04</span>
              <h3 className="text-sm font-bold text-[#241B16] mb-2">Bench Production & Dispatch</h3>
              <p className="text-xs text-[#736458] leading-relaxed">
                Order progresses through leather cutting, welt stitching, QA packing, and ocean dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
            Buyer Due Diligence
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#241B16]">
            Frequently Asked Wholesale Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#241B16] hover:text-[#4A3728]"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#8C7A6B] transition-transform ${
                      isOpen ? 'rotate-90 text-[#4A3728]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#6B5D52] leading-relaxed border-t border-[#F0E9DF] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Bottom Trade CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 lg:p-14 bg-[#261E1A] text-[#FAF7F2] rounded-xl border border-[#3E322A] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D8B47E]">
              Ready to Expand Your Footwear Program?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Apply for a Covent & Stone Wholesale Business Account
            </h2>
            <p className="text-xs sm:text-sm text-[#C7B9AD] leading-relaxed">
              Unlock negotiated tiered price lists, downloadable CAD specifications, Net-30 credit lines, and sample ordering privileges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigateTo('wholesale')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C1613] bg-[#C8A265] hover:bg-[#D8B47E] rounded-md transition-colors text-center"
            >
              Apply for Wholesale Account
            </button>
            <button
              onClick={() => navigateTo('request-quote')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors text-center"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

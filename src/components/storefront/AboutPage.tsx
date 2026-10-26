import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, Globe2, Compass, Layers, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { cms, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
          Three Generations of Bench-Craft
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241B16] leading-tight">
          Craftsmanship, Material Integrity & Modern Transparency
        </h1>
        <p className="text-sm sm:text-base text-[#685A4E] leading-relaxed">
          {cms.aboutStory}
        </p>
      </div>

      {/* Workshop Imagery & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-lg overflow-hidden border border-[#E5DDD2] shadow-lg">
          <img
            src="/src/assets/images/craftsmanship_workshop_1793033838284.jpg"
            alt="Master artisan lasting boots in atelier"
            className="w-full h-[480px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block">
            Why Goodyear Welted?
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#241B16]">
            The Gold Standard in Footwear Longevity
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5D52] leading-relaxed">
            Patented in 1869, the Goodyear welt machine locks the upper leather, insole rib, and leather welt into a unified structure. Because no stitching punctures the internal footbed, the shoe remains water-resistant and can be completely recrafted and resoled up to 5 times.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#241B16] block font-semibold">Tuscan & French Tanneries</strong>
                <span className="text-xs text-[#7A6C5F]">Full-grain skins vegetable-tanned with oak, chestnut, and mimosa extracts.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#241B16] block font-semibold">Granulated Cork Infill</strong>
                <span className="text-xs text-[#7A6C5F]">A 4mm natural cork layer between insole and outsole creates a custom ergonomic orthotic profile.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[#241B16] block font-semibold">Tempered Steel Shanks</strong>
                <span className="text-xs text-[#7A6C5F]">Triple-ribbed spring steel shank ensures arch support under torsional load.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Facilities & Quality Control */}
      <div className="bg-[#FAF7F2] p-8 lg:p-12 rounded-lg border border-[#E5DDD2] space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
            Bench Inspection Protocol
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241B16]">
            Zero-Defect Quality Assurance Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-[#6E6054] leading-relaxed">
            {cms.qcGuaranteeText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-4 bg-white rounded border border-[#E0D5C7]">
            <span className="font-serif text-2xl font-bold text-[#241B16] block">Stage 1: Clicker</span>
            <p className="text-xs text-[#7A6C5F] mt-1">Manual skin selection rejecting tick bites, scars, and loose grain break.</p>
          </div>
          <div className="p-4 bg-white rounded border border-[#E0D5C7]">
            <span className="font-serif text-2xl font-bold text-[#241B16] block">Stage 2: Welt</span>
            <p className="text-xs text-[#7A6C5F] mt-1">Tension inspection of the rapid lockstitch and hot cork cavity placement.</p>
          </div>
          <div className="p-4 bg-white rounded border border-[#E0D5C7]">
            <span className="font-serif text-2xl font-bold text-[#241B16] block">Stage 3: Packout</span>
            <p className="text-xs text-[#7A6C5F] mt-1">Double pair boxing, desiccants insertion, barcode labeling, and weight checks.</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => navigateTo('wholesale')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded hover:bg-[#1E1611]"
          >
            Apply for Wholesale Account
          </button>
        </div>
      </div>
    </div>
  );
};

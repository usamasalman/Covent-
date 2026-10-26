import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Factory, Layers, Palette, Package, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CustomManufacturingPage: React.FC = () => {
  const { navigateTo, addToast } = useApp();

  const [brandName, setBrandName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [estimatedPairs, setEstimatedPairs] = useState('100');
  const [silhouette, setSilhouette] = useState('Chelsea Boot');
  const [leatherPreference, setLeatherPreference] = useState('Italian Veg-Tan Calfskin');
  const [customFeatures, setCustomFeatures] = useState('Custom insole debossing + bespoke shoe box');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('OEM private-label development brief submitted to our Porto development atelier.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
            Bespoke Factory Programs
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241B16] leading-tight">
            Custom Manufacturing & Private-Label Production
          </h1>
          <p className="text-sm sm:text-base text-[#685A4E] leading-relaxed">
            From technical last development to custom leather tanning and bespoke branded packaging, we engineer footwear programs tailored exclusively to your brand identity.
          </p>
          <div className="pt-2 flex items-center gap-6 text-xs text-[#7A6C5F]">
            <div><strong className="text-[#241B16] block text-base font-serif">50 Pairs</strong> Initial OEM Minimum</div>
            <div><strong className="text-[#241B16] block text-base font-serif">6–8 Weeks</strong> Turnaround Time</div>
            <div><strong className="text-[#241B16] block text-base font-serif">100%</strong> Pre-Production Sampling</div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden border border-[#E5DDD2] shadow-lg aspect-4/3">
          <img
            src="/src/assets/images/craftsmanship_workshop_1793033838284.jpg"
            alt="OEM custom leather footwear development atelier"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* OEM Capabilities Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-2">
          <Palette className="w-6 h-6 text-[#8A5A2B] mb-2" />
          <h3 className="font-serif text-lg font-bold text-[#241B16]">Proprietary Tannages</h3>
          <p className="text-xs text-[#6B5E53] leading-relaxed">
            Custom Pantone-matched aniline dyes, pull-up finishes, and wax-infused waterproof coatings.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-2">
          <Layers className="w-6 h-6 text-[#8A5A2B] mb-2" />
          <h3 className="font-serif text-lg font-bold text-[#241B16]">Last & Sole Engineering</h3>
          <p className="text-xs text-[#6B5E53] leading-relaxed">
            Access to our library of 40+ European lasts or digitize your brand's proprietary wooden lasts.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-2">
          <Factory className="w-6 h-6 text-[#8A5A2B] mb-2" />
          <h3 className="font-serif text-lg font-bold text-[#241B16]">Branded Hardware</h3>
          <p className="text-xs text-[#6B5E53] leading-relaxed">
            Custom forged solid brass eyelets, engraved buckle closures, and branded woven pull tabs.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-2">
          <Package className="w-6 h-6 text-[#8A5A2B] mb-2" />
          <h3 className="font-serif text-lg font-bold text-[#241B16]">Bespoke Packaging</h3>
          <p className="text-xs text-[#6B5E53] leading-relaxed">
            Foil-stamped rigid slide boxes, unbleached cotton dust bags, and printed retail booklets.
          </p>
        </div>
      </div>

      {/* Structured OEM Inquiry Form */}
      <div className="bg-white p-8 rounded-lg border border-[#E5DDD2] shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-serif text-2xl font-bold text-[#241B16]">
            Start Your OEM Footwear Development Brief
          </h2>
          <p className="text-xs text-[#7A6C5F]">
            Provide high-level parameters and our technical development director will schedule a consultation.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#241B16]">Development Brief Received</h3>
            <p className="text-xs text-[#6B5E53]">
              We have assigned your inquiry to our senior development director in Porto. We will reply within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Atelier Vance"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="development@yourbrand.com"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Desired Silhouette</label>
                <select
                  value={silhouette}
                  onChange={(e) => setSilhouette(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                >
                  <option value="Chelsea Boot">Chelsea Boot</option>
                  <option value="Service Lace-Up Boot">Service Lace-Up Boot</option>
                  <option value="Chukka Desert Boot">Chukka Desert Boot</option>
                  <option value="Oxford Dress Boot">Oxford Dress Boot</option>
                  <option value="Hiking / Outdoor Lug Boot">Hiking / Outdoor Lug Boot</option>
                  <option value="Completely Custom Last">Completely Custom Last Development</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Target Production Run (Pairs)</label>
                <input
                  type="number"
                  min="50"
                  value={estimatedPairs}
                  onChange={(e) => setEstimatedPairs(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Leather & Sole Specifications</label>
                <input
                  type="text"
                  value={leatherPreference}
                  onChange={(e) => setLeatherPreference(e.target.value)}
                  placeholder="e.g. Full-grain French box calf with Dainite studded rubber sole"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Custom Branding & Details</label>
                <textarea
                  rows={3}
                  value={customFeatures}
                  onChange={(e) => setCustomFeatures(e.target.value)}
                  placeholder="Describe insole debossing, custom metal eyelets, packaging requirements, target delivery windows."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors"
            >
              Submit OEM Development Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

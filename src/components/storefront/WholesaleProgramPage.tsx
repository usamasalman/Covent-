import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Building2, CreditCard, Box, Award } from 'lucide-react';

export const WholesaleProgramPage: React.FC = () => {
  const { submitApplication, navigateTo } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [tradingName, setTradingName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [annualVolumeEst, setAnnualVolumeEst] = useState('100–250 pairs / year');
  const [businessType, setBusinessType] = useState('Independent Menswear Retailer');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication({
      companyName,
      tradingName,
      businessNumber,
      contactName,
      email,
      phone,
      annualVolumeEst,
      businessType,
      notes
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Banner */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
          Corporate Partnership Program
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241B16] leading-tight">
          Covent & Stone Wholesale & Trade Program
        </h1>
        <p className="text-sm sm:text-base text-[#685A4E] leading-relaxed">
          We partner with select footwear boutiques, department store chains, and discerning private-label brands across North America, Europe, Japan, and Australia. Gain direct access to European bench-craft without traditional retail markups.
        </p>
      </div>

      {/* Program Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-3 shadow-xs">
          <div className="w-10 h-10 bg-[#F4EFEB] rounded-full flex items-center justify-center text-[#8A5A2B]">
            <Box className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241B16]">
            Accessible 24-Pair MOQs
          </h3>
          <p className="text-xs text-[#6B5D52] leading-relaxed">
            Order in agile carton increments (12 pairs per case) with custom size curves, enabling seasonal experimentation without inventory stagnation.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-3 shadow-xs">
          <div className="w-10 h-10 bg-[#F4EFEB] rounded-full flex items-center justify-center text-[#8A5A2B]">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241B16]">
            Trade Credit & Net-30
          </h3>
          <p className="text-xs text-[#6B5D52] leading-relaxed">
            Qualified corporate accounts gain access to Net-30 trade credit lines, scheduled dispatch holds, and multi-currency billing (USD, EUR, GBP).
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-3 shadow-xs">
          <div className="w-10 h-10 bg-[#F4EFEB] rounded-full flex items-center justify-center text-[#8A5A2B]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241B16]">
            Private-Label Branding
          </h3>
          <p className="text-xs text-[#6B5D52] leading-relaxed">
            Complimentary gold foil insole stamping on orders of 100+ pairs, accompanied by custom packaging sleeves and branded wooden shoe trees.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-[#E8E1D7] pt-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
            Apply for Business Account
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#241B16]">
            Wholesale Account Application
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5F53] leading-relaxed">
            Submit your company credentials for credit authorization and access to our restricted buyer pricing portal. Our review committee responds within 24 business hours.
          </p>

          <div className="p-4 bg-[#F4EFEB] rounded-md border border-[#E0D5C7] space-y-2 text-xs text-[#6B5E53]">
            <strong className="block text-[#241B16] font-semibold">Required Verification:</strong>
            <p>Valid corporate registration, VAT / Tax ID, and verifiable physical retail address or established commercial web presence.</p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-[#E5DDD2] shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#241B16]">
                Application Submitted Successfully
              </h3>
              <p className="text-xs text-[#6B5E53] max-w-sm mx-auto">
                Our trade desk is verifying your business registration. You will receive an onboarding confirmation email once approved.
              </p>
              <button
                onClick={() => navigateTo('products')}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded"
              >
                Explore Catalog Meanwhile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Legal Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Highland Cobblers & Clothiers Ltd"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Trading As (Storefront Brand)
                  </label>
                  <input
                    type="text"
                    value={tradingName}
                    onChange={(e) => setTradingName(e.target.value)}
                    placeholder="e.g. Highland Co."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    VAT / Tax / EIN Registration ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessNumber}
                    onChange={(e) => setBusinessNumber(e.target.value)}
                    placeholder="e.g. GB 921 4481 02 / US 91-4401928"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Primary Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (503) 891-3312"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Estimated Annual Volume
                  </label>
                  <select
                    value={annualVolumeEst}
                    onChange={(e) => setAnnualVolumeEst(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none text-[#241B16]"
                  >
                    <option value="50–100 pairs / year">50–100 pairs / year (Boutique Tier)</option>
                    <option value="100–250 pairs / year">100–250 pairs / year (Standard Wholesale)</option>
                    <option value="250–500 pairs / year">250–500 pairs / year (Gold Volume)</option>
                    <option value="500+ pairs / year">500+ pairs / year (Enterprise OEM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                    Business Model
                  </label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="Independent Menswear Retailer"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none focus:border-[#4A3728]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">
                  Retail Storefront Address / Additional Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Include store locations, current brands carried, or target delivery seasons."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors shadow-sm cursor-pointer"
                >
                  Submit Wholesale Business Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

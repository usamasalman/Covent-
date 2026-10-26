import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, Shield, Globe2, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, cms, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid corporate email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed to the Covent & Stone Quarterly Trade Bulletin.');
    setEmail('');
  };

  return (
    <footer className="bg-[#1C1613] text-[#A69B91] border-t border-[#30251F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C211B]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
              COVENT & STONE
            </span>
            <p className="text-sm leading-relaxed text-[#B8ACA1] max-w-sm">
              Artisanal bench-made Goodyear-welted footwear manufacturer for premium menswear boutiques, international department stores, and private-label programs.
            </p>
            <div className="pt-2 flex flex-col gap-1 text-xs text-[#8F8175]">
              <span>Corporate HQ: {cms.showroomAddress}</span>
              <span>Trade Inquiries: {cms.contactEmail}</span>
              <span>Showroom Desk: {cms.contactPhone}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 text-xs text-[#9E8F82]">
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#C8A265]" /> ISO 9001 Audited
              </span>
              <span className="inline-flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#C8A265]" /> Worldwide Freight (Incoterms 2020)
              </span>
            </div>
          </div>

          {/* Wholesale Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Wholesale Catalog
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  All Leather Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', 'chelsea-boots')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Chelsea Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', 'lace-up-boots')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Lace-Up Service Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', 'dress-boots')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Oxford Dress Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', 'chukka-boots')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Desert Chukka Boots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('custom-manufacturing')}
                  className="hover:text-[#FAF7F2] transition-colors text-[#D8B47E]"
                >
                  OEM & Private Label
                </button>
              </li>
            </ul>
          </div>

          {/* Trade & Business Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Trade Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('wholesale')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Wholesale Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('request-quote')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Request Bulk Quotation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Tanneries & Goodyear Welts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('help')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  MOQ & Lead Times FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Schedule Showroom Visit
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-[#FAF7F2] transition-colors text-[#C8A265]"
                >
                  Buyer Portal Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Trade Bulletin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Quarterly Trade Report
            </h4>
            <p className="text-xs text-[#9E8F82] leading-relaxed">
              Curated reports on European raw leather futures, seasonal footwear trend forecasting, and factory production capacity updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-[#2A201A] border border-[#3E3027] rounded text-xs text-[#C8A265]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed. Welcome to our trade circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="corporate.email@retailer.com"
                  className="w-full px-3 py-2 text-xs bg-[#241B16] border border-[#382B23] text-[#FAF7F2] placeholder-[#786A5F] rounded focus:outline-none focus:border-[#C8A265] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#1C1613] bg-[#C8A265] hover:bg-[#D8B47E] rounded transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal & Policy Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7A6D63]">
          <div>
            © {new Date().getFullYear()} Covent & Stone Leatherworks B2B Platform. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => navigateTo('legal', 'terms')} className="hover:text-[#FAF7F2]">
              Terms of Trade
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('legal', 'wholesale-terms')} className="hover:text-[#FAF7F2]">
              Wholesale Policy & MOQ
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('legal', 'shipping-policy')} className="hover:text-[#FAF7F2]">
              Freight & Shipping
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('legal', 'returns-claims')} className="hover:text-[#FAF7F2]">
              Quality Assurance & Claims
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('legal', 'privacy')} className="hover:text-[#FAF7F2]">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

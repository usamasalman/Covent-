import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ChevronDown, ChevronRight, HelpCircle, FileText, ArrowRight } from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const topics = [
    { id: 'all', name: 'All Topics' },
    { id: 'moq', name: 'MOQ & Case Packing' },
    { id: 'pricing', name: 'Wholesale Tiers & Currency' },
    { id: 'samples', name: 'Prototype Samples' },
    { id: 'shipping', name: 'Freight & Incoterms' },
    { id: 'credit', name: 'Net-30 & Payments' }
  ];

  const faqs = [
    {
      topic: 'moq',
      q: 'What is the standard production Minimum Order Quantity (MOQ)?',
      a: 'Standard catalog production requires 24 pairs per model/colorway, which can be distributed across any assortment of US/UK/EU sizes. Standard carton multiples are 12 pairs per outer carton for safe ocean and air transit.'
    },
    {
      topic: 'moq',
      q: 'Can carton multiples be split across two different boot models?',
      a: 'To guarantee structural protection in transit and automated warehouse sortation, outer shipping cartons are packed 12 pairs of a single model and colorway. Size assortments within that carton are flexible.'
    },
    {
      topic: 'pricing',
      q: 'How are wholesale volume discounts calculated?',
      a: 'Our wholesale engine automatically discounts batch runs based on total ordered pairs per style: 24–49 pairs (Tier 1), 50–99 pairs (Tier 2, ~11% savings), 100–249 pairs (Tier 3, ~20% savings), and 250+ pairs (Tier 4, ~26% savings).'
    },
    {
      topic: 'pricing',
      q: 'Can quotes be billed in EUR or GBP rather than USD?',
      a: 'Yes. Our commercial quotations and invoices can be issued in USD ($), EUR (€), or GBP (£) locked at the forward exchange rate on quotation approval date.'
    },
    {
      topic: 'samples',
      q: 'What is the procedure and cost for ordering prototype samples?',
      a: 'Pre-production prototype samples are available for all catalog styles at our sample surcharge ($95–$115 per pair). When you subsequently place a production run of 50+ pairs, 100% of the sample charge is deducted from your master invoice.'
    },
    {
      topic: 'shipping',
      q: 'Which Incoterms do you support?',
      a: 'We support FOB (Port of Porto / Leon / Felixstowe), CIF (insured to destination port), and DDP (duty paid delivered to buyer warehouse door) through verified logistics partners including Maersk and DHL Global Forwarding.'
    },
    {
      topic: 'credit',
      q: 'How does a buyer qualify for Net-30 payment terms?',
      a: 'Buyers who have completed at least two prior production orders or who provide verifiable bank and trade references can apply for Net-30 trade credit up to $50,000 credit limit.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesTopic = selectedTopic === 'all' || faq.topic === selectedTopic;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
          Wholesale Knowledge Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
          Trade Help Center & Operations FAQ
        </h1>
        <p className="text-xs sm:text-sm text-[#6E5F53] max-w-xl mx-auto">
          Explore comprehensive guides to case carton packaging, Incoterms, lead time guarantees, and wholesale credit application guidelines.
        </p>

        {/* Search Input */}
        <div className="max-w-lg mx-auto relative pt-4">
          <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-7" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. MOQ, Net-30, Incoterms, Samples)..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#DDD3C5] rounded-md focus:outline-none focus:border-[#4A3728] shadow-xs"
          />
        </div>
      </div>

      {/* Topic Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              selectedTopic === t.id
                ? 'bg-[#2E221B] text-[#FAF7F2] font-semibold'
                : 'bg-white border border-[#DDD3C5] text-[#6B5E53] hover:bg-[#F4EFEB]'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#E5DDD2] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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
                <div className="px-5 pb-5 text-xs text-[#6B5E53] leading-relaxed border-t border-[#F0E9DF] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help */}
      <div className="p-8 bg-[#F4EFEB] rounded-lg border border-[#E0D5C7] text-center space-y-3">
        <h3 className="font-serif text-xl font-bold text-[#241B16]">
          Need Custom Freight or Specific Commercial Terms?
        </h3>
        <p className="text-xs text-[#7A6C5F] max-w-md mx-auto">
          Our international trade desk handles dedicated container bookings, letters of credit (L/C), and private-label design requirements.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigateTo('contact')}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] rounded hover:bg-[#1E1611]"
          >
            Contact Trade Concierge
          </button>
        </div>
      </div>
    </div>
  );
};

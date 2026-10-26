import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const LegalPolicyPage: React.FC = () => {
  const { routeParam, navigateTo } = useApp();
  const policyKey = routeParam || 'terms';

  const policies: Record<string, { title: string; subtitle: string; content: string[] }> = {
    terms: {
      title: 'Commercial Terms of Wholesale Trade',
      subtitle: 'Applicable to all international business transactions, proformas, and production contracts.',
      content: [
        '1. Scope & Definitions: All sales of handcrafted footwear by Covent & Stone Leatherworks to business entities are governed exclusively by these Commercial Terms of Wholesale Trade.',
        '2. Binding Quotations: Price quotations remain binding for a period of 21 calendar days from the date of formal issuance by our sales desk. Once a quotation is accepted by the buyer, a formal Purchase Order (PO) or Proforma Invoice is issued.',
        '3. Retention of Title: Title of goods remains with Covent & Stone until payment has been received in full by our clearing bank, notwithstanding physical transfer of possession at the port of origin.',
        '4. Force Majeure: Production schedules are subject to raw hide availability, tannery lead times, and maritime shipping constraints. Notice is provided promptly in any event of unavoidable disruption.'
      ]
    },
    'wholesale-terms': {
      title: 'Wholesale Policy, MOQs & Carton Packing',
      subtitle: 'Standard case packaging guidelines, batch scheduling, and size assortment rules.',
      content: [
        '1. Minimum Order Quantity (MOQ): The standard production minimum is 24 pairs per style/colorway. For custom OEM developments requiring proprietary lasts or custom hardware casting, the minimum is 50 pairs.',
        '2. Case Packaging Multiples: Outer shipping cartons are packed in uniform multiples of 12 pairs. Orders should respect standard case increments to prevent carton compression during ocean or air cargo handling.',
        '3. Size Assortment Allocation: Within the required MOQ, buyers may configure any distribution across standard US, UK, and EU size runs.',
        '4. Sample Ordering Credit: Prototype samples purchased ahead of a bulk run are billed at sample surcharge rates. 100% of this fee is credited against confirmed production runs exceeding 50 pairs.'
      ]
    },
    'shipping-policy': {
      title: 'Freight, Logistics & Incoterms 2020',
      subtitle: 'International carriage, customs clearance, and port handover protocols.',
      content: [
        '1. Supported Incoterms: We operate under ICC Incoterms 2020 rules: FOB (Free On Board - Port of Porto, Portugal / Port of Veracruz, Mexico), CIF (Cost, Insurance and Freight to buyer destination port), and DDP (Delivered Duty Paid).',
        '2. Lead Times: Catalog footwear runs require 3 to 5 weeks for lasting, sole stitching, edge finishing, and QA packing. Transit times by sea freight typically add 12 to 24 days depending on destination port.',
        '3. Palletization & Manifests: All shipments are palletized with moisture-barrier wrapping, corner edge protectors, and international ISPM-15 heat-treated wood certification.',
        '4. Commercial Documentation: Every dispatch includes original Master Bills of Lading, Commercial Invoices, Packing Lists with individual carton weights, and Certificates of Origin.'
      ]
    },
    'returns-claims': {
      title: 'Quality Assurance & Defect Claims Policy',
      subtitle: 'Inspection periods, allowable manufacturing variances, and claims handling.',
      content: [
        '1. Final Inspection: Every pair undergoes individual triple-stage bench inspection before carton seal. Zero tolerance is maintained for structural welt tears, sole separation, or unconditioned dry grain.',
        '2. Allowable Natural Variance: Full-grain vegetable-tanned leathers possess organic character marks, subtle tonal gradations, and natural pore grain. These intrinsic hallmarks of authentic leather are not classified as defects.',
        '3. Claims Notification Window: Wholesale buyers must inspect landed cartons and register any claim for manufacturing discrepancies within 14 calendar days of port customs release.',
        '4. Resolution Protocol: Legitimate manufacturing defects verified by our QA engineering team are resolved via immediate replacement pairs or credit balance memo applied to subsequent orders.'
      ]
    },
    privacy: {
      title: 'Corporate Data Protection & Privacy Policy',
      subtitle: 'How corporate buyer data, account credentials, and trade transactions are protected.',
      content: [
        '1. Data Collection: We collect corporate registration information, corporate tax identifiers, commercial delivery addresses, and purchasing histories solely to execute wholesale commerce and comply with international customs regulations.',
        '2. Confidentiality of Trade Terms: Negotiated tiered rates, bespoke buyer lasts, and private-label design briefs are protected under commercial confidentiality and are never shared with competitor accounts.',
        '3. Payment Security: Wire transfer documents and trade credit banking references are stored in encrypted environments adhering to strict access control protocols.'
      ]
    }
  };

  const currentPolicy = policies[policyKey] || policies.terms;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs text-[#8C7A6B] hover:text-[#241B16] mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
        </button>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
          Corporate Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B16]">
          {currentPolicy.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#736458] mt-1">
          {currentPolicy.subtitle}
        </p>
      </div>

      {/* Policy switcher tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E8E1D7] pb-3 text-xs">
        {[
          { key: 'terms', label: 'Terms of Trade' },
          { key: 'wholesale-terms', label: 'Wholesale Policy & MOQ' },
          { key: 'shipping-policy', label: 'Freight & Incoterms' },
          { key: 'returns-claims', label: 'QA & Claims' },
          { key: 'privacy', label: 'Data Privacy' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => navigateTo('legal', tab.key)}
            className={`px-3 py-1.5 rounded transition-colors ${
              policyKey === tab.key
                ? 'bg-[#2E221B] text-[#FAF7F2] font-semibold'
                : 'text-[#6E6054] hover:bg-[#F4EFEB]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8 bg-white rounded-lg border border-[#E5DDD2] space-y-6 text-xs text-[#52443A] leading-relaxed shadow-xs">
        {currentPolicy.content.map((paragraph, idx) => (
          <div key={idx} className="space-y-1">
            <p>{paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

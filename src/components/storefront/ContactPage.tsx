import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { cms, addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Trade Showroom Appointment');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your trade inquiry has been dispatched to our sales concierge.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C7A6B]">
          Direct Trade Concierge
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#241B16]">
          Contact Trade Desk & Showrooms
        </h1>
        <p className="text-sm text-[#6E5F53] leading-relaxed">
          Schedule private appointments at our SoHo wholesale showroom, request physical leather swatch sets, or consult with our footwear development engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-lg border border-[#E5DDD2] space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-semibold uppercase tracking-wider text-[#241B16]">
                  SoHo Trade Showroom
                </strong>
                <p className="text-xs text-[#6B5D52] mt-0.5 leading-relaxed">{cms.showroomAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-semibold uppercase tracking-wider text-[#241B16]">
                  Direct Wholesale Email
                </strong>
                <p className="text-xs text-[#6B5D52] mt-0.5">{cms.contactEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-semibold uppercase tracking-wider text-[#241B16]">
                  Telephone Desk
                </strong>
                <p className="text-xs text-[#6B5D52] mt-0.5">{cms.contactPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#8A5A2B] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-semibold uppercase tracking-wider text-[#241B16]">
                  Operating Hours
                </strong>
                <p className="text-xs text-[#6B5D52] mt-0.5">
                  Monday – Friday: 08:30 – 18:00 EST / CET<br />
                  Private Showroom Visits: By advance reservation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-[#E5DDD2] shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#241B16]">Trade Inquiry Dispatched</h3>
              <p className="text-xs text-[#6B5E53] max-w-sm mx-auto">
                Thank you, {name}. A dedicated Covent & Stone account representative will contact you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Company / Store Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Beacon & Timber Co."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D3127] mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                  >
                    <option value="Trade Showroom Appointment">Trade Showroom Appointment</option>
                    <option value="Wholesale Catalog & Pricing">Wholesale Catalog & Pricing</option>
                    <option value="Custom OEM Production">Custom OEM Production Brief</option>
                    <option value="Material Swatch Book Request">Material Swatch Book Request</option>
                    <option value="General Trade Inquiry">General Trade Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D3127] mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide details about your retail doors, target delivery schedules, or product lines of interest."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5C9BB] rounded focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2E221B] hover:bg-[#1E1611] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#D8B47E]" />
                <span>Transmit Trade Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

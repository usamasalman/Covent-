import React, { useState } from 'react';
import { Upload, Stamp, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

export const PrivateLabelLogoPreview: React.FC = () => {
  const [brandText, setBrandText] = useState<string>('HERITAGE BOOT CO.');
  const [stampFinish, setStampFinish] = useState<'gold' | 'silver' | 'blind_deboss' | 'black_ink'>('gold');
  const [stampLocation, setStampLocation] = useState<'insole' | 'collar' | 'pull_tab'>('insole');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
    }
  };

  const getFinishClasses = () => {
    switch (stampFinish) {
      case 'gold':
        return 'text-amber-300 drop-shadow-[0_1px_2px_rgba(251,191,36,0.5)] font-serif tracking-widest uppercase';
      case 'silver':
        return 'text-slate-200 drop-shadow-[0_1px_2px_rgba(226,232,240,0.6)] font-serif tracking-widest uppercase';
      case 'blind_deboss':
        return 'text-amber-950/70 font-serif tracking-widest uppercase shadow-[inner_0_1px_2px_rgba(0,0,0,0.8)]';
      case 'black_ink':
        return 'text-neutral-900 font-serif tracking-widest uppercase';
      default:
        return 'text-amber-300 font-serif tracking-widest uppercase';
    }
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 lg:p-8 text-stone-100 shadow-2xl my-8">
      <div className="border-b border-stone-800 pb-5 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase rounded-full mb-2">
          <Stamp className="w-3.5 h-3.5" /> OEM & Private Label Live Customizer
        </div>
        <h3 className="text-2xl font-serif text-amber-100">
          Custom Brand Logo Stamping & Debossing Preview
        </h3>
        <p className="text-stone-400 text-sm mt-1">
          Upload your retail store logo or enter text to visualize gold-foil hot-stamping on genuine calfskin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              1. Enter Store / Brand Name
            </label>
            <input
              type="text"
              value={brandText}
              onChange={(e) => setBrandText(e.target.value)}
              placeholder="e.g. NORDIC FOOTWEAR CO."
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              2. Or Upload Vector/PNG Logo
            </label>
            <label className="flex items-center justify-center gap-2 bg-stone-950 border border-dashed border-stone-700 hover:border-amber-500 rounded-lg p-3 text-xs text-stone-400 hover:text-amber-300 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>{customLogoUrl ? 'Logo Uploaded (Click to Change)' : 'Upload Brand Logo (PNG / SVG)'}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              3. Select Hot-Stamp Finish
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'gold', label: '24K Gold Foil Stamp' },
                { id: 'silver', label: 'Sterling Silver Foil' },
                { id: 'blind_deboss', label: 'Heat Blind Deboss' },
                { id: 'black_ink', label: 'Onyx Ink Impression' }
              ].map((finish) => (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setStampFinish(finish.id as any)}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                    stampFinish === finish.id
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-200 font-medium'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span>{finish.label}</span>
                  {stampFinish === finish.id && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">
              4. Select Stamping Location
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'insole', label: 'Leather Insole' },
                { id: 'collar', label: 'Boot Collar' },
                { id: 'pull_tab', label: 'Pull Tab' }
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setStampLocation(loc.id as any)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    stampLocation === loc.id
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-200 font-medium'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Stamped Visualizer */}
        <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[380px]">
          <div className="absolute top-3 left-3 text-xs font-mono text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Simulated Calfskin Sockliner
          </div>

          {/* Leather Sockliner Background */}
          <div className="w-full max-w-md h-64 bg-[#7A4B2A] rounded-2xl border-4 border-[#522E15] shadow-2xl relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Grain Texture Lines */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

            {/* Insole Stitching Line */}
            <div className="absolute inset-3 border-2 border-dashed border-[#42220D]/60 rounded-xl pointer-events-none" />

            {/* Brand Logo/Text Impression */}
            <div className="z-10 relative flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono tracking-widest text-amber-950/80 uppercase">
                EST. 2026 · BENCH-MADE
              </div>

              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="Custom Brand Logo Preview"
                  className={`max-h-20 max-w-[200px] object-contain transition-all ${
                    stampFinish === 'gold' ? 'drop-shadow-[0_1px_2px_rgba(251,191,36,0.6)]' : ''
                  }`}
                />
              ) : (
                <h4 className={`text-xl lg:text-2xl font-serif font-bold ${getFinishClasses()}`}>
                  {brandText || 'YOUR LOGO HERE'}
                </h4>
              )}

              <div className="text-[9px] font-mono tracking-wider text-amber-950/70 uppercase border-t border-amber-950/40 pt-1 mt-1">
                GENUINE LEATHER · PORTUGAL
              </div>
            </div>
          </div>

          <p className="text-stone-400 text-xs text-center mt-4">
            Live sample proofs sent prior to production. Minimum custom private label order: 50 pairs per style.
          </p>
        </div>
      </div>
    </div>
  );
};

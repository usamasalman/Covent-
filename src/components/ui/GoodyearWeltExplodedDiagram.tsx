import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, ChevronRight, Info, CheckCircle2 } from 'lucide-react';

interface LayerInfo {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  material: string;
  source: string;
  benefit: string;
  badgeBg: string;
  layerBg: string;
  borderColor: string;
}

const WELT_LAYERS: LayerInfo[] = [
  {
    id: 'layer-1',
    number: 1,
    name: 'Full-Grain Leather Upper',
    subtitle: '1.8 - 2.2mm French & Italian Veg-Tan Calfskin',
    material: 'Certified Grade-A Full Grain Leather',
    source: 'Tuscan Tanneries (San Miniato, Italy)',
    benefit: 'Develops rich organic patina, repels weather, and conforms ergonomically to foot shape without tearing or grain splitting.',
    badgeBg: 'bg-amber-600 text-stone-950 font-bold',
    layerBg: 'bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-stone-900',
    borderColor: 'border-amber-600/60'
  },
  {
    id: 'layer-2',
    number: 2,
    name: 'Glove Calfskin Interior Lining',
    subtitle: '100% Breathable Supple Calfskin',
    material: 'Full Aniline Soft Calf Glove Lining',
    source: 'Almansa Tannery (Spain)',
    benefit: 'Wicks moisture rapidly away from the foot bed, eliminates internal friction hot-spots, and prevents interior odor buildup.',
    badgeBg: 'bg-stone-700 text-stone-100',
    layerBg: 'bg-gradient-to-r from-stone-800/90 via-stone-850 to-stone-900',
    borderColor: 'border-stone-700'
  },
  {
    id: 'layer-3',
    number: 3,
    name: 'Heavy-Duty Insole Rib & Gemming',
    subtitle: 'Solid Leather Insole with Woven Canvas Rib',
    material: '3.5mm Argentine Veg-Tan Sole Leather Insole',
    source: 'Buenos Aires (Argentina)',
    benefit: 'Acts as the mechanical anchor for Goodyear welt stitching, ensuring lifetime structural integrity and foot bed moulding.',
    badgeBg: 'bg-amber-800 text-amber-100',
    layerBg: 'bg-gradient-to-r from-amber-900/70 via-stone-850 to-stone-900',
    borderColor: 'border-amber-700/50'
  },
  {
    id: 'layer-4',
    number: 4,
    name: 'Granulated Cork Cavity Fill',
    subtitle: 'Natural Cork Bark & Plant Resin Bed',
    material: 'Compressed Granulated Hevea Cork Filler',
    source: 'Algarve Region (Portugal)',
    benefit: 'Creates a custom orthotic impression over time, insulates against extreme cold/heat, and cushions every step.',
    badgeBg: 'bg-yellow-600 text-stone-950 font-bold',
    layerBg: 'bg-gradient-to-r from-amber-800/80 via-yellow-900/40 to-stone-900',
    borderColor: 'border-yellow-600/60'
  },
  {
    id: 'layer-5',
    number: 5,
    name: 'Tempered Steel Arch Shank',
    subtitle: 'High-Tensile Carbon Spring Steel',
    material: 'Hardened Spring Steel Shank',
    source: 'Sheffield Steel Works (UK)',
    benefit: 'Prevents midfoot collapse under heavy load, maintains arch geometry, and distributes bodyweight evenly across the sole.',
    badgeBg: 'bg-sky-600 text-sky-50 font-bold',
    layerBg: 'bg-gradient-to-r from-slate-800 via-slate-850 to-stone-900',
    borderColor: 'border-sky-500/50'
  },
  {
    id: 'layer-6',
    number: 6,
    name: 'Storm Welt & Chain Lockstitching',
    subtitle: '360° Waterproof Leather Welt Channel',
    material: 'Natural Veg-Tan Welt Strip with Waxed Thread',
    source: 'Northamptonshire (UK)',
    benefit: 'Forms a tight moisture barrier between upper and sole. Enables the boot to be re-soled endlessly without damaging the upper.',
    badgeBg: 'bg-amber-950 text-amber-200 border border-amber-600/40',
    layerBg: 'bg-gradient-to-r from-amber-950 via-stone-900 to-stone-950',
    borderColor: 'border-amber-800/60'
  },
  {
    id: 'layer-7',
    number: 7,
    name: 'Vibram Lug / Double Leather Outsole',
    subtitle: 'Oil-Resistant Rubber or Oak-Bark Leather',
    material: 'Vibram Commando Rubber / Oak-Bark Soling',
    source: 'Albizzate (Italy) / Devon (UK)',
    benefit: 'Delivers superior traction across wet, icy, or muddy terrain with high abrasion resistance and resolable welt groove.',
    badgeBg: 'bg-neutral-900 text-neutral-100 border border-neutral-700',
    layerBg: 'bg-gradient-to-r from-neutral-900 via-neutral-950 to-stone-950',
    borderColor: 'border-neutral-700'
  }
];

export const GoodyearWeltExplodedDiagram: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-1');
  const activeLayer = WELT_LAYERS.find(l => l.id === activeLayerId) || WELT_LAYERS[0];

  return (
    <div className="bg-stone-900 text-stone-100 border border-stone-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" /> Goodyear Welt Architecture
          </div>
          <h3 className="text-2xl lg:text-3xl font-serif text-amber-100">
            360° Internal Anatomical Construction
          </h3>
          <p className="text-stone-400 text-sm mt-1 max-w-xl">
            Select any internal layer below to explore raw materials, origin tanneries, and lifetime durability benefits.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-stone-800/80 px-4 py-2.5 rounded-lg border border-stone-700/60 text-xs text-stone-300">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>100% Resolable · 200+ Hand Bench Steps</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Layer Stack Interactive Visualizer */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
            <span>Upper (Top)</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sole (Bottom)</span>
          </div>

          <div className="space-y-2">
            {WELT_LAYERS.map((layer) => {
              const isSelected = layer.id === activeLayerId;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${layer.layerBg} ${
                    isSelected
                      ? `ring-2 ring-amber-400/80 shadow-xl ${layer.borderColor} translate-x-2`
                      : 'border-stone-800/80 hover:border-stone-700 hover:translate-x-1 opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center shrink-0 ${layer.badgeBg}`}>
                      {layer.number}
                    </span>
                    <div className="truncate">
                      <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                        {layer.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 rotate-90' : 'text-stone-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Layer Specification Detail Panel */}
        <div className="lg:col-span-6">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 space-y-5 lg:sticky lg:top-28 shadow-xl">
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
                  Layer #{activeLayer.number} Detailed Specification
                </span>
                <h4 className="text-2xl font-serif text-amber-100">
                  {activeLayer.name}
                </h4>
                <p className="text-stone-400 text-xs mt-1">
                  {activeLayer.subtitle}
                </p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-md ${activeLayer.badgeBg}`}>
                Layer {activeLayer.number} of 7
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-900 p-3.5 rounded-lg border border-stone-800">
                <span className="text-stone-400 text-[10px] uppercase font-mono block">Material Grade</span>
                <span className="text-stone-100 font-semibold block mt-1">{activeLayer.material}</span>
              </div>
              <div className="bg-stone-900 p-3.5 rounded-lg border border-stone-800">
                <span className="text-stone-400 text-[10px] uppercase font-mono block">Source & Tannery</span>
                <span className="text-amber-300 font-semibold block mt-1">{activeLayer.source}</span>
              </div>
            </div>

            <div className="bg-amber-950/40 border border-amber-900/50 p-4 rounded-xl text-xs space-y-1.5">
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" /> Craftsmanship & Engineering Benefit
              </span>
              <p className="text-stone-200 leading-relaxed pt-1">
                {activeLayer.benefit}
              </p>
            </div>

            <div className="pt-2 text-[11px] text-stone-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tested under ISO 20344 footwear durability & flexibility benchmarks.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

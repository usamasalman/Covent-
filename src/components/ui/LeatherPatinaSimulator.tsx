import React, { useState } from 'react';
import { Clock, Flame, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

interface PatinaStage {
  months: number;
  label: string;
  tagline: string;
  sheenLevel: string;
  colorShift: string;
  creasing: string;
  careTip: string;
  description: string;
  bgGradient: string;
  filterStyle: {
    brightness: number;
    contrast: number;
    saturate: number;
    sepia: number;
  };
}

const PATINA_STAGES: PatinaStage[] = [
  {
    months: 1,
    label: '1 Month Wear (Mint Bench Finish)',
    tagline: 'Crisp factory finish with uniform matte pull-up oils',
    sheenLevel: 'Satin Matte Finish',
    colorShift: 'Original Factory Walnut Dye',
    creasing: 'Minimal Vamp Flex Lines',
    careTip: 'Condition lightly after initial 30 days with natural beeswax cream.',
    description: 'Fresh out of the shoebox. Premium vegetable-tanned pull-up oils sit evenly distributed throughout the grain. Leather feels structured and firm, beginning its initial ergonomic molding to foot contours.',
    bgGradient: 'from-amber-950/40 to-stone-900',
    filterStyle: { brightness: 1.0, contrast: 1.0, saturate: 1.0, sepia: 0.0 }
  },
  {
    months: 12,
    label: '12 Months Wear (Vintage Character)',
    tagline: 'Rich tonal depth with warm honey undertones & natural burnish',
    sheenLevel: 'Deep Luster & Warm Glow',
    colorShift: 'Burnished High-Points & Darker Creases',
    creasing: 'Supple Ergonomic Foot Lines',
    careTip: 'Brush regularly with horsehair brush to pull internal oils to the surface.',
    description: 'After 1 year of daily wear, pull-up oils migrate naturally under flex points, creating striking light-and-dark tonal depth. Toes and heels develop a natural burnished sheen, while leather softens into custom footbed geometry.',
    bgGradient: 'from-amber-900/60 to-stone-950',
    filterStyle: { brightness: 0.95, contrast: 1.15, saturate: 1.12, sepia: 0.15 }
  },
  {
    months: 36,
    label: '36 Months Wear (Heritage Heirloom)',
    tagline: 'Museum-grade deep espresso patina with glass-like luster',
    sheenLevel: 'Mirror Glass Patina Sheen',
    colorShift: 'Deep Espresso & Amber Highlights',
    creasing: 'Personalized Micro-Plexus Creasing',
    careTip: 'Apply carnauba wax to toe caps for high-shine protection.',
    description: 'At 3 years, full-grain calfskin achieves true heirloom status. Decades of micro-sun exposure, organic conditioning, and walking flex create a one-of-a-kind espresso-and-amber patina that cannot be replicated synthetically.',
    bgGradient: 'from-amber-950 to-neutral-950',
    filterStyle: { brightness: 0.88, contrast: 1.25, saturate: 1.22, sepia: 0.3 }
  }
];

interface LeatherPatinaSimulatorProps {
  productImage?: string;
  productName?: string;
  leatherType?: string;
}

export const LeatherPatinaSimulator: React.FC<LeatherPatinaSimulatorProps> = ({
  productImage = '/assets/images/chelsea_boot_walnut_1793033837576.jpg',
  productName = 'Heritage Chelsea Boot',
  leatherType = 'Italian Pull-Up Veg-Tan Calfskin'
}) => {
  const [selectedMonths, setSelectedMonths] = useState<number>(12);
  const activeStage = PATINA_STAGES.find(s => s.months === selectedMonths) || PATINA_STAGES[1];

  return (
    <div className="bg-stone-900 text-stone-100 border border-stone-800 rounded-2xl p-6 lg:p-8 shadow-xl my-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase rounded-full mb-2">
            <Flame className="w-3.5 h-3.5" /> Interactive Leather Patina Simulator
          </div>
          <h3 className="text-2xl font-serif text-amber-100">
            Age & Patina Transformation over 36 Months
          </h3>
          <p className="text-stone-400 text-sm mt-1">
            See how <span className="text-amber-300 font-medium">{leatherType}</span> deepens in color & sheen with wear.
          </p>
        </div>

        {/* Timeline Stage Switcher */}
        <div className="inline-flex items-center bg-stone-950 p-1.5 rounded-xl border border-stone-800 self-start md:self-auto">
          {PATINA_STAGES.map((stage) => {
            const isActive = stage.months === selectedMonths;
            return (
              <button
                key={stage.months}
                onClick={() => setSelectedMonths(stage.months)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{stage.months} Mo</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Simulated Image Display */}
        <div className="lg:col-span-6 bg-stone-950 border border-stone-800 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[340px]">
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-stone-800 text-xs text-amber-300 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeStage.label}</span>
          </div>

          <div className="relative w-full max-w-sm aspect-4/3 my-2 flex items-center justify-center overflow-hidden rounded-lg">
            <img
              src={productImage}
              alt={`${productName} Patina ${activeStage.months} Months`}
              className="object-contain max-h-72 w-full transition-all duration-700 ease-out"
              style={{
                filter: `brightness(${activeStage.filterStyle.brightness}) contrast(${activeStage.filterStyle.contrast}) saturate(${activeStage.filterStyle.saturate}) sepia(${activeStage.filterStyle.sepia})`
              }}
            />
          </div>

          {/* Slider bar */}
          <div className="w-full mt-4 px-2">
            <div className="flex justify-between text-[11px] font-mono text-stone-400 mb-2">
              <span>Day 1 (Factory)</span>
              <span>Month 12 (Vintage)</span>
              <span>Month 36 (Heirloom)</span>
            </div>
            <input
              type="range"
              min="1"
              max="36"
              value={selectedMonths}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < 6) setSelectedMonths(1);
                else if (val < 24) setSelectedMonths(12);
                else setSelectedMonths(36);
              }}
              className="w-full accent-amber-500 cursor-pointer bg-stone-800 h-2 rounded-lg"
            />
          </div>
        </div>

        {/* Patina Metrics & Description */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-stone-950/80 border border-stone-800 p-5 rounded-xl space-y-3">
            <h4 className="text-lg font-serif text-amber-200 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              {activeStage.tagline}
            </h4>

            <p className="text-stone-300 text-xs leading-relaxed">
              {activeStage.description}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800 text-xs">
              <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-mono">Sheen Luster</span>
                <span className="text-stone-200 font-semibold text-[11px] block mt-0.5">{activeStage.sheenLevel}</span>
              </div>
              <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-mono">Color Depth</span>
                <span className="text-amber-300 font-semibold text-[11px] block mt-0.5">{activeStage.colorShift}</span>
              </div>
              <div className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
                <span className="text-stone-500 block text-[10px] uppercase font-mono">Flex Creasing</span>
                <span className="text-stone-200 font-semibold text-[11px] block mt-0.5">{activeStage.creasing}</span>
              </div>
            </div>

            <div className="bg-stone-900 p-3 rounded-lg border border-amber-900/30 text-xs flex items-start gap-2 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-200">Recommended Care Tip: </span>
                {activeStage.careTip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
